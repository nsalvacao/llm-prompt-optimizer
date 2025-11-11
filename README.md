# LLM Prompt Optimizer

> Transform draft prompts into production-grade instructions tailored to Gemini, Claude, ChatGPT, or Llama—directly from a focused React + Vite workspace.

## Table of Contents
1. [Overview](#overview)
2. [Key Capabilities](#key-capabilities)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Configuration Reference](#configuration-reference)
7. [Usage Workflow](#usage-workflow)
8. [Testing & Quality](#testing--quality)
9. [Tech Stack](#tech-stack)
10. [Roadmap](#roadmap)
11. [License](#license)
12. [Maintainer](#maintainer)

## Overview
LLM Prompt Optimizer is a single-page React application that rewrites user prompts using provider-specific optimization frameworks. It persists preferences in local storage, guides users through template-based drafting, and calls either Google Gemini or a user-specified OpenAI-compatible endpoint to deliver deterministic, structured prompts for downstream work.

## Key Capabilities
- **Template-first ideation**: Built-in prompt templates (content, code, SQL, marketing) seed variables with double-curly placeholders for fast iteration.
- **LLM-aware rewriting**: Switch between Gemini, Anthropic Claude, OpenAI ChatGPT, or Meta Llama instruction sets; each path loads a bespoke system prompt crafted for that model family.
- **Contextual variables**: The UI extracts `{{placeholders}}` and renders inline inputs so users can merge contextual data without editing the template manually.
- **History & favorites**: Every optimization run is timestamped, saved locally, filterable via a search bar, and can be pinned for quick reuse.
- **Settings modal**: Configure provider, temperature, API keys, and OpenAI-compatible endpoints without touching code; values persist across sessions via `localStorage`.
- **Copy + reuse flows**: Copy either the source or optimized prompt to the clipboard, or reuse a past optimization as the next input in a single click.

## Architecture
| Layer | Responsibilities | Key Files |
| --- | --- | --- |
| Presentation | React components with Tailwind-inspired utility classes render the editor, templates, and history tabs. | `App.tsx`, `SettingsModal.tsx`, `index.tsx`, `index.html` |
| Domain logic | LLM selection, progress indicators, variable parsing, clipboard helpers, and persistent history management. | `App.tsx`, `useSettings.ts` |
| Services | Provider-specific prompt optimization via Google Gemini SDK or generic OpenAI-compatible HTTP calls. | `services/geminiService.ts` |
| Configuration & typing | Enumerations, prompt templates, reusable constants, and shared TypeScript types. | `constants.tsx`, `types.ts`, `vite.config.ts`, `tsconfig.json` |

High-level flow:
1. User selects a template or writes a raw prompt.
2. Variable placeholders materialize as inputs; values hydrate the final string before the API call.
3. Settings modal supplies API credentials and sampling temperature.
4. `optimizePrompt` builds a provider-specific system instruction and calls Gemini or an OpenAI-compatible endpoint (Claude, ChatGPT, Llama wrappers).
5. The rewritten prompt is rendered, saved to history, and optionally marked as favorite or copied.

## Project Structure
```
.
├── App.tsx                 # Main UI and workflow logic
├── SettingsModal.tsx      # Provider + temperature configuration modal
├── constants.tsx          # LLM options and prompt templates
├── services/
│   └── geminiService.ts   # Provider-specific optimization service
├── types.ts               # Shared enums and domain types
├── useSettings.ts         # LocalStorage-backed settings hook
├── index.tsx / index.html # Vite entry point
├── docs/                  # Documentation & showcase assets (webpage lives here)
├── package.json           # Scripts and dependency manifest
└── vite.config.ts         # Build tooling
```

## Getting Started
### Prerequisites
- Node.js 18+ and npm 9+
- A Google Gemini API key (required by default) and/or an OpenAI-compatible API key if you plan to switch providers.

### Installation
```bash
git clone https://github.com/nsalvacao/llm-prompt-optimizer.git
cd llm-prompt-optimizer
npm install
```

### Local Development
```bash
npm run dev       # Starts Vite with hot module reload on http://localhost:5173
npm run build     # Produces an optimized bundle in dist/
npm run preview   # Serves the production build locally
```

## Configuration Reference
| Setting | Where to configure | Notes |
| --- | --- | --- |
| `Gemini API Key` | Settings modal (`provider: gemini`) or `.env` variable `API_KEY` read during build | Required for default Gemini mode; stored locally only if user provides it in the modal. |
| `OpenAI API Key` | Settings modal when `provider: openai` | Mandatory when switching to ChatGPT-compatible mode. |
| `OpenAI Base URL` | Settings modal (`https://api.openai.com/v1` by default) | Point this to any compatible endpoint (e.g., Azure OpenAI, LocalAI). |
| `OpenAI Model` | Settings modal (`gpt-4o` default) | Set to the deployed model ID. |
| `Temperature` | Slider inside the modal | Shared across providers; persisted in `localStorage`. |

To preload secrets during development, you can export them before running Vite:
```bash
export API_KEY="<your_gemini_key>"
npm run dev
```

## Usage Workflow
1. Launch the app (`npm run dev`) and open the Settings modal to confirm provider, API keys, and temperature.
2. Pick a template or paste your own prompt. Any `{{variable}}` tokens automatically surface as inline inputs—fill them to hydrate the prompt.
3. Choose the target LLM; the UI highlights the active provider and loads its optimization framework.
4. Click **Optimize**. A progress bar animates while `services/geminiService.ts` issues the API call and enforces anti-hallucination guardrails.
5. Review the optimized prompt, copy it, or store it as a favorite. History entries can be searched, filtered, reused, or toggled between “All” and “Favorites”.

## Testing & Quality
- `npm run test` runs the Vitest suite (see `App.test.tsx` for starter coverage).
- Add component-level tests alongside their modules (e.g., `App.test.tsx`).
- Manual QA checklist:
  - Verify provider switching (Gemini ↔ OpenAI) and API validation messages.
  - Confirm placeholders expand correctly after editing template text.
  - Ensure history persists between reloads and favorites stay pinned.

## Tech Stack
- **Framework**: React 19 + TypeScript, bundled by Vite 6.
- **UI Patterns**: Utility-first CSS classes (Tailwind-style) embedded directly in JSX.
- **AI SDKs**: `@google/genai` for Gemini; native `fetch` for OpenAI-compatible chat completions.
- **State & Storage**: React hooks + `localStorage` for history and settings persistence.
- **Testing**: Vitest + Testing Library + jsdom.

## Roadmap
1. Add granular provider adapters (e.g., Anthropic SDK, Groq) instead of routing everything through Gemini/OpenAI code paths.
2. Persist history/favorites to IndexedDB or a lightweight backend for multi-device continuity.
3. Ship downloadable prompt packs and allow importing/exporting history as JSON.
4. Integrate linting/formatting (ESLint + Prettier) and add CI via GitHub Actions.

## License
Distributed under the [MIT License](LICENSE).

## Maintainer
Created and maintained by Nuno Salvação (<nexo-modeling@outlook.com>). Contributions and feedback are welcome via GitHub issues or pull requests.
