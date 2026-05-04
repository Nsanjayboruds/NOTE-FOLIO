export const profile = {
  name: "Nishant Borude",
  shortName: "Nishant",
  headline: "Full Stack Developer",
  intro:
    "Passionate Full Stack Developer specializing in building modern, scalable web applications and solving complex problems with code.",
  email: "contact@nishantborude.com",
  linkedin: "https://www.linkedin.com/in/nishantborude/", // assumed
  github: "https://github.com/nishant-borude",
  x: "https://x.com/nishantborude", // assumed
  instagram: "https://www.instagram.com/nishantborude", // assumed
  photo: "/images/hero-portrait.jpg",
  photoAlt:
    "Portrait of Nishant Borude.",
};

export const socialLinks = [
  { href: profile.linkedin, label: "LinkedIn", icon: "linkedin" as const },
  { href: profile.github, label: "GitHub", icon: "github" as const },
  { href: `mailto:${profile.email}`, label: "Email", icon: "mail" as const },
];

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  logo: string;
  logoAlt: string;
  highlights: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "Personal Projects",
    role: "Full Stack Developer",
    period: "2023 - Present",
    logo: "/logos/github.svg", // fallback
    logoAlt: "GitHub logo",
    highlights: [
      "Built RIVETO: A project focused on innovative solutions and development using JavaScript and React.",
      "Built FiscalAura: A financial and fiscal management application using Node.js.",
      "Built J.A.R.I.V.S Assistant: An AI-powered assistant application for intelligent automation in Python.",
    ],
  }
];

export const currentFocus = [
  {
    title: "Full Stack Development",
    description:
      "Creating scalable, accessible, and highly performant applications that deliver exceptional user experiences.",
  },
  {
    title: "System Optimization",
    description:
      "Diving deep into system optimization and robust backend architecture.",
  },
  {
    title: "Open Source",
    description:
      "Contributing to open-source projects and collaborating on innovative web applications.",
  },
];
