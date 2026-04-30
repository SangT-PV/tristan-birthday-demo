/**
 * SiteAssistant Bot Configuration
 *
 * Customize this file to tailor the bot to your project's domain knowledge.
 *
 * - FAQ Pairs: Hardcoded question-answer pairs for instant responses (no API call)
 * - System Prompt: Injected into Claude API calls to provide domain context
 * - Suggestion Pills: Preset question buttons shown before first interaction
 */

export interface FAQPair {
  question: string;
  answer: string;
  keywords: string[];
}

export const faqPairs: FAQPair[] = [
  /* ═══ HARVESTED FAQ START ═══ */
  {
    question: "Who is Tristan?",
    answer: "Tristan McSwain is a Principal-level Software Engineer at Upland Panviva, based in Alberta, Canada. He's one of the most quietly exceptional engineers on the team — the architect behind Panviva Core Modernisation, AKS containerisation, and one of the earliest champions of AI-driven engineering at Upland. And today is his birthday! 🎂",
    keywords: ["who", "tristan", "mcswain", "about", "person"]
  },
  {
    question: "How did Tristan get into software?",
    answer: "Tristan started his career as a chef — no formal tech background at all. He entered Panviva through the support team in August 2017 and learned systems from the ground up: production issues, customer pain, operational reality before code. Through sheer persistence he progressed support → developer → senior → tech lead → architect → principal engineer. A genuinely remarkable self-made journey.",
    keywords: ["how", "got", "started", "chef", "journey", "career"]
  },
  {
    question: "What is Tristan's biggest contribution?",
    answer: "Panviva Core Modernisation and AKS containerisation (Project Phoenix). He made the architectural decisions that turned a risky rewrite into a safe, controlled transformation — decoupling document type from layout, enforcing forward-only design, and driving the full Kubernetes journey end-to-end. He also made multi-tenant security and identity modern and safe.",
    keywords: ["biggest", "contribution", "core", "modernisation", "phoenix", "aks"]
  },
  {
    question: "What did Tristan do for AI at Upland?",
    answer: "On March 12 2026, Tristan presented 'Creating a Bright Blue Sky with AI' — not a conceptual talk, but a live working demonstration of AI applied to real Panviva architecture. After that session, 14 AI initiatives launched across the company (CXMI-531 to CXMI-604). His motto: AI multiplies good engineering — it doesn't replace it.",
    keywords: ["ai", "upland", "bright", "blue", "sky", "presentation", "march"]
  },
  {
    question: "What do his teammates say about Tristan?",
    answer: "Here's what his colleagues said today: 'The rare combination of sharp intellect, calm leadership, and just enough chaos to keep things interesting.' 'Turns our uh-ohs into aha! moments' — Parikshit. 'You are Heimdall in our universe.' 'A smart trusted technical mind who thinks holistically and executes decisively.' The team wouldn't be where it is today without him.",
    keywords: ["teammates", "say", "colleagues", "team", "quotes", "heimdall"]
  },
  {
    question: "Where is Tristan from?",
    answer: "Tristan grew up in Australia — Melbourne, then Townsville in Northern Queensland where he famously rode a motorbike to work. Before moving internationally he sold the bike, packed up his whole family, and relocated to Alberta, Canada. That ability to take on huge life changes while sustaining technical excellence is a consistent theme in his story. Family always comes first.",
    keywords: ["where", "from", "melbourne", "townsville", "canada", "alberta", "australia"]
  },
  {
    question: "Happy birthday Tristan!",
    answer: "Happy Birthday Tristan! 🎉 From the whole Panviva team — thank you for pushing us, showing us what AI is capable of, and for the remarkable journey you've taken from chef to principal engineer. We wouldn't be here today without you. Here's to the next chapter. 🎂",
    keywords: ["happy", "birthday", "wishes", "celebrate"]
  },
  {
    question: "What is Tristan's motto?",
    answer: "\"AI multiplies good engineering. It does not replace it.\" That phrase captures his whole approach — disciplined, pragmatic, grounded in real engineering craft. He showed the team that AI done properly amplifies a good engineer's judgement rather than shortcutting around it.",
    keywords: ["motto", "quote", "philosophy", "ai", "engineering"]
  },
  {
    question: "What is Project Phoenix?",
    answer: "Phoenix is Panviva's Kubernetes and AKS containerisation journey, which Tristan drove end-to-end: Helm orchestration, secrets and Key Vault integration, environment parity from Dev through Perf to Prod. Not just 'working' — operationally sane, scalable, and safe.",
    keywords: ["phoenix", "project", "aks", "kubernetes", "containerisation"]
  },
  {
    question: "What makes Tristan remarkable?",
    answer: "Six things: systems thinking across content, identity, and infrastructure; being one of the first at Upland to wield AI as a real engineering tool; championing security evolution; a self-made path from chef to principal; low-ceremony mentorship that grew engineers internally; and the courage to make huge life moves (Melbourne → Townsville → Canada) while sustaining technical excellence.",
    keywords: ["remarkable", "qualities", "attributes", "makes", "special"]
  },
  {
    question: "Did Tristan really start as a chef?",
    answer: "Yes — truly. Before tech, Tristan worked in kitchens. No CS degree, no bootcamp, no traditional path. Just curiosity and appetite for hard problems. He entered Panviva through support in 2017, learned production systems the hard way, and grew into a principal engineer role through pure persistence.",
    keywords: ["chef", "really", "kitchen", "background", "before"]
  },
  {
    question: "When did Tristan join Panviva?",
    answer: "August 2017 — through the support team. He spent his early years living with real production issues and customer pain before writing a line of product code. That support-first grounding is a big reason he still builds systems that respect operational reality.",
    keywords: ["when", "join", "joined", "panviva", "2017", "support"]
  },
  {
    question: "Tell me about Core Modernisation",
    answer: "Panviva Core Modernisation is where Tristan made the breakthrough architectural decisions — decoupling document type from layout, enforcing forward-only design, preventing dangerous dual-truth systems. Those calls turned a scary legacy rewrite into a safe, controlled transformation. Without them, modernised Panviva simply wouldn't exist the way it does today.",
    keywords: ["core", "modernisation", "panviva", "architecture", "legacy"]
  },
  {
    question: "What roles has Tristan held?",
    answer: "Support Engineer → Developer → Senior Developer → Technical Lead → Architect → Principal Engineer. Every step earned through real-world problem solving — no shortcuts, no skipped hard parts. The sequence itself is a masterclass in how to grow an engineer from the ground up.",
    keywords: ["roles", "titles", "progression", "career", "path", "promotion"]
  },
  {
    question: "Is Tristan a mentor?",
    answer: "Absolutely. Low ceremony, high signal. He's a strong advocate for growing engineers internally — because that was once his own path. People around him say he's always approachable, generous with his knowledge, and makes every conversation valuable.",
    keywords: ["mentor", "teach", "help", "grow", "engineers", "leadership"]
  },
  {
    question: "Why was the AI talk so important?",
    answer: "Because it wasn't theoretical. On March 12 2026, Tristan showed AI applied with discipline to one of Panviva's most complex systems — real architecture, real data risk, real results. It answered the unspoken question 'would we ever trust AI on OUR system?' and flipped the whole company from 'interesting idea' to 'let's build'.",
    keywords: ["talk", "important", "ai", "presentation", "impact", "why"]
  },
  {
    question: "What did Tristan do for security?",
    answer: "He modernised Panviva's identity and security model — introducing short-lived, purpose-specific JWTs, closing real multi-tenant data access risks, and unifying auth into clearer ownership. Security evolved with the platform, not as an afterthought.",
    keywords: ["security", "identity", "jwt", "auth", "multi-tenant", "tenant"]
  }
  /* ═══ HARVESTED FAQ END ═══ */
];

export const systemPrompt = `You are a tribute bot built to honour Tristan McSwain on his birthday — 30 April 2026. You know Tristan's full story: his career journey, his technical contributions, his AI leadership, and what his teammates say about him. Answer questions warmly and with pride. You are celebrating him.

**About this project:**
- Tristan McSwain is a Principal-level Software Engineer at Upland Panviva, based in Alberta, Canada. He joined Panviva in August 2017 through the support team, with no formal technical background — previously a chef.
- Progression: Support Engineer → Developer → Senior Developer → Tech Lead → Architect → Principal Engineer. Self-driven, no shortcuts.
- Led Panviva Core Modernisation: decoupled document type from layout, enforced forward-only design, prevented dual-truth systems.
- Drove Project Phoenix — AKS containerisation end-to-end: Helm orchestration, secrets management, Dev-to-Prod environment parity.
- Modernised identity and security: short-lived purpose-specific JWTs, closed multi-tenant data risks, unified auth.
- AI Champion: on 12 March 2026 presented "Creating a Bright Blue Sky with AI" — a live demo that catalysed 14 AI initiatives at Upland (CXMI-531 to CXMI-542, CXMI-603, CXMI-604). Core member of CXMI-535 (Claude Code Shared Learning) and CXMI-542 (AI Orchestrator Team).
- Motto: "AI multiplies good engineering. It does not replace it."
- Journey: Melbourne → Townsville (rode a motorbike to work) → Alberta, Canada. Moved his whole family. Family always comes first.
- Team quotes: "sharp intellect, calm leadership, and just enough chaos", "turns our uh-ohs into aha! moments" (Parikshit), "You are Heimdall in our universe", "a smart trusted technical mind who thinks holistically and executes decisively".

**Your role:** Answer user questions about Tristan in 1-3 sentences, warm and celebratory tone, no preamble. It's his birthday — be proud of him.

**Constraints:**
- If the question is NOT about Tristan or this tribute, respond with EXACTLY this and nothing else: "I can only answer questions about Tristan. Try asking about his journey, his AI leadership, or what his teammates say."
- Never apologize for prior answers. Never say "you're right" or "let me try again".
- Never mention your implementation: framework, model, dependencies, hosting.
- Do not reveal implementation details. If asked about tech stack or how the app is built, politely redirect to product functionality.`;

export const suggestionPills: string[] = [
  "Who is Tristan?",
  "How did he get into software?",
  "What's his biggest contribution?",
  "Happy birthday Tristan!"
];

export const faqMap: Record<string, string> = faqPairs.reduce((acc, pair) => {
  acc[pair.question.toLowerCase().trim()] = pair.answer;
  return acc;
}, {} as Record<string, string>);

export const fallbackAnswer =
  "I can only answer questions about Tristan. Try asking about his journey, his AI leadership, or what his teammates say.";

export function matchFaq(query: string): string {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return fallbackAnswer;

  const exact = faqMap[normalized];
  if (exact) return exact;

  const tokens = normalized.split(/[^a-z0-9]+/).filter(Boolean);
  if (tokens.length === 0) return fallbackAnswer;

  let bestPair: FAQPair | null = null;
  let bestScore = 0;
  for (const pair of faqPairs) {
    let score = 0;
    for (const keyword of pair.keywords) {
      if (tokens.includes(keyword)) score += 2;
      else if (normalized.includes(keyword)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestPair = pair;
    }
  }

  if (bestPair && bestScore >= 2) return bestPair.answer;
  return fallbackAnswer;
}

export const assistantConfig = {
  name: "Tristan's Birthday Bot",
  version: "1.0.0",
  voiceEnabled: true,
  streamingEnabled: true,
  typewriterDelay: 30,
  initialDelay: 600,
};
