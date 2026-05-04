"use client";

import { useState, type CSSProperties } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { PageBackButton } from "../chrome/PageBackButton";
import { PageCorner } from "../chrome/PageCorner";
import { Paper } from "../chrome/Paper";
import {
  PageAnimateContext,
  usePageAnimate,
} from "../primitives/PageAnimateContext";

type TechCategory = {
  category: string;
  description: string;
  technologies: {
    name: string;
    proficiency: "expert" | "proficient" | "learning";
    icon?: string;
  }[];
};

const TECH_STACK: TechCategory[] = [
  {
    category: "Frontend",
    description: "Building responsive, interactive user experiences",
    technologies: [
      { name: "React", proficiency: "expert", icon: "⚛️" },
      { name: "TypeScript", proficiency: "expert", icon: "📘" },
      { name: "Next.js", proficiency: "expert", icon: "▲" },
      { name: "Tailwind CSS", proficiency: "proficient", icon: "🎨" },
      { name: "CSS3 & Animations", proficiency: "expert", icon: "✨" },
    ],
  },
  {
    category: "Backend",
    description: "Scalable APIs and server-side logic",
    technologies: [
      { name: "Node.js", proficiency: "expert", icon: "🟢" },
      { name: "Express.js", proficiency: "proficient", icon: "🚀" },
      { name: "Python", proficiency: "proficient", icon: "🐍" },
      { name: "PostgreSQL", proficiency: "proficient", icon: "🗄️" },
      { name: "MongoDB", proficiency: "proficient", icon: "🍃" },
      { name: "Redis", proficiency: "learning", icon: "⚡" },
    ],
  },
  {
    category: "AI/ML",
    description: "Integrating AI models and building intelligent features",
    technologies: [
      { name: "Claude API", proficiency: "expert", icon: "🤖" },
      { name: "OpenAI API", proficiency: "proficient", icon: "🧠" },
      { name: "LangChain", proficiency: "proficient", icon: "🔗" },
      { name: "Prompt Engineering", proficiency: "expert", icon: "💡" },
      { name: "RAG Systems", proficiency: "proficient", icon: "📚" },
    ],
  },
  {
    category: "DevOps & Tools",
    description: "Deployment, CI/CD, and development workflow",
    technologies: [
      { name: "Docker", proficiency: "proficient", icon: "🐳" },
      { name: "GitHub/GitLab", proficiency: "expert", icon: "🔀" },
      { name: "Vercel", proficiency: "expert", icon: "▲" },
      { name: "Git", proficiency: "expert", icon: "📝" },
      { name: "Postman", proficiency: "proficient", icon: "📮" },
    ],
  },
  {
    category: "Data Structures & Algorithms",
    description: "Core CS fundamentals and problem-solving",
    technologies: [
      { name: "Arrays & Strings", proficiency: "expert", icon: "📊" },
      { name: "Trees & Graphs", proficiency: "expert", icon: "🌳" },
      { name: "Dynamic Programming", proficiency: "proficient", icon: "⚙️" },
      { name: "Sorting & Searching", proficiency: "expert", icon: "🔍" },
    ],
  },
  {
    category: "Additional Skills",
    description: "Other tools and technologies",
    technologies: [
      { name: "Clerk Authentication", proficiency: "proficient", icon: "🔐" },
      { name: "Stripe Integration", proficiency: "learning", icon: "💳" },
      { name: "REST APIs", proficiency: "expert", icon: "🌐" },
      { name: "GraphQL", proficiency: "learning", icon: "🔱" },
    ],
  },
];

const STATS = [
  { label: "GitHub Contributions", value: "25+", description: "Open source projects" },
  { label: "Projects Built", value: "50+", description: "Full-stack applications" },
  { label: "Languages", value: "5+", description: "JavaScript, Python, TypeScript, etc." },
  { label: "Years Coding", value: "3+", description: "Continuous learning & building" },
];

export function TechStackPage({
  onClose,
  animate = true,
  sessionKey = 0,
}: {
  onClose: () => void;
  animate?: boolean;
  sessionKey?: number;
}) {
  const isMobile = useIsMobile();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

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
            journal · tech stack
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
            tech stack
          </h1>

          {/* Subline */}
          <p
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-script)",
              color: "var(--color-ink-soft)",
              opacity: 0.75,
              margin: 0,
              marginBottom: "calc(var(--line) * 2)",
              lineHeight: "var(--line)",
              maxWidth: 560,
            }}
          >
            tools, languages, and technologies I work with to build modern applications.
          </p>

          {/* Quick stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: "16px",
              marginBottom: "calc(var(--line) * 3)",
            }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: "16px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "6px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--fs-lg)",
                    fontWeight: 600,
                    color: "var(--color-ink)",
                    marginBottom: "4px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--fs-meta)",
                    color: "var(--color-ink-soft)",
                    marginBottom: "2px",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-script)",
                    fontSize: "var(--fs-chip)",
                    color: "var(--color-ink-soft)",
                    opacity: 0.7,
                  }}
                >
                  {stat.description}
                </div>
              </div>
            ))}
          </div>

          {/* Tech categories */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {TECH_STACK.map((category) => (
              <TechCategoryCard
                key={category.category}
                category={category}
                expanded={expandedCategory === category.category}
                onToggle={() => toggleCategory(category.category)}
              />
            ))}
          </div>

          {/* GitHub contribution note */}
          <div
            style={{
              marginTop: "calc(var(--line) * 3)",
              padding: "16px",
              background: "rgba(0,0,0,0.02)",
              border: "1px dashed rgba(0,0,0,0.1)",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-meta)",
                color: "var(--color-ink-soft)",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              🔗 Open Source Journey
            </div>
            <p
              style={{
                fontFamily: "var(--font-script)",
                fontSize: "var(--fs-script)",
                color: "var(--color-ink)",
                margin: "0 0 8px 0",
                lineHeight: 1.5,
              }}
            >
              Check out my open source contributions on{" "}
              <a
                href="https://github.com/Nsanjayboruds"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-ink)", textDecoration: "underline" }}
              >
                GitHub
              </a>
              . I&apos;ve contributed to Mozilla, FOSSASIA, Meshery, OWASP, and other major projects.
            </p>
          </div>
        </div>

        <PageCorner pageNumber="06" />
      </div>
    </PageAnimateContext.Provider>
  );
}

// ── Tech category card ────────────────────────────────────────────────

function TechCategoryCard({
  category,
  expanded,
  onToggle,
}: {
  category: TechCategory;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      style={{
        padding: "16px",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 220ms ease",
        background: expanded ? "rgba(0,0,0,0.02)" : "transparent",
        boxShadow: expanded
          ? "0 2px 8px rgba(0,0,0,0.08)"
          : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-lg)",
              fontWeight: 500,
              color: "var(--color-ink)",
              margin: "0 0 4px 0",
            }}
          >
            {category.category}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-script)",
              color: "var(--color-ink-soft)",
              opacity: 0.75,
              margin: 0,
            }}
          >
            {category.description}
          </p>
        </div>
        <div
          style={{
            fontSize: "20px",
            marginLeft: "12px",
            transition: "transform 200ms ease",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ⌄
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {category.technologies.map((tech) => (
              <div
                key={tech.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 12px",
                  background:
                    tech.proficiency === "expert"
                      ? "rgba(0,0,0,0.05)"
                      : tech.proficiency === "proficient"
                        ? "rgba(0,0,0,0.03)"
                        : "rgba(0,0,0,0.01)",
                  border:
                    tech.proficiency === "expert"
                      ? "1px solid rgba(0,0,0,0.1)"
                      : "1px solid rgba(0,0,0,0.05)",
                  borderRadius: "4px",
                  fontSize: "var(--fs-script)",
                  color: "var(--color-ink)",
                }}
              >
                <span>{tech.icon}</span>
                <span>{tech.name}</span>
                <span
                  style={{
                    fontSize: "var(--fs-meta)",
                    color: "var(--color-ink-soft)",
                    opacity: 0.6,
                    marginLeft: "4px",
                  }}
                >
                  {tech.proficiency === "expert"
                    ? "★★★"
                    : tech.proficiency === "proficient"
                      ? "★★"
                      : "★"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
