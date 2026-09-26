"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { PageBackButton } from "../chrome/PageBackButton";
import { PageCorner } from "../chrome/PageCorner";
import { Paper } from "../chrome/Paper";
import {
  PageAnimateContext,
  usePageAnimate,
} from "../primitives/PageAnimateContext";

type Role = {
  company: string;
  title: string;
  dates: string;
  location?: string;
  logoSrc?: string;
  /** External URL the logo links to — the company's site. Optional so
   *  entries without a public link fall back to a non-interactive sticker. */
  companyUrl?: string;
  /** Fallback displayed in a sticker frame when no logo is available. */
  initials?: string;
  blurb: ReactNode;
  /** Rotation for the logo sticker, degrees. Tuned per role so the
   *  stickers don't all sit perfectly straight. */
  logoRotation: number;
  /** Background color for the sticker frame. Subtle variation per role. */
  stickerBg?: string;
};

/** Highlighted metric — same handwriting, slightly larger + heavier. */
function Metric({ children }: { children: ReactNode }) {
  // Emphasis via weight + full-ink color + negative letter-spacing — no
  // fontSize override, because a 1.18em span on a blurb line would push
  // the line-box taller than --line and drift every following line off
  // the ruled grid.
  return (
    <span
      style={{
        fontWeight: 600,
        color: "var(--color-ink)",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </span>
  );
}

const ROLES: Role[] = [
  {
    company: "Gradeazy",
    title: "Software & Website Testing Intern",
    dates: "Feb 2026 – May 2026",
    location: "Surat, Gujarat, India",
    logoSrc: "/logos/gradeazy_logo.jpeg",
    companyUrl: "https://gradeazy.com",
    logoRotation: -4,
    blurb: (
      <>
        Performed functional, API, UI, database, and security testing across web applications,
        validating end-to-end workflows, identifying defects, and conducting XSS, IDOR, and
        access-control checks.
      </>
    ),
  },
  {
    company: "FOSSASIA",
    title: "Open Source Contributor",
    dates: "Jan 2026 – Present",
    location: "Singapore, Singapore",
    logoSrc: "/logos/fossasia.jpeg",
    companyUrl: "https://fossasia.org",
    logoRotation: 5,
    blurb: (
      <>
        Contributing to open-source projects through Git and GitHub, collaborating with maintainers
        and developers on issues, pull requests, code improvements, and project documentation.
      </>
    ),
  },
  {
    company: "CommuSync",
    title: "Full Stack Developer Intern",
    dates: "Dec 2025 – Mar 2026",
    location: "Noida, Uttar Pradesh, India",
    logoSrc: "/logos/sass.jpeg",
    companyUrl: "https://www.commusync.in",
    logoRotation: -3,
    blurb: (
      <>
        Built full-stack platforms using Next.js, TypeScript, Express.js, and MongoDB with modular
        APIs and role-based workflows. Developed HRaaS and AI Academy modules and integrated Groq AI
        with Redis and BullMQ for asynchronous processing.
      </>
    ),
  },
  {
    company: "Keploy",
    title: "Open Source Contributor",
    dates: "jan 2026 - sep 2026",
    location: "Remote",
    logoSrc: "/logos/keploy.jpeg",
    companyUrl: "https://keploy.io",
    logoRotation: -3,
    blurb: (
      <>
        Built a Ruby Sinatra and PostgreSQL quickstart with Books and Reviews APIs, search,
        filtering, pagination, and SQL analytics. Added Docker setup and automated Keploy
        recording/replay with 20 API scenarios covering success and error paths.
      </>
    ),
  },
  {
    company: "Aadi Foundation",
    title: "Web Developer",
    dates: "Oct 2025 – Nov 2025",
    location: "Delhi, India",
    logoSrc: "/logos/aadi.jpeg",
    companyUrl: "https://linktr.ee/aadifoundation",
    logoRotation: 6,
    stickerBg: "#efe8fb",
    blurb: (
      <>
        Developed and deployed web features using JavaScript and Firebase, focusing on responsive
        interfaces, application functionality, and reliable deployment workflows.
      </>
    ),
  },
  {
    company: "Open Source Connect",
    title: "Open Source Contributor",
    dates: "Aug 2025 – Oct 2025",
    location: "India",
    logoSrc: "/logos/connect.jpeg",
    companyUrl: "https://www.osconnect.org/",
    logoRotation: -5,
    blurb: (
      <>
        Contributed to open-source projects by improving documentation, accessibility, code quality,
        and project usability while collaborating through Git-based development workflows.
      </>
    ),
  },
  {
    company: "GirlScript Summer of Code",
    title: "Contributor – GirlScript Summer of Code 2025",
    dates: "Jul 2025 – Oct 2025",
    location: "India",
    logoSrc: "/logos/girlscriptsoc_logo.jpeg",
    companyUrl: "https://gssoc.girlscript.tech/",
    logoRotation: -4,
    blurb: (
      <>
        Contributed to open-source projects as part of GSSoC 2025, working with mentors and
        maintainers to implement features, resolve issues, improve code quality, and submit
        pull requests.
      </>
    ),
  },
];


const ROLE_STAGGER_MS = 380;
const FIRST_ROLE_DELAY_MS = 400;

export function ExperiencePage({
  onClose,
  animate = true,
  sessionKey = 0,
}: {
  onClose: () => void;
  animate?: boolean;
  sessionKey?: number;
}) {
  const isMobile = useIsMobile();
  return (
    <PageAnimateContext.Provider value={{ animate, sessionKey }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <Paper ruled={false} marginRule={false} />

        <div
          style={{
            position: "absolute",
            inset: 0,
            paddingTop: "calc(var(--line) * 3)",
            paddingBottom: "calc(var(--line) * 3)",
            paddingLeft: isMobile
              ? "calc(var(--pad-content) + 44px)"
              : "calc(12% + var(--pad-content))",
            paddingRight: isMobile ? "var(--pad-content)" : "8%",
            overflowY: "auto",
            // Ruled lines travel with the content on scroll. background-
            // attachment: local binds the bg to the content so the rules
            // move together with the text — without it the bg sticks to
            // the scroll container and text drifts across fixed rules.
            backgroundImage: "var(--rule-background)",
            backgroundAttachment: "local",
          }}
        >
          <PageBackButton onClose={onClose} />

          {/* Page label */}
          <div
            style={{
              position: "absolute",
              // Baseline floats 0.19 × --line above rule 2.
              top: "calc(var(--line) * 2.57 - var(--fs-meta) * 0.86)",
              left: isMobile
                ? "calc(44px + var(--pad-content))"
                : "calc(3% + var(--pad-chrome))",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-meta)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color:
                "color-mix(in srgb, var(--color-ink-soft) 55%, transparent)",
              lineHeight: 1,
            }}
          >
            journal · experience
          </div>

          {/* Page title */}
          <h1
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-display)",
              fontWeight: 500,
              color: "var(--color-ink)",
              margin: 0,
              lineHeight: "calc(var(--line) * 3)",
            }}
          >
            experience
          </h1>

          {/* Role list — small left indent keeps entries off the margin
            rule without the old timeline gutter. */}
          <div
            style={{
              position: "relative",
              marginTop: "var(--line)",
              paddingLeft: isMobile ? 0 : 24,
            }}
          >
            {ROLES.map((role, i) => (
              <RoleEntry
                key={`${role.company}-${role.title}`}
                role={role}
                delayMs={FIRST_ROLE_DELAY_MS + i * ROLE_STAGGER_MS}
              />
            ))}
          </div>
        </div>

        <PageCorner pageNumber="02" />
      </div>
    </PageAnimateContext.Provider>
  );
}

// ── Role entry ────────────────────────────────────────────────────────

function RoleEntry({ role, delayMs }: { role: Role; delayMs: number }) {
  // Hold at opening frame (opacity 0, translated 12px down) until the
  // host page is ready. When pageAnimate flips to true, start the
  // stagger delay and reveal. When it flips back to false (navigated
  // away), reset so the next revisit replays the reveal.
  const pageAnimate = usePageAnimate();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!pageAnimate) {
      setShown(false);
      return;
    }
    if (shown) return;
    const t = window.setTimeout(() => setShown(true), delayMs);
    return () => window.clearTimeout(t);
  }, [delayMs, shown, pageAnimate]);

  return (
    <div
      style={{
        position: "relative",
        // Integer-line-multiple gap so every role's text lands on a rule.
        // Half-line values (e.g. 2.5) push odd/even roles off-grid.
        marginBottom: "calc(var(--line) * 2)",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(12px)",
        transition:
          "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), transform 520ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Header row: dates + company + logo sticker */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
          // No inter-element spacing here so blurb's top lands exactly at
          // (role top + 3 × --line) — keeps the grid intact.
          minHeight: "calc(var(--line) * 2)",
        }}
      >
        <LogoSticker role={role} />
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Dates — small, mono, ink-faint */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-hint)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-ink-faint)",
              lineHeight: "var(--line)",
            }}
          >
            {role.dates}
            {role.location ? (
              <span style={{ opacity: 0.6 }}> · {role.location}</span>
            ) : null}
          </div>
          {/* Company name — big handwriting */}
          <div
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-md)",
              fontWeight: 500,
              color: "var(--color-ink)",
              lineHeight: "var(--line)",
            }}
          >
            {role.company}
          </div>
          {/* Role title — italic Caveat, a shade softer */}
          <div
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-script)",
              fontStyle: "italic",
              color: "var(--color-ink-soft)",
              lineHeight: "var(--line)",
            }}
          >
            {role.title}
          </div>
        </div>
      </div>

      {/* Blurb — primary body text, sits on the ruled grid. Uses --fs-body
          (not --fs-script) so its baseline lands on the rule at 0.76 ×
          --line; smaller --fs-script has a higher baseline fraction
          (~0.72) that drifts above the rule. */}
      <div
        style={{
          fontFamily: "var(--font-script)",
          fontSize: "var(--fs-body)",
          fontWeight: 400,
          color: "var(--color-ink)",
          lineHeight: "var(--line)",
          maxWidth: 560,
        }}
      >
        {role.blurb}
      </div>
    </div>
  );
}

// ── Logo sticker ──────────────────────────────────────────────────────

function LogoSticker({ role }: { role: Role }) {
  const size = 70;
  const bg = role.stickerBg ?? "#fbfaf4";

  const inner = (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bg,
        padding: 4,
        border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      {role.logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={role.logoSrc}
          alt={`${role.company} logo`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
          draggable={false}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-script)",
            fontSize: "var(--fs-body)",
            fontWeight: 500,
            color: "var(--color-ink)",
            opacity: 0.75,
          }}
        >
          {role.initials ?? role.company.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );

  const baseStyle: React.CSSProperties = {
    display: "block",
    width: size,
    height: size,
    flexShrink: 0,
    transform: `rotate(${role.logoRotation}deg)`,
    filter: "drop-shadow(2px 3px 6px rgba(0,0,0,0.22))",
    transition:
      "transform 260ms cubic-bezier(0.22, 1, 0.36, 1), filter 260ms ease",
    cursor: role.companyUrl ? "pointer" : "default",
    textDecoration: "none",
    color: "inherit",
  };

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = `rotate(${role.logoRotation}deg) scale(1.06)`;
    e.currentTarget.style.filter =
      "drop-shadow(3px 5px 9px rgba(0,0,0,0.28))";
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = `rotate(${role.logoRotation}deg) scale(1)`;
    e.currentTarget.style.filter =
      "drop-shadow(2px 3px 6px rgba(0,0,0,0.22))";
  };

  // Wrap in an <a> when a companyUrl is present, otherwise fall back to a
  // non-interactive div so the sticker is a keyboard-accessible link only
  // when it has somewhere to go.
  if (role.companyUrl) {
    return (
      <a
        href={role.companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${role.company} website (opens in new tab)`}
        style={baseStyle}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {inner}
      </a>
    );
  }

  return (
    <div style={baseStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {inner}
    </div>
  );
}
