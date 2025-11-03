# 🚀 LLM Prompt Optimizer

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Tests-7%20passing-brightgreen)](App.test.tsx)
[![Node](https://img.shields.io/badge/Node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

**🌐 [View Landing Page](https://nsalvacao.github.io/llm-prompt-optimizer/) 

**Transform basic prompts into highly effective, LLM-optimized prompts using AI-powered analysis.**

LLM Prompt Optimizer is a web application that uses advanced prompt engineering techniques to rewrite and optimize your prompts for different Large Language Models (Gemini, Claude, ChatGPT, Llama). It leverages a "meta-LLM" approach to apply best practices specific to each target model.

---

## ✨ Features

- 🎯 **Multi-LLM Support** - Optimize prompts for Gemini, Claude (Anthropic), ChatGPT (OpenAI), and Llama (Meta)
- 🧠 **AI-Powered Optimization** - Uses Gemini 2.5 Pro (or custom OpenAI-compatible API) to intelligently rewrite prompts
- 📝 **Template Library** - Pre-built templates for common use cases (content creation, code generation, marketing)
- 🔄 **Variable System** - Detect and fill prompt variables with `{{variable}}` syntax
- 📚 **History & Favorites** - Track optimization history with search and favorites management
- ⚙️ **Flexible Configuration** - Support for Gemini API or any OpenAI-compatible endpoint
- 🎨 **Modern UI** - Clean, responsive interface built with React 19 and Tailwind CSS
- 💾 **Local Storage** - All history and settings persist in your browser (no server required)

---

## 🎬 Quick Start

### Prerequisites

- **Node.js** 18+ and **npm** 9+ installed
- A **Gemini API key** (free at [Google AI Studio](https://aistudio.google.com/apikey))
  _OR_ access to an **OpenAI-compatible API** endpoint

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/llm-prompt-optimizer.git
cd llm-prompt-optimizer

# 2. Install dependencies
npm install

# 3. Configure your API key
cp .env.example .env.local
# Edit .env.local and add your Gemini API key:
# GEMINI_API_KEY=your_actual_api_key_here

# 4. Start the development server
npm run dev
```

The application will be available at **http://localhost:3000**

### Alternative: OpenAI-Compatible API

If you prefer to use an OpenAI-compatible API instead of Gemini:

1. Start the app with `npm run dev`
2. Click the **gear icon** (⚙️) to open Settings
3. Select **OpenAI** provider
4. Enter:
   - **Base URL**: `https://api.openai.com/v1` (or your custom endpoint)
   - **API Key**: Your OpenAI API key
   - **Model**: `gpt-4` or `gpt-3.5-turbo`
5. Click **Save Settings**

Settings are stored in your browser's localStorage.

---

## 📖 How to Use

### Basic Workflow

1. **Enter Your Prompt**
   Type or paste your basic prompt in the main text area, or select a template to get started.

2. **Fill Variables (Optional)**
   If your prompt contains `{{variables}}`, input fields will appear automatically. Fill them in before optimizing.

3. **Select Target LLM**
   Choose the LLM you're optimizing for: Gemini, Anthropic (Claude), OpenAI (ChatGPT), or Meta (Llama).

4. **Optimize**
   Click the **Optimize** button. The AI will rewrite your prompt using best practices for your selected LLM.

5. **Review & Iterate**
   The optimized prompt replaces your input. You can copy it, optimize it again for a different LLM, or save it to favorites.

### Example

**Original Prompt:**
```
Write a blog post about AI
```

**Optimized Prompt (for Claude):**
```xml
<task>
You are an experienced tech blogger specializing in AI and machine learning. Write a comprehensive, engaging blog post about artificial intelligence.
</task>

<requirements>
- Target audience: Tech-savvy professionals and enthusiasts
- Length: 800-1200 words
- Tone: Informative yet accessible
- Include: Current trends, real-world applications, future implications
- Structure: Introduction, 3-4 main sections, conclusion
</requirements>

<output_format>
- Clear section headers
- Concrete examples and case studies
- Balanced perspective on benefits and challenges
</output_format>
```

---

## 🏗️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 6.2
- **Styling**: Tailwind CSS (utility classes)
- **LLM Integration**:
  - `@google/genai` SDK for Gemini
  - Fetch API for OpenAI-compatible endpoints
- **State Management**: React hooks + localStorage

---

## 🛠️ Development

### Commands

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Build for production (outputs to dist/)
npm run preview   # Preview production build locally
```

### Project Structure

```
llm-prompt-optimizer/
├── App.tsx                 # Main component (UI & state management)
├── SettingsModal.tsx       # Settings configuration UI
├── useSettings.ts          # Settings hook (localStorage persistence)
├── services/
│   └── geminiService.ts    # LLM optimization logic & API calls
├── types.ts                # TypeScript type definitions
├── constants.tsx           # LLM options & prompt templates
├── index.tsx               # React entry point
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
└── CLAUDE.md               # AI assistant guidance (for Claude Code)
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

See `.env.example` for detailed documentation.

### API Provider Settings

The app supports two providers (configured via Settings modal):

| Provider | Configuration |
|----------|---------------|
| **Gemini** | API Key (from Google AI Studio) |
| **OpenAI** | Base URL + API Key + Model name |

All settings persist in browser localStorage under key `llmAppSettings`.

---

## 🎯 Use Cases

- **Prompt Engineering**: Refine prompts for better LLM outputs
- **Cross-LLM Compatibility**: Adapt prompts when switching between models
- **Learning Tool**: See how expert prompts are structured
- **Template Management**: Build a library of reusable prompt templates
- **Experimentation**: Iterate quickly on prompt variations

---

## 📚 How It Works

### The Meta-LLM Approach

1. **System Instructions**: Each target LLM has a specialized optimization framework stored in `services/geminiService.ts`:
   - **Claude**: XML tags, step-by-step reasoning, role definitions
   - **Gemini**: Persona assignment, few-shot examples, task decomposition
   - **ChatGPT**: Delimiters, chain-of-thought, explicit formatting
   - **Llama**: Direct instructions, clear sectioning with `###` markers

2. **Optimization Process**:
   - Your prompt + target LLM selection → System instruction template
   - API call to meta-LLM (Gemini 2.5 Pro by default)
   - Receives optimized prompt following target LLM's best practices

3. **Variable Handling**:
   - Detects `{{variable_name}}` patterns via regex
   - Auto-generates input fields
   - Replaces variables before sending to API

### Anti-Hallucination Constraints

All system instructions include explicit constraints preventing the AI from inventing information:

```
CRITICAL: Do not invent, assume, or hallucinate any information,
facts, or data that is not explicitly provided in the original prompt's context.
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Development Guidelines

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- **Indentation**: 4 spaces
- **No semicolons** at end of statements
- **TypeScript strict mode** enabled
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions

---

## 🐛 Known Limitations

- **Browser-only**: No server-side rendering (localStorage dependency)
- **API Costs**: Using custom OpenAI endpoints may incur costs
- **Rate Limits**: Subject to provider API rate limits

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vitejs.dev/)
- Powered by [Google Gemini API](https://ai.google.dev/)
- UI styled with [Tailwind CSS](https://tailwindcss.com/)

---

## 📧 Contact

**Nuno Salvação**
📧 nexo-modeling@outlook.com
🔗 GitHub: [@nsalvacao](https://github.com/nsalvacao)

---


<div align="center">

**⭐ If this project helps you, consider giving it a star! ⭐**

Made with ❤️ by the LLM Prompt Optimizer community

</div>
