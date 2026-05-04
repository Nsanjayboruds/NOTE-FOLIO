"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { PageBackButton } from "../chrome/PageBackButton";
import { PageCorner } from "../chrome/PageCorner";
import { Paper } from "../chrome/Paper";
import {
  PageAnimateContext,
  usePageAnimate,
} from "../primitives/PageAnimateContext";

type BlogPost = {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
};

const FEATURED_IMAGE = "/photos/img3.png";
const FEATURED_POINTS = [
  "building projects that feel useful, not just impressive",
  "mixing frontend polish with AI and backend systems",
  "learning in public through experiments, notes, and small wins",
];

type AchievementCard = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  image?: string;
  kind: "image" | "stats" | "collage";
};

const ACHIEVEMENTS: AchievementCard[] = [
  {
    id: "gsoc-2026",
    title: "GSoC 2026 Shortlisted",
    subtitle: "FOSSASIA",
    description:
      "Shortlisted based on proposal strength and open-source contributions.",
    tag: "Open Source",
    image: "/linkedin/gsoc-shortlisted.png",
    kind: "image",
  },
  {
    id: "GIRLSCRIPT SUMMER OF CODE 2025",
    title: "GIRLSCRIPT SUMMER OF CODE 2025",
    subtitle: "Contributions and Learnings",
    description:
      "Participated in the program and contributed to various open-source projects.",
    tag: "Open Source Event",
    image: "/linkedin/badge.png",
    kind: "collage",
  },{
    id: "hacktoberfest",
    title: "Hacktoberfest Achievements",
    subtitle: "Badges, pull requests, and a T-shirt",
    description:
      "Earned 6+ badges and the official tee by showing up consistently and shipping useful contributions.",
    tag: "Open Source Event",
    image: "/blogs/hackto.png",
    kind: "collage",
  },
  {
    id: "codechef",
    title: "Competitive Programming",
    subtitle: "CodeChef · 1538 rating · 2★",
    description:
      "Solved 299+ problems while steadily improving speed, accuracy, and problem-solving intuition.",
    tag: "Algorithms",
    kind: "stats",
  },
  {
    id: "gitlab",
    title: "GitLab Community Member",
    subtitle: "Selected contributor",
    description:
      "Chosen as a community contributor and kept showing up across issues, reviews, and collaboration.",
    tag: "Community",
    image: "/blogs/gitlabcom.png",
    kind: "image",
  },
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: "react-patterns",
    title: "Advanced React Patterns for Scalable Applications",
    summary:
      "Exploring render props, compound components, and custom hooks to build maintainable React applications.",
    category: "React",
    date: "2024-04-15",
    readTime: "8 min read",
    tags: ["React", "JavaScript", "Patterns"],
  },
  {
    id: "node-deployment",
    title: "Deploying Node.js Applications on Modern Platforms",
    summary:
      "A guide to deploying Node.js apps on Vercel, AWS, and Docker with best practices for CI/CD pipelines.",
    category: "Backend",
    date: "2024-03-28",
    readTime: "12 min read",
    tags: ["Node.js", "DevOps", "Deployment"],
  },
  {
    id: "ai-integration",
    title: "Integrating AI Models into Production Systems",
    summary:
      "Lessons learned from building AI-powered features in production with Claude, OpenAI, and local models.",
    category: "AI/ML",
    date: "2024-03-10",
    readTime: "10 min read",
    tags: ["AI", "LLM", "Integration"],
  },
  {
    id: "dsa-masterclass",
    title: "Data Structures & Algorithms: From Theory to Practice",
    summary:
      "Deep dive into common DSA problems, optimization techniques, and how to approach algorithm interviews.",
    category: "Learning",
    date: "2024-02-15",
    readTime: "15 min read",
    tags: ["DSA", "Algorithms", "Interview"],
  },
  {
    id: "open-source",
    title: "Contributing to Open Source: My 25+ Pull Requests Journey",
    summary:
      "How I went from zero to 25+ contributions across Mozilla, FOSSASIA, and other major open source projects.",
    category: "Open Source",
    date: "2024-01-30",
    readTime: "9 min read",
    tags: ["Open Source", "GitHub", "Community"],
  },
];

const CATEGORIES = ["All", "React", "Backend", "AI/ML", "Learning", "Open Source"];

export function BlogPage({
  onClose,
  animate = true,
  sessionKey = 0,
}: {
  onClose: () => void;
  animate?: boolean;
  sessionKey?: number;
}) {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const filteredPosts =
    selectedCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const togglePostExpand = useCallback((postId: string) => {
    setExpandedPost((prev) => (prev === postId ? null : postId));
  }, []);

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
            journal · blog
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
            blog
          </h1>

          {/* Subline */}
          <p
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-script)",
              color: "var(--color-ink-soft)",
              opacity: 0.75,
              margin: 0,
              marginBottom: "var(--line)",
              lineHeight: "var(--line)",
              maxWidth: 560,
            }}
          >
            writing about code, design, AI, and the journey of building products.
          </p>

          {/* Featured intro */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1.1fr) minmax(220px, 0.9fr)",
              gap: "calc(var(--line) * 1.5)",
              alignItems: "start",
              marginBottom: "calc(var(--line) * 2)",
              padding: "calc(var(--line) * 1.5)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 10,
              background: "rgba(255,255,255,0.35)",
              boxShadow: "0 10px 24px rgba(0,0,0,0.05)",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-script)",
                  fontSize: "var(--fs-lg)",
                  fontWeight: 500,
                  color: "var(--color-ink)",
                  margin: 0,
                  lineHeight: 1.25,
                }}
              >
                writing what I am learning while I build
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-script)",
                  fontSize: "var(--fs-script)",
                  color: "var(--color-ink-soft)",
                  margin: "12px 0 16px",
                  lineHeight: 1.6,
                }}
              >
                This blog is where I collect the parts of my journey that are worth
                sharing: experiments, mistakes, wins, and the ideas behind the
                products I build. It is a mix of engineering notes, design thinking,
                and the kind of progress that only shows up if you keep showing up.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: 10,
                }}
              >
                {FEATURED_POINTS.map((point) => (
                  <li
                    key={point}
                    style={{
                      fontFamily: "var(--font-script)",
                      fontSize: "var(--fs-script)",
                      color: "var(--color-ink)",
                      display: "flex",
                      gap: 10,
                      lineHeight: 1.4,
                    }}
                  >
                    <span style={{ color: "var(--color-ink-soft)" }}>•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <figure
              style={{
                margin: 0,
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div
                style={{
                  position: "relative",
                  minHeight: 240,
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.08)",
                  background:
                    "linear-gradient(135deg, rgba(34,34,42,0.03), rgba(34,34,42,0.08))",
                }}
              >
                <img
                  src={FEATURED_IMAGE}
                  alt="Nishant working on projects"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <figcaption
                style={{
                  fontFamily: "var(--font-script)",
                  fontSize: "var(--fs-meta)",
                  color: "var(--color-ink-soft)",
                  textAlign: "center",
                }}
              >
                my build notes, screenshots, and ideas in one place
              </figcaption>
            </figure>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 14,
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-script)",
                fontSize: "var(--fs-lg)",
                fontWeight: 500,
                margin: 0,
                color: "var(--color-ink)",
              }}
            >
              selected achievements
            </h2>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-meta)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "color-mix(in srgb, var(--color-ink-soft) 60%, transparent)",
              }}
            >
              cards · stats · proof
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
              gap: "calc(var(--line) * 1.25)",
              marginBottom: "calc(var(--line) * 2.5)",
            }}
          >
            {ACHIEVEMENTS.map((achievement) => (
              <AchievementCardView key={achievement.id} achievement={achievement} />
            ))}
          </div>

          {/* Category filters */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: "calc(var(--line) * 2)",
              marginTop: "var(--line)",
            }}
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  background:
                    selectedCategory === category
                      ? "var(--color-ink)"
                      : "transparent",
                  color:
                    selectedCategory === category
                      ? "var(--color-bg)"
                      : "var(--color-ink-soft)",
                  border:
                    selectedCategory === category
                      ? "none"
                      : "1px solid var(--color-ink-soft)",
                  padding: "6px 14px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--fs-meta)",
                  cursor: "pointer",
                  borderRadius: "4px",
                  transition:
                    "background 200ms ease, color 200ms ease, border-color 200ms ease",
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog posts list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "calc(var(--line) * 2)" }}>
            {filteredPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
                expanded={expandedPost === post.id}
                onToggle={() => togglePostExpand(post.id)}
              />
            ))}
          </div>
        </div>

        <PageCorner pageNumber="05" />
      </div>
    </PageAnimateContext.Provider>
  );
}

function AchievementCardView({
  achievement,
}: {
  achievement: AchievementCard;
}) {
  return (
    <article
      style={{
        position: "relative",
        overflow: "hidden",
        padding: 18,
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.1)",
        background:
          achievement.kind === "stats"
            ? "linear-gradient(160deg, rgba(33,35,67,0.94), rgba(78,84,160,0.84))"
            : "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.5))",
        boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
        minHeight: achievement.kind === "stats" ? 300 : 310,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-meta)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:
                achievement.kind === "stats"
                  ? "rgba(255,255,255,0.72)"
                  : "color-mix(in srgb, var(--color-ink-soft) 65%, transparent)",
              marginBottom: 8,
            }}
          >
            {achievement.tag}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-lg)",
              fontWeight: 500,
              margin: 0,
              color:
                achievement.kind === "stats" ? "#fff" : "var(--color-ink)",
              lineHeight: 1.15,
            }}
          >
            {achievement.title}
          </h3>
          <p
            style={{
              margin: "8px 0 0",
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-meta)",
              color:
                achievement.kind === "stats"
                  ? "rgba(255,255,255,0.72)"
                  : "var(--color-ink-soft)",
            }}
          >
            {achievement.subtitle}
          </p>
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 999,
            background:
              achievement.kind === "stats"
                ? "rgba(255,255,255,0.12)"
                : "rgba(30,30,30,0.06)",
            color: achievement.kind === "stats" ? "#fff" : "var(--color-ink)",
            fontFamily: "var(--font-mono)",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {achievement.kind === "stats" ? "📈" : "✦"}
        </span>
      </div>

      {achievement.kind === "stats" ? (
        <StatsAchievement />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
          <div
            style={{
              position: "relative",
              minHeight: 180,
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.08)",
              background:
                achievement.kind === "collage"
                  ? "linear-gradient(135deg, rgba(27,27,31,0.05), rgba(255,196,82,0.15))"
                  : "rgba(255,255,255,0.5)",
            }}
          >
            <img
              src={achievement.image}
              alt={achievement.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: achievement.kind === "collage" ? "contain" : "cover",
                display: "block",
                padding: achievement.kind === "collage" ? 14 : 0,
                boxSizing: "border-box",
              }}
            />
            {achievement.kind === "collage" && (
              <div
                style={{
                  position: "absolute",
                  right: 12,
                  bottom: 12,
                  display: "flex",
                  gap: 8,
                }}
              >
                {Array.from({ length: 4 }).map((_, index) => (
                  <span
                    key={index}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 999,
                      background: ["#4f8cff", "#ffd166", "#8d99ae", "#ef476f"][index],
                      boxShadow: "0 0 0 2px rgba(255,255,255,0.7)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-script)",
              lineHeight: 1.55,
              color: "var(--color-ink)",
            }}
          >
            {achievement.description}
          </p>
        </div>
      )}
    </article>
  );
}

function StatsAchievement() {
  const sparkline = [8, 10, 12, 11, 13, 14, 15, 17, 18, 17, 19, 21];
  const max = Math.max(...sparkline);
  const min = Math.min(...sparkline);
  const points = sparkline
    .map((value, index) => {
      const x = (index / (sparkline.length - 1)) * 100;
      const y = 100 - ((value - min) / (max - min)) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 12,
        }}
      >
        <StatPill label="rating" value="1538" suffix="2★" />
        <StatPill label="solved" value="299+" suffix="problems" />
      </div>

      <div
        style={{
          borderRadius: 14,
          padding: 14,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            color: "rgba(255,255,255,0.78)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-meta)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <span>progress</span>
          <span>CodeChef</span>
        </div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: 96 }}>
          <polyline
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.92)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="0" cy={100 - ((sparkline[0] - min) / (max - min)) * 100} r="2.8" fill="#fff" />
          <circle cx="100" cy={100 - ((sparkline[sparkline.length - 1] - min) / (max - min)) * 100} r="2.8" fill="#fff" />
        </svg>
      </div>
    </div>
  );
}

function StatPill({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix: string;
}) {
  return (
    <div
      style={{
        borderRadius: 14,
        padding: 14,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-meta)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.72)",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          color: "#fff",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-script)",
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-meta)",
            color: "rgba(255,255,255,0.74)",
          }}
        >
          {suffix}
        </span>
      </div>
    </div>
  );
}

// ── Blog post card ────────────────────────────────────────────────────

function BlogPostCard({
  post,
  expanded,
  onToggle,
}: {
  post: BlogPost;
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
              margin: "0 0 8px 0",
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </h3>
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              marginBottom: "8px",
              fontSize: "var(--fs-meta)",
              color: "var(--color-ink-soft)",
            }}
          >
            <span>{post.category}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
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
          <p
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-script)",
              color: "var(--color-ink)",
              margin: "0 0 12px 0",
              lineHeight: 1.5,
            }}
          >
            {post.summary}
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "rgba(0,0,0,0.05)",
                  padding: "4px 8px",
                  borderRadius: "3px",
                  fontSize: "var(--fs-meta)",
                  color: "var(--color-ink-soft)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
