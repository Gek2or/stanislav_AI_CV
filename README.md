# Stanislav_CV

Professional React/Vite portfolio for **Stanislav Kosytskyy**, tailored to an **AI Software Engineer** direction and specifically aligned with Bitonet Oy's publicly described focus on clear business-oriented technology, industry-specific software, responsible AI usage, security and manageable implementation.

## Stack

- React + JavaScript/JSX
- Vite
- Tailwind CSS via the official Vite plugin
- lucide-react
- GitHub Pages deployment workflow

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages

The Vite base path is already configured for the repository name:

```text
stanislav_AI_CV
```

After the repository is created and the code is pushed, enable **Settings → Pages → Source: GitHub Actions**. The included workflow builds and publishes `dist/` automatically after pushes to `main`.

## Portfolio structure

- AI Software Engineer hero / AI workbench
- Practical AI system-thinking pipeline
- Multi-model routing: ChatGPT, Claude, Gemini, Grok, Google Flow, Labs/Storyboard and AI coding tools
- Bitonet-specific fit section
- Real business and project evidence from Autochemix / Muuttobotti
- Python/API/automation development direction
- Multilingual UI: English, Finnish, Ukrainian and Russian
- Curated `Ask Stanislav AI` portfolio knowledge assistant

## Important design choice

The assistant is intentionally transparent: it is a curated knowledge assistant, not a fake claim that a live LLM is running in the browser. A real model endpoint can be added later through a server-side function/API so no API key is exposed client-side.
