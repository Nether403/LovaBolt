# WebKnot — AI-Powered Project Specification Wizard

WebKnot is an 11-step wizard that guides you through creating detailed project specifications for AI-powered development tools like [Bolt.new](https://bolt.new), [Lovable.dev](https://lovable.dev), and [Claude Artifacts](https://claude.ai). Answer a few questions about your project and get a production-ready prompt in seconds.

---

## Features

- **11-step wizard** — Project setup, layout, design, color, typography, visuals, background, components, animations, functionality, and preview
- **93 React-Bits components** — 31 animated backgrounds, 37 UI components, 25 animation effects with one-click CLI install commands
- **AI-powered suggestions** — Smart defaults, NLP description parsing, design compatibility checker, and prompt quality scoring
- **Gemini AI integration** — Real-time project analysis, prompt enhancement, and conversational assistant (requires API key)
- **Multiple prompt templates** — Optimized for Bolt.new, Lovable.dev, Claude Artifacts, and generic use
- **Undo/redo** — Full history management with keyboard shortcuts
- **Auto-save** — All selections persist automatically via localStorage
- **Accessibility** — WCAG 2.1 AA compliant with keyboard navigation and screen reader support

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/your-org/webknot.git
cd webknot
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Tests

```bash
# Unit tests (fast, no browser)
npm run test

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Optional | Google Gemini API key (server-side proxy) |
| `VITE_API_URL` | Optional | Backend API URL (default: `http://localhost:3001`) |
| `VITE_AI_ENABLED` | Optional | Enable/disable AI features (default: `true`) |
| `VITE_AI_RATE_LIMIT` | Optional | Requests per hour for free users (default: `20`) |

Without a Gemini API key, all AI features fall back to the built-in rule-based system — the wizard is fully functional either way.

---

## Project Structure

```
src/
├── components/
│   ├── steps/          # 11 wizard step components
│   ├── ai/             # AI feature components (chat, suggestions, enhancement)
│   ├── cards/          # Reusable card components
│   ├── layout/         # Header, Sidebar, PreviewPanel, Footer
│   ├── modals/         # Modal components
│   └── ui/             # Base UI components (shadcn/ui)
├── stores/
│   └── boltBuilderStore.ts   # Zustand store (primary state)
├── hooks/
│   ├── ai/             # AI mutation hooks (useAnalyzeProject, useEnhancePrompt, etc.)
│   └── ...             # Other hooks (useSearchFilter, useKeyboardShortcuts, etc.)
├── services/
│   ├── geminiService.ts      # Gemini AI integration
│   ├── cacheService.ts       # LRU cache
│   ├── rateLimiter.ts        # Rate limiting
│   └── ...
├── data/
│   ├── react-bits/     # Modular react-bits data (backgrounds, components, animations)
│   ├── wizardData.ts   # Layout, design, color, typography data
│   └── promptTemplates.ts    # Prompt templates for different AI tools
├── utils/
│   ├── smartDefaults.ts      # Rule-based smart defaults
│   ├── nlpParser.ts          # Keyword-based NLP parser
│   ├── enhancedPromptGenerator.ts  # Prompt generation
│   └── ...
└── types/              # TypeScript type definitions
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + →` | Next step |
| `Ctrl + ←` | Previous step |
| `Ctrl + Z` | Undo |
| `Ctrl + Shift + Z` | Redo |
| `Ctrl + G` | Generate prompt |

---

## Wizard Steps

1. **Project Setup** — Name, description, type, and purpose. AI analyzes your description to suggest settings.
2. **Functionality** — Choose a feature tier (Basic → Enterprise) and technical requirements.
3. **Layout** — Primary layout structure and additional layout features.
4. **Design Style** — Visual aesthetic (Minimalist, Glassmorphism, Material Design, etc.).
5. **Color Theme** — Color palette with light/dark/system mode selection.
6. **Typography** — Font family, weights, sizes, and alignment.
7. **Visuals** — Illustration style, icon style, and image treatment.
8. **Background** — Solid color, gradient, pattern, or animated React-Bits background.
9. **Components** — Multi-select from 37 React-Bits UI components.
10. **Animations** — Multi-select from 25 animation effects.
11. **Preview** — Review all selections, choose a prompt template, and generate your prompt.

---

## AI Features

### Always Available (Rule-Based)

- **Smart Defaults** — Automatically configures all steps based on project type
- **NLP Parser** — Detects design preferences from your project description
- **Compatibility Checker** — Flags conflicting design choices
- **Prompt Quality Score** — Rates your prompt 0–100 with improvement suggestions
- **Context-Aware Suggestions** — Per-step recommendations based on your selections

### With Gemini API Key

- **Project Analysis** — AI analyzes your description and suggests project type, design style, and color theme
- **Prompt Enhancement** — AI adds accessibility, performance, SEO, and security details to your prompt
- **Conversational Assistant** — Chat with AI about your project while building it
- **Design Suggestions** — AI-powered compatibility analysis with auto-fix options

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| State | Zustand with persist middleware |
| Build | Vite 8 + Rolldown |
| AI | Google Gemini 2.5 Flash/Pro |
| UI Components | shadcn/ui + Radix UI |
| Animations | Framer Motion + GSAP |
| Validation | Zod |
| Testing | Vitest + Testing Library |
| Routing | React Router v7 |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines, commit conventions, and the pull request process.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

## License

MIT
