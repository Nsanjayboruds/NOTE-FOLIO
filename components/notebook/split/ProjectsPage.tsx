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

type Project = {
  name: string;
  tagline: string;
  description: ReactNode;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  /** Emoji or short text shown as the project "logo" sticker */
  icon: string;
  /** Subtle rotation on the icon sticker */
  iconRotation: number;
  /** Background tint for the icon frame */
  stickerBg?: string;
  /** Status badge */
  status: "live" | "wip" | "archived";
};

const PROJECTS: Project[] = [
  {
    name: "RIVETO",
    tagline: "Open-source full-stack web platform",
    description: (
      <>
        A full-stack open-source platform built with React, Node.js, Express.js,
        and MongoDB. Features secure JWT refresh-token rotation, role-based
        access control, REST APIs, Cloudinary media uploads, admin analytics,
        and payment integration.
      </>
    ),
    tags: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary"],
    githubUrl: "https://github.com/Nsanjayboruds/RIVETO",
    icon: "🚀",
    iconRotation: -3,
    stickerBg: "#eef4fb",
    status: "live",
  },

  {
    name: "FiscalAura",
    tagline: "AI-powered tax planning platform",
    description: (
      <>
        A full-stack AI tax assistant for FY 2025–26 that compares Old vs. New
        tax regimes and helps with deduction planning. Built with React,
        TypeScript, Go, Supabase, and PostgreSQL, with AI-powered document
        extraction and automated tax strategy generation using Groq.
      </>
    ),
    tags: ["React", "TypeScript", "Go", "Supabase", "PostgreSQL", "Groq"],
    githubUrl: "https://github.com/Nsanjayboruds/FiscalAura",
    icon: "💰",
    iconRotation: 4,
    stickerBg: "#f0fbe8",
    status: "live",
  },

  {
    name: "J.A.R.I.V.S Assistant",
    tagline: "Multimodal AI personal assistant",
    description: (
      <>
        A multimodal AI personal assistant built with React and Python,
        powered by Groq and LLaMA models. Supports voice interaction, intelligent
        responses, vision capabilities, task automation, web search, and
        emotion-aware features.
      </>
    ),
    tags: ["Python", "React", "Groq", "LLaMA", "AI", "Voice"],
    githubUrl: "https://github.com/Nsanjayboruds/DeveloperAssistant",
    icon: "🤖",
    iconRotation: -5,
    stickerBg: "#fdf0fb",
    status: "live",
  },

  {
    name: "SmartFarm",
    tagline: "AI-powered agricultural intelligence",
    description: (
      <>
        An AI-powered agricultural platform that applies machine learning and
        deep learning to support crop selection, disease management, fertilizer
        recommendations, and data-driven farming decisions.
      </>
    ),
    tags: ["Python", "Machine Learning", "Deep Learning", "AI", "Data Science"],
    githubUrl: "https://github.com/Nsanjayboruds/smart-agriculture-model",
    icon: "🌱",
    iconRotation: -2,
    stickerBg: "#edfbf0",
    status: "live",
  },

  {
    name: "Ruby Sinatra Quickstart",
    tagline: "Open-source API starter kit",
    description: (
      <>
        A Ruby Sinatra and PostgreSQL quickstart featuring Books and Reviews
        APIs, search, filtering, pagination, and SQL analytics. Includes Docker
        setup and automated Keploy recording/replay with 20 API scenarios
        covering both success and error paths.
      </>
    ),
    tags: ["Ruby", "Sinatra", "PostgreSQL", "Docker", "Keploy"],
    githubUrl: "https://github.com/keploy/samples-ruby",
    icon: "💎",
    iconRotation: 3,
    stickerBg: "#fdf5eb",
    status: "live",
  },


];


const PROJECT_STAGGER_MS = 340;
const FIRST_PROJECT_DELAY_MS = 380;

const STATUS_LABELS: Record<Project["status"], string> = {
  live: "live",
  wip: "in progress",
  archived: "archived",
};

export function ProjectsPage({
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
            backgroundImage: "var(--rule-background)",
            backgroundAttachment: "local",
          }}
        >
          <PageBackButton onClose={onClose} />

          {/* Page label */}
          <div
            style={{
              position: "absolute",
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
            journal · projects
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
            projects
          </h1>

          {/* Subline */}
          <p
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-script)",
              color: "var(--color-ink-soft)",
              opacity: 0.75,
              margin: 0,
              marginBottom: "calc(var(--line) * 1.5)",
              lineHeight: "var(--line)",
              maxWidth: 520,
            }}
          >
            things I&apos;ve built, shipped, and tinkered with.
          </p>

          {/* Project list */}
          <div
            style={{
              position: "relative",
              marginTop: "calc(var(--line) * 0.5)",
              paddingLeft: isMobile ? 0 : 24,
            }}
          >
            {PROJECTS.map((project, i) => (
              <ProjectEntry
                key={project.name}
                project={project}
                delayMs={FIRST_PROJECT_DELAY_MS + i * PROJECT_STAGGER_MS}
              />
            ))}
          </div>

          {/* Footer note */}
          <div
            style={{
              marginTop: "calc(var(--line) * 2)",
              paddingTop: "calc(var(--line) * 1)",
              borderTop:
                "1px dashed color-mix(in srgb, var(--color-ink-soft) 20%, transparent)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-script)",
                fontSize: "var(--fs-script)",
                color: "var(--color-ink-soft)",
                opacity: 0.65,
                margin: 0,
                lineHeight: "var(--line)",
              }}
            >
              More on{" "}
              <a
                href="https://github.com/nishant-borude"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--color-ink)",
                  textDecoration: "underline",
                  textDecorationStyle: "dashed",
                  textUnderlineOffset: "3px",
                }}
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>

        <PageCorner pageNumber="07" />
      </div>
    </PageAnimateContext.Provider>
  );
}

// ── Project entry ─────────────────────────────────────────────────────

function ProjectEntry({
  project,
  delayMs,
}: {
  project: Project;
  delayMs: number;
}) {
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
        marginBottom: "calc(var(--line) * 2.5)",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(12px)",
        transition:
          "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), transform 520ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Header row: icon sticker + title/tagline + links */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
          minHeight: "calc(var(--line) * 2)",
        }}
      >
        <IconSticker project={project} />

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Status + links row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-hint)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              lineHeight: "var(--line)",
              flexWrap: "wrap",
            }}
          >
            <StatusBadge status={project.status} />
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} source code on GitHub`}
                style={{
                  color:
                    "color-mix(in srgb, var(--color-ink-soft) 60%, transparent)",
                  textDecoration: "none",
                  transition: "color 160ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-ink-soft)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "color-mix(in srgb, var(--color-ink-soft) 60%, transparent)";
                }}
              >
                github ↗
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} live site`}
                style={{
                  color:
                    "color-mix(in srgb, var(--color-ink-soft) 60%, transparent)",
                  textDecoration: "none",
                  transition: "color 160ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-ink-soft)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "color-mix(in srgb, var(--color-ink-soft) 60%, transparent)";
                }}
              >
                live ↗
              </a>
            )}
          </div>

          {/* Project name */}
          <div
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-md)",
              fontWeight: 500,
              color: "var(--color-ink)",
              lineHeight: "var(--line)",
            }}
          >
            {project.name}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-script)",
              fontStyle: "italic",
              color: "var(--color-ink-soft)",
              lineHeight: "var(--line)",
            }}
          >
            {project.tagline}
          </div>
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          fontFamily: "var(--font-script)",
          fontSize: "var(--fs-body)",
          fontWeight: 400,
          color: "var(--color-ink)",
          lineHeight: "var(--line)",
          maxWidth: 540,
          marginTop: 6,
        }}
      >
        {project.description}
      </div>

      {/* Tech tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginTop: 10,
        }}
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-meta)",
              letterSpacing: "0.06em",
              color:
                "color-mix(in srgb, var(--color-ink-soft) 70%, transparent)",
              border:
                "1px dashed color-mix(in srgb, var(--color-ink-soft) 28%, transparent)",
              borderRadius: 3,
              padding: "2px 8px",
              lineHeight: 1.5,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Icon sticker ──────────────────────────────────────────────────────

function IconSticker({ project }: { project: Project }) {
  const size = 58;
  const bg = project.stickerBg ?? "#fbfaf4";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        flexShrink: 0,
        background: bg,
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 8,
        transform: `rotate(${project.iconRotation}deg)`,
        filter: "drop-shadow(2px 3px 6px rgba(0,0,0,0.16))",
        transition:
          "transform 260ms cubic-bezier(0.22, 1, 0.36, 1), filter 260ms ease",
        fontSize: 26,
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `rotate(${project.iconRotation}deg) scale(1.08)`;
        e.currentTarget.style.filter =
          "drop-shadow(3px 5px 9px rgba(0,0,0,0.24))";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${project.iconRotation}deg) scale(1)`;
        e.currentTarget.style.filter =
          "drop-shadow(2px 3px 6px rgba(0,0,0,0.16))";
      }}
    >
      {project.icon}
    </div>
  );
}

// ── Status badge ──────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Project["status"] }) {
  const colors: Record<Project["status"], string> = {
    live: "color-mix(in srgb, #3a8a4a 55%, transparent)",
    wip: "color-mix(in srgb, #a06020 55%, transparent)",
    archived: "color-mix(in srgb, var(--color-ink-soft) 45%, transparent)",
  };

  return (
    <span
      style={{
        color: colors[status],
        letterSpacing: "0.15em",
      }}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
