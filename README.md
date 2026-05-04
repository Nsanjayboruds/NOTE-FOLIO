# Nishant Borude — Journal

Personal portfolio site rendered as a spiral-bound journal. The chat is the home page, and every major section is a page you can flip to with a slash command or a matching question.

Live site: [nishant-borude.com](https://note-folio.onrender.com/)

## What’s Inside

- `/about` - personal intro with draggable polaroids and stickers
- `/experience` - timeline of roles, projects, and work history
- `/linkedin` - stacked cards for selected LinkedIn posts
- `/blog` - featured achievements plus blog/article cards
- `/techstack` - tools, languages, and workflow preferences
- `/contact` - direct contact details and quick actions

## Stack

Next.js 15 (App Router) · React 19 · TypeScript 5 · Tailwind v4 · Framer Motion 11 · Zustand 5 · Vercel AI SDK v4 · Zod 3 · Upstash Redis · hosted on Vercel.

## How It Works

### Journal Model

The notebook pages are mounted in a fixed z-order so navigation feels like turning sheets in a real journal. Pages stay mounted once visited, which keeps scroll position, drag state, images, and reveal animations intact when you come back.

Page order lives in [components/notebook/pageOrder.ts](components/notebook/pageOrder.ts).

### Navigation

Slash commands and a few common phrases are matched locally in [lib/intents.ts](lib/intents.ts) so the UI can flip instantly without waiting for the LLM. Free-form questions still go through `/api/chat` and can return tool calls that open pages too.

The app currently recognizes these local navigation commands:

- `/about`
- `/experience`
- `/linkedin`
- `/blog`
- `/techstack`
- `/contact`

### Pages

Each content page is a single file under [components/notebook/split/](components/notebook/split/):

- [AboutPage.tsx](components/notebook/split/AboutPage.tsx)
- [ExperiencePage.tsx](components/notebook/split/ExperiencePage.tsx)
- [LinkedInPage.tsx](components/notebook/split/LinkedInPage.tsx)
- [BlogPage.tsx](components/notebook/split/BlogPage.tsx)
- [TechStackPage.tsx](components/notebook/split/TechStackPage.tsx)
- [ContactPage.tsx](components/notebook/split/ContactPage.tsx)

The blog page now includes featured achievement cards for:

- GSoC 2026 shortlisted at FOSSASIA
- Hacktoberfest achievements
- Competitive programming on CodeChef
- GitLab community membership

## LLM Setup

The app is configured to use Groq through the OpenAI-compatible endpoint. Provider settings live in `.env.local`, and the abstraction in [lib/llm/](lib/llm/) can still switch between other providers if needed.

Key env vars:

- `LLM_PROVIDER`
- `OPENAI_API_BASE`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`

## Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Notes for Editing

- Add new page kinds in [lib/store.ts](lib/store.ts) and [components/notebook/pageOrder.ts](components/notebook/pageOrder.ts).
- Wire page rendering in [components/notebook/content/ContentPage.tsx](components/notebook/content/ContentPage.tsx).
- Add matching tool definitions in [lib/tools.ts](lib/tools.ts) and intent handling in [lib/intents.ts](lib/intents.ts).

## Assets

- LinkedIn previews: [public/linkedin/](public/linkedin)
- Photos: [public/photos/](public/photos)
- Logos: [public/logos/](public/logos)

## Hosting

Deployment settings live in [vercel.json](vercel.json). Metadata and OG image configuration live in [app/layout.tsx](app/layout.tsx) and [app/opengraph-image.tsx](app/opengraph-image.tsx).
