# Site Assistant — Adopter Notes

Drop-in chat widget for the Tristan birthday page.

## What it is

FAQ-only chat widget that answers questions about Tristan. Runs fully client-side — no API route, no model calls, no secrets. Deploys as static output on Vercel.

## How it works

1. User types a question (or clicks a suggestion pill).
2. `matchFaq()` in `app/config/assistant.ts`:
   - Exact match against `faqMap` keys → return canonical answer.
   - Otherwise tokenise the query and score each FAQ pair by keyword overlap (token match = 2 pts, substring match = 1 pt).
   - Best scorer wins if it clears a threshold of 2 pts.
   - No match → fallback: `"I can only answer questions about Tristan..."`.
3. Widget streams the answer word-by-word with a typewriter effect.

## Why no Haiku / no backend

Tried a streaming Anthropic API route first. On Vercel it wasn't reliably producing output for this demo, and the FAQ covers the full tribute content anyway. Dropping the API path:

- Removes `ANTHROPIC_API_KEY` requirement → zero secrets to manage.
- Makes the whole page statically prerenderable (`○ (Static)` in `next build`).
- Eliminates per-message cost.
- Trades off: any question outside the FAQ hits the fallback line.

## Files

| Path | Role |
|------|------|
| `app/components/chat-widget.tsx` | Widget shell, state, streaming renderer |
| `app/components/message-list.tsx` | Message rendering |
| `app/components/message-input.tsx` | Input box + voice button |
| `app/components/waveform-visualizer.tsx` | Mic activity visualiser |
| `app/hooks/use-voice-input.ts` | Web Speech API wrapper |
| `app/lib/markdown.ts` | Tiny inline markdown parser (`**bold**`, `` `code` ``) |
| `app/config/assistant.ts` | FAQ pairs, keyword matcher, suggestion pills, system prompt (unused now but kept for future) |
| `app/globals.css` | Widget CSS variables appended at the end |
| `app/layout.tsx` | Mounts `<ChatWidget />` at body root |

## Editing the FAQ

Edit `app/config/assistant.ts`. Each `FAQPair` has:

- `question` — canonical form; drives the exact-match path.
- `answer` — what the widget streams.
- `keywords` — lower-case single tokens used by `matchFaq()` scoring.

Suggestion pills shown before first message: `suggestionPills` array.

## Dev

```bash
npm run dev      # http://localhost:3000
npm run build    # verify static prerender
npm run lint
```

Known pre-existing lint warnings live in `app/hooks/use-voice-input.ts` (React 19 memoization rules in the template) and aren't blocking.

## What was removed

Files that shipped in the widget template but aren't needed once Haiku is out:

- `app/api/chat/route.ts` — Anthropic streaming endpoint.
- `@anthropic-ai/sdk` dependency.
- Brain-selector UI (Ollama catalog, pull-model progress bar) — gated by `NEXT_PUBLIC_SHOW_BRAIN_SELECTOR`, never wired up here.
- `_tristan-assistant-config.ts` — scratchpad draft, superseded by `app/config/assistant.ts`.

If you later want a real LLM in the loop, restore `app/api/chat/route.ts` from git history (before the "drop Haiku" commit) and reinstall `@anthropic-ai/sdk`.
