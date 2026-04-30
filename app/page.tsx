"use client";
import { useEffect, useRef } from "react";

const milestones = [
  {
    label: "Before Tech",
    title: "Chef",
    body: "Started in the kitchen — no formal tech background, just curiosity and appetite for hard problems.",
    color: "var(--indigo)",
  },
  {
    label: "2017",
    title: "Panviva — Support Engineer",
    body: "Entered through the support team. Learned the product from the ground up: production issues, customer pain, operational reality before code.",
    color: "var(--cyan)",
  },
  {
    label: "2018–2021",
    title: "Developer → Senior Developer → Tech Lead",
    body: "Self-driven through real-world problems. Grew into technical leadership solving the hard, unglamorous foundations: TLS, app server reliability, platform compatibility.",
    color: "var(--orange)",
  },
  {
    label: "2022–2023",
    title: "Architect — Core Modernisation",
    body: "Led the architectural breakthroughs that made Core Modernisation possible: decoupled document type from layout, enforced forward-only design, enabled safe transformation of a legacy system.",
    color: "var(--indigo)",
  },
  {
    label: "2024",
    title: "AKS & Containerisation (Phoenix)",
    body: "Drove Panviva's Kubernetes journey end-to-end — Helm orchestration, secrets management, environment parity from Dev to Prod. Not just working, but operationally sane.",
    color: "var(--cyan)",
  },
  {
    label: "2025–2026",
    title: "Principal Engineer & AI Champion",
    body: "Authored ADR-037, presented \u201cCreating a Bright Blue Sky with AI\u201d, and proved that AI multiplies good engineering. It doesn\u2019t replace it.",
    color: "var(--orange)",
  },
];

const attributes = [
  { numeral: "I", title: "Systems Thinker", body: "Balances content, identity, infrastructure, and migration semantics simultaneously. Never optimises one layer at the expense of another.", color: "var(--indigo)" },
  { numeral: "II", title: "AI Pioneer", body: "One of the first at Upland to wield AI as a real engineering tool. His motto: AI multiplies good engineering, it doesn\u2019t replace it.", color: "var(--cyan)" },
  { numeral: "III", title: "Security Champion", body: "Short-lived purpose-specific JWTs, closed multi-tenant data risks, unified auth \u2014 security evolved with the platform, not as an afterthought.", color: "var(--orange)" },
  { numeral: "IV", title: "Self-Made Engineer", body: "Chef \u2192 support \u2192 developer \u2192 principal engineer. No formal CS degree. Proof that non-traditional paths create exceptional engineers.", color: "var(--magenta)" },
  { numeral: "V", title: "Mentor & Leader", body: "Low ceremony, high signal. Advocates strongly for growing engineers internally \u2014 because that was once his own path.", color: "var(--indigo)" },
  { numeral: "VI", title: "Big Life Moves", body: "Melbourne \u2192 Townsville \u2192 Canada. Navigated major transitions while sustaining technical excellence. Family always comes first.", color: "var(--cyan)" },
];

function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.004 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }));

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.001;
      stars.forEach((s) => {
        const alpha = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.speed * 200 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,200,255,${alpha})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}

export default function Home() {
  return (
    <>
      <Stars />
      <main style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO ── */}
        <section style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Supernova glow */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(108,99,255,0.18) 0%, rgba(0,245,255,0.08) 40%, transparent 70%)",
            animation: "pulse-glow 4s ease-in-out infinite",
            pointerEvents: "none",
          }} />

          <p style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 11,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            marginBottom: 28,
            opacity: 0.8,
          }}>
            30 April · 2026
          </p>

          {/* Avatar with orbital rings */}
          <div style={{ position: "relative", marginBottom: 40, width: 160, height: 160 }}>
            {/* Outer orbit */}
            <div style={{
              position: "absolute",
              inset: -28,
              borderRadius: "50%",
              border: "1px solid rgba(108,99,255,0.25)",
              animation: "spin-slow 18s linear infinite",
            }}>
              <div style={{
                position: "absolute",
                top: -4, left: "50%",
                width: 8, height: 8,
                borderRadius: "50%",
                background: "var(--cyan)",
                boxShadow: "0 0 10px var(--cyan), 0 0 20px var(--cyan)",
                transform: "translateX(-50%)",
              }} />
            </div>
            {/* Inner orbit */}
            <div style={{
              position: "absolute",
              inset: -14,
              borderRadius: "50%",
              border: "1px solid rgba(0,245,255,0.15)",
              animation: "spin-slow 10s linear infinite reverse",
            }}>
              <div style={{
                position: "absolute",
                bottom: -3, left: "50%",
                width: 6, height: 6,
                borderRadius: "50%",
                background: "var(--orange)",
                boxShadow: "0 0 8px var(--orange)",
                transform: "translateX(-50%)",
              }} />
            </div>
            {/* Glow backdrop */}
            <div style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(108,99,255,0.3) 0%, transparent 70%)",
            }} />
            {/* Avatar */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tristan-zombie.png"
              alt="Tristan McSwain"
              style={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                border: "3px solid rgba(108,99,255,0.6)",
                boxShadow: "0 0 24px rgba(108,99,255,0.5), 0 0 48px rgba(108,99,255,0.2)",
                display: "block",
              }}
            />
          </div>

          <h1 className="gradient-text" style={{
            fontSize: "clamp(52px, 10vw, 108px)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}>
            Happy Birthday,<br />Tristan
          </h1>

          <p style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "clamp(11px, 1.8vw, 15px)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            marginBottom: 48,
          }}>
            Principal Engineer&nbsp;&nbsp;·&nbsp;&nbsp;AI Champion&nbsp;&nbsp;·&nbsp;&nbsp;Game Changer
          </p>

          {/* Neon divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, width: "100%", maxWidth: 400, marginBottom: 48 }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, var(--indigo))" }} />
            <div style={{
              width: 8, height: 8,
              background: "var(--cyan)",
              borderRadius: "50%",
              boxShadow: "0 0 12px var(--cyan), 0 0 24px var(--cyan)",
            }} />
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--indigo), transparent)" }} />
          </div>

          <p style={{
            fontSize: "clamp(15px, 2vw, 20px)",
            lineHeight: 1.8,
            color: "rgba(240,240,255,0.6)",
            maxWidth: 640,
          }}>
            From chef to Principal Engineer — the architect who modernised Panviva Core,
            containerised it on AKS, and showed the entire team what AI is truly capable of.
          </p>

          {/* Scroll hint */}
          <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)" }}>
            <div style={{
              width: 1,
              height: 48,
              background: "linear-gradient(to bottom, var(--indigo), transparent)",
              margin: "0 auto",
            }} />
          </div>
        </section>

        {/* ── MANIFESTO ── */}
        <section style={{ padding: "0 24px 96px" }}>
          <div style={{
            maxWidth: 860,
            margin: "0 auto",
            background: "rgba(108,99,255,0.06)",
            borderLeft: "4px solid var(--orange)",
            padding: "48px 48px 48px 44px",
            position: "relative",
            boxShadow: "0 0 60px rgba(255,107,53,0.08)",
          }}>
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: 1,
              background: "linear-gradient(90deg, var(--orange), transparent)",
            }} />
            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--orange)",
              marginBottom: 20,
            }}>
              Transmission — Global AI Revolution
            </p>
            <p style={{
              fontSize: "clamp(18px, 2.8vw, 26px)",
              fontWeight: 700,
              lineHeight: 1.6,
              color: "var(--text)",
            }}>
              We are living through a once-in-a-generation shift.
              The kind that rewrites industries, careers, and the world.
              And you&apos;re not just watching —{" "}
              <span style={{ color: "var(--orange)" }}>you&apos;re leading it.</span>
            </p>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section style={{ padding: "0 24px 96px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <SectionHeading label="CAREER TIMELINE" color="var(--indigo)" />

            <div style={{ position: "relative" }}>
              {/* Spine */}
              <div style={{
                position: "absolute",
                left: 32,
                top: 0,
                bottom: 0,
                width: 1,
                background: "linear-gradient(to bottom, var(--indigo), var(--cyan), var(--orange))",
                opacity: 0.3,
              }}>
                {/* Animated pulse dot */}
                <div style={{
                  position: "absolute",
                  left: -3,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--cyan)",
                  boxShadow: "0 0 8px var(--cyan)",
                  animation: "data-pulse 3s linear infinite",
                }} />
              </div>

              {milestones.map((m, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: 32,
                  marginBottom: 40,
                  paddingLeft: 0,
                }}>
                  {/* Dot on spine */}
                  <div style={{
                    position: "relative",
                    width: 65,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    paddingRight: 0,
                  }}>
                    <div style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: m.color,
                      boxShadow: `0 0 12px ${m.color}, 0 0 24px ${m.color}`,
                      marginTop: 4,
                      flexShrink: 0,
                      marginRight: -6,
                    }} />
                  </div>

                  {/* Card */}
                  <div className={i % 3 === 0 ? "glow-border-indigo" : i % 3 === 1 ? "glow-border-cyan" : "glow-border-orange"} style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.02)",
                    padding: "20px 24px",
                    borderRadius: 2,
                  }}>
                    <p style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      color: m.color,
                      marginBottom: 8,
                      textTransform: "uppercase",
                    }}>
                      {m.label}
                    </p>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
                      {m.title}
                    </h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.8, color: "var(--dim)" }}>
                      {m.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ATTRIBUTES ── */}
        <section style={{
          background: "rgba(108,99,255,0.04)",
          borderTop: "1px solid rgba(108,99,255,0.15)",
          borderBottom: "1px solid rgba(108,99,255,0.15)",
          padding: "80px 24px",
        }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <SectionHeading label="WHAT MAKES TRISTAN REMARKABLE" color="var(--cyan)" />

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}>
              {attributes.map((a, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid rgba(${a.color === "var(--indigo)" ? "108,99,255" : a.color === "var(--cyan)" ? "0,245,255" : a.color === "var(--orange)" ? "255,107,53" : "255,0,110"},0.25)`,
                  padding: "28px 24px",
                  borderRadius: 2,
                  transition: "box-shadow 0.3s",
                }}>
                  <span style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "var(--orange)",
                    display: "block",
                    marginBottom: 12,
                    opacity: 0.9,
                  }}>
                    {a.numeral}
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>
                    {a.title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--dim)" }}>
                    {a.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AI INFLECTION POINT ── */}
        <section style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,245,255,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
            <SectionHeading label="THE AI INFLECTION POINT" color="var(--cyan)" />

            {/* Date callout */}
            <div style={{
              textAlign: "center",
              marginBottom: 56,
            }}>
              <div style={{
                display: "inline-block",
                border: "1px solid rgba(0,245,255,0.3)",
                borderRadius: 2,
                padding: "14px 32px",
                background: "rgba(0,245,255,0.04)",
              }}>
                <p style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 11,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--cyan)",
                  marginBottom: 6,
                }}>March 12, 2026 — 10:05 AM</p>
                <p style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "var(--text)",
                }}>&ldquo;Creating a Bright Blue Sky with AI&rdquo;</p>
              </div>
            </div>

            <p style={{ fontSize: 16, lineHeight: 1.9, color: "var(--dim)", marginBottom: 24, textAlign: "center" }}>
              This was not an inspirational talk. It was a <strong style={{ color: "var(--text)" }}>working demonstration</strong> — AI applied
              responsibly to one of Panviva&apos;s most complex systems. Real architecture. Real data risk. Real results.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.9, color: "var(--dim)", marginBottom: 56, textAlign: "center" }}>
              Tristan didn&apos;t ask whether AI <em>might</em> be useful. He showed <strong style={{ color: "var(--cyan)" }}>how it already was</strong> — if approached with discipline.
            </p>

            {/* Wave of initiatives */}
            <div style={{ marginBottom: 56 }}>
              <p style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--orange)",
                textAlign: "center",
                marginBottom: 24,
                opacity: 0.8,
              }}>14 initiatives — one wave</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                {[
                  { id: "CXMI-531", name: "AI-Assisted Jira Story Creation" },
                  { id: "CXMI-532", name: "AI-Powered Customer Feedback & Idea Hub" },
                  { id: "CXMI-533", name: "AI-Driven Team Health Dashboard" },
                  { id: "CXMI-534", name: "AI Incident Post-Mortem Generator" },
                  { id: "CXMI-535", name: "Claude Code Shared Learning System", tristan: true },
                  { id: "CXMI-536", name: "SkillForge — Enterprise AI Skill Library" },
                  { id: "CXMI-537", name: "AI-Powered Impact Analysis Tool" },
                  { id: "CXMI-538", name: "Internal AI Knowledge-Sharing Platform" },
                  { id: "CXMI-539", name: "Intelligent QA Assistant" },
                  { id: "CXMI-540", name: "Phoenix Deployment Integration" },
                  { id: "CXMI-541", name: "SiteAssistant Bot" },
                  { id: "CXMI-542", name: "AI Orchestrator Team", tristan: true },
                  { id: "CXMI-603", name: "PromptGraph — Prompt Optimizer" },
                  { id: "CXMI-604", name: "SuperSecurity — AI Command Safety Layer" },
                ].map((item) => (
                  <div key={item.id} style={{
                    background: item.tristan ? "rgba(108,99,255,0.08)" : "rgba(255,255,255,0.02)",
                    border: item.tristan ? "1px solid rgba(108,99,255,0.5)" : "1px solid rgba(108,99,255,0.15)",
                    borderRadius: 2,
                    padding: "14px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    position: "relative",
                  }}>
                    {item.tristan && (
                      <span style={{
                        position: "absolute",
                        top: 8, right: 10,
                        fontFamily: "'Courier New', monospace",
                        fontSize: 9,
                        color: "var(--cyan)",
                        letterSpacing: "0.1em",
                        opacity: 0.9,
                      }}>TRISTAN</span>
                    )}
                    <span style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: 10,
                      color: item.tristan ? "var(--cyan)" : "var(--indigo)",
                      letterSpacing: "0.15em",
                    }}>{item.id}</span>
                    <span style={{ fontSize: 13, color: item.tristan ? "var(--text)" : "var(--dim)", lineHeight: 1.5 }}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pull quote */}
            <div style={{
              borderLeft: "3px solid var(--cyan)",
              paddingLeft: 24,
              margin: "0 auto",
              maxWidth: 620,
            }}>
              <p style={{
                fontSize: "clamp(16px, 2vw, 19px)",
                fontStyle: "italic",
                lineHeight: 1.8,
                color: "rgba(240,240,255,0.8)",
                marginBottom: 12,
              }}>
                &ldquo;If Tristan had not pushed the organisation through that initial conversation —
                and shown a disciplined, working AI-driven approach — Panviva would not be where it is today.&rdquo;
              </p>
              <p style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--cyan)",
                opacity: 0.7,
              }}>The change was driven by thinking, structure, and leadership.</p>
            </div>
          </div>
        </section>

        {/* ── GLOBAL MOMENT ── */}
        <section style={{
          padding: "100px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,245,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <p style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 10,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            marginBottom: 24,
            opacity: 0.7,
          }}>
            Melbourne → Townsville → Canada → The World
          </p>

          <h2 className="gradient-text" style={{
            fontSize: "clamp(40px, 7vw, 80px)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: 40,
          }}>
            This Is the Moment
          </h2>

          {/* Globe SVG */}
          <div style={{ marginBottom: 48, opacity: 0.85 }}>
            <svg width="280" height="160" viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Globe outline */}
              <ellipse cx="140" cy="80" rx="100" ry="60" stroke="rgba(108,99,255,0.3)" strokeWidth="1" />
              <ellipse cx="140" cy="80" rx="60" ry="60" stroke="rgba(108,99,255,0.15)" strokeWidth="1" />
              <ellipse cx="140" cy="80" rx="20" ry="60" stroke="rgba(108,99,255,0.15)" strokeWidth="1" />
              <line x1="40" y1="80" x2="240" y2="80" stroke="rgba(108,99,255,0.2)" strokeWidth="1" />
              <line x1="140" y1="20" x2="140" y2="140" stroke="rgba(108,99,255,0.2)" strokeWidth="1" />
              {/* Latitude lines */}
              <ellipse cx="140" cy="55" rx="87" ry="15" stroke="rgba(108,99,255,0.12)" strokeWidth="1" />
              <ellipse cx="140" cy="105" rx="87" ry="15" stroke="rgba(108,99,255,0.12)" strokeWidth="1" />
              {/* Glowing nodes */}
              {[
                { cx: 100, cy: 65, c: "#6C63FF" },
                { cx: 180, cy: 70, c: "#00F5FF" },
                { cx: 140, cy: 90, c: "#FF6B35" },
                { cx: 80, cy: 95, c: "#FF006E" },
                { cx: 200, cy: 55, c: "#00F5FF" },
                { cx: 155, cy: 50, c: "#6C63FF" },
              ].map((n, i) => (
                <g key={i}>
                  <circle cx={n.cx} cy={n.cy} r="8" fill={n.c} opacity="0.15" />
                  <circle cx={n.cx} cy={n.cy} r="3" fill={n.c} opacity="0.9" />
                </g>
              ))}
              {/* Connection lines */}
              <line x1="100" y1="65" x2="180" y2="70" stroke="rgba(0,245,255,0.25)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="140" y1="90" x2="200" y2="55" stroke="rgba(108,99,255,0.25)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="80" y1="95" x2="155" y2="50" stroke="rgba(255,107,53,0.25)" strokeWidth="1" strokeDasharray="3,3" />
            </svg>
          </div>

          <p style={{
            fontSize: "clamp(16px, 2.2vw, 21px)",
            lineHeight: 1.8,
            color: "rgba(240,240,255,0.7)",
            maxWidth: 620,
            margin: "0 auto 32px",
          }}>
            The AI revolution is rewriting every industry, every company,
            every career. Tristan saw it first. Built for it first.
            And brought the whole team with him.
          </p>

          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            fontWeight: 700,
            color: "var(--cyan)",
            letterSpacing: "0.05em",
            textShadow: "0 0 20px var(--cyan), 0 0 40px rgba(0,245,255,0.4)",
          }}>
            The future ships with your name on it.
          </p>
        </section>

        {/* ── MESSAGE ── */}
        <section style={{
          padding: "80px 24px 96px",
          background: "rgba(255,107,53,0.03)",
          borderTop: "1px solid rgba(255,107,53,0.1)",
        }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <SectionHeading label="FROM THE TEAM" color="var(--orange)" />

            {/* Personal tribute */}
            <div style={{
              background: "rgba(108,99,255,0.06)",
              border: "1px solid rgba(108,99,255,0.25)",
              borderLeft: "4px solid var(--indigo)",
              borderRadius: 2,
              padding: "40px 40px 32px",
              marginBottom: 40,
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: 1,
                background: "linear-gradient(90deg, var(--indigo), transparent)",
              }} />
              <p style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--indigo)",
                marginBottom: 24,
                opacity: 0.8,
              }}>A personal note</p>
              {[
                "Tristan is one of those rare people where work and life don't sit in separate boxes.",
                "We've been side by side since the moment I joined Panviva — not just on projects, but on everything. Work, life, ideas, frustrations, big dreams, stupid ideas that somehow turned into real things. We can spend hours talking about anything, and usually do. We're on each other's toes all the time — and that's exactly why it works.",
                "I've seen Tristan grow from a developer into the engineer and leader he is today, step by step, never skipping the hard parts. There was no shortcut, no entitlement — just learning, doing, failing, fixing, and doing it again. Seeing that growth up close has been genuinely inspiring.",
                "But what I respect most isn't just his technical ability. It's who he is as a person.",
                "I've seen how deeply he cares for his family — always doing whatever it takes, without complaint. Chopping Christmas trees. Driving kids miles to school. Building a farm from scratch. Raising chickens and rabbits. Taking on everything with this quiet \"I'll figure it out\" attitude. No drama. Just responsibility.",
                "Watching him move his entire family from Australia to Canada is something I'll never forget. That kind of decision — and the courage it takes — is a once‑in‑a‑lifetime journey. He carried it with the same mindset he brings to work: do it properly, take care of people, don't cut corners.",
                "Professionally, I may help plant seeds — ideas, directions, what could be possible — but Tristan is the one who nurtures them. He turns the seeds into trees. The entire modernisation journey is proof of that. He didn't just talk about it — he made it real, one hard decision at a time.",
                "We don't even spend enough time talking about how much he's driven our AI journey. That turning point only happened because he pushed, showed us what \"done properly\" looks like, and backed it with real work. Without that, we simply wouldn't be where we are today.",
                "More than anything, Tristan is a life buddy. Someone I trust deeply. Someone I respect, hands down. Someone I know will always show up — for the work, for the people, and for the things that actually matter.",
                "Full stop.",
              ].map((para, i) => (
                <p key={i} style={{
                  fontSize: i === 0 ? 17 : 14.5,
                  fontWeight: i === 0 ? 700 : 400,
                  lineHeight: 1.85,
                  color: i === 0 ? "var(--text)" : "rgba(240,240,255,0.75)",
                  marginBottom: i === 9 ? 0 : 16,
                  fontStyle: i === 9 ? "normal" : "normal",
                }}>
                  {i === 9 ? <strong style={{ color: "var(--text)" }}>{para}</strong> : para}
                </p>
              ))}
              <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(108,99,255,0.4), transparent)" }} />
                <span style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--indigo)",
                }}>— Sang</span>
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
              marginBottom: 56,
            }}>
              {[
                { quote: "Tristan is the rare combination of sharp intellect, calm leadership, and just enough chaos to keep things interesting — basically the guy you want in charge and slightly worried about at the same time." },
                { quote: "From my first day at Panviva to today at Upland Panviva, Tristan has always been approachable, generous with his knowledge, and someone who makes every conversation valuable." },
                { quote: "Wishing a fantastic birthday to the one who turns our \"uh-ohs\" into \"aha!\" moments daily.", author: "Parikshit" },
                { quote: "Tris — you are Heimdall in our universe. Have a great year!!" },
                { quote: "A person with great domain & technical knowledge, bringing new ideas and improvements to the product and team. Always a motivation to turn our camera on 🙂" },
                { quote: "A smart trusted technical mind who thinks holistically and executes decisively 🎂" },
                { quote: "We wouldn't be here today if Tristan didn't push us, show us what AI is capable of. Today we honour that — and the remarkable journey of the person behind it all." },
                { quote: "Wishing Tristan a very happy birthday and many thanks for being such a supportive teammate." },
                { quote: "He is highly talented person." },
                { quote: "He is always willing to help and teach, works above and beyond to create solutions, and is a great advocate for the team." },
                { quote: "Standing strong in every moment and solving every challenge with grace, our all-time savior, today we celebrate you. Happy Birthday!" },
                { quote: "You are the best man, don't know what we would do without you!!" },
                { quote: "Tristan is an all-rounder — but the best thing I appreciate is he never ignores any request, whether small or large. He doesn't distinguish between tasks or people. A wonderful person to work with." },
                { quote: "Tristan always makes himself available to provide sagely wisdom wherever it is needed. I don't know where we would be without him." },
                { quote: "Down to earth personality." },
                { quote: "Smart, caring and fun to work with, always has your back." },
                { quote: "I hope you enjoy your special day and have a very happy birthday, Tristan!", author: "Todd" },
              ].map((t, i) => {
                const colors = ["var(--indigo)", "var(--cyan)", "var(--orange)", "var(--magenta)"];
                const c = colors[i % colors.length];
                return (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid rgba(255,255,255,0.07)`,
                    borderTop: `2px solid ${c}`,
                    borderRadius: 2,
                    padding: "20px 20px 16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 12,
                  }}>
                    <p style={{
                      fontSize: 13.5,
                      fontStyle: "italic",
                      lineHeight: 1.8,
                      color: "rgba(240,240,255,0.75)",
                    }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    {t.author && (
                      <span style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: 10,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: c,
                        opacity: 0.8,
                      }}>— {t.author}</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 11,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--orange)",
              }}>
                With respect, pride, and excitement — The Panviva Team
              </p>
            </div>
          </div>
        </section>

        {/* ── CLOSER ── */}
        <section style={{ textAlign: "center", padding: "80px 24px 64px", position: "relative" }}>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(108,99,255,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <h2 className="gradient-text" style={{
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
          }}>
            Happy Birthday, Tristan.
          </h2>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          textAlign: "center",
          padding: "20px 24px 32px",
          borderTop: "1px solid rgba(108,99,255,0.1)",
        }}>
          <div style={{
            width: 5, height: 5,
            borderRadius: "50%",
            background: "var(--indigo)",
            boxShadow: "0 0 8px var(--indigo)",
            margin: "0 auto 12px",
          }} />
          <p style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "rgba(240,240,255,0.2)",
            textTransform: "uppercase",
          }}>
            2026 · Built with pride
          </p>
        </footer>
      </main>
    </>
  );
}

function SectionHeading({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <p style={{
        fontFamily: "'Courier New', monospace",
        fontSize: 10,
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color,
        marginBottom: 12,
        opacity: 0.8,
      }}>
        {label}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
        <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${color})` }} />
        <div style={{
          width: 6, height: 6,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 10px ${color}`,
        }} />
        <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, ${color}, transparent)` }} />
      </div>
    </div>
  );
}
