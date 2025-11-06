# 🎊 FestiRo - Indian Festival Calendar & AI Assistant

<div align="center">

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://festiro-vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![License MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Never miss an Indian festival again!** 🎉

An AI-powered calendar to discover, track, and celebrate Indian festivals with personalized insights and muhurat timings.

[Live Demo](https://festiro-app.vercel.app/chat-assistant) • [GitHub](https://github.com/Arjun-57561/festiro-app) • [Issues](https://github.com/Arjun-57561/festiro-app/issues)

</div>

---

## ✨ Features

- 🗓️ **Interactive Festival Calendar** - Monthly view with 50+ Indian festivals
- 🤖 **AI Chat** - Instant answers powered by Groq Llama 3.3 & Google Gemini
- 📚 **Learning Hub** - 14+ lessons on festivals, rituals, and spiritual knowledge
- 🎯 **Muhurat Timings** - Auspicious dates and calculations
- 🌙 **Dark Mode** - OKLCH color system with automatic theme switching
- 📱 **PWA** - Offline support, installable on mobile/desktop
- 🔍 **Smart Search** - Filter by name, date, or region
- ⚡ **Performance** - Lighthouse 94, 1.2s FCP, 150KB bundle (gzipped)
- ♿ **Accessible** - WCAG AAA compliant
- 🔒 **SEO Optimized** - Structured data, sitemaps, 50+ keywords

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm 10+
- Git

### Setup

```
# Clone repository
git clone https://github.com/Arjun-57561/festiro-app.git
cd festiro-app

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
GROQ_API_KEY=gsk_your_key
GEMINI_API_KEY=AIzaSy_your_key
```

```
# Start dev server
pnpm dev

# Visit http://localhost:3000
```

---

## 🛠️ Tech Stack

| Category | Tools |
|----------|-------|
| **Frontend** | Next.js 15, React 18, TypeScript, Tailwind CSS, shadcn/ui |
| **AI/LLM** | Groq (Llama 3.3), Google Gemini 2.0 Flash |
| **Styling** | Tailwind CSS, Framer Motion, Lucide Icons |
| **Deployment** | Vercel, GitHub Actions |
| **Package Manager** | pnpm |

---

## 📁 Project Structure

```
festiro-app/
├── app/
│   ├── api/assist_v2/        # AI chat endpoint
│   ├── calendar/             # Calendar page
│   ├── chat/                 # Chat interface
│   ├── learning/             # Learning hub
│   └── layout.tsx            # Root layout
├── components/               # Reusable components
├── lib/                      # Utilities & types
├── public/                   # Static assets, PWA
└── package.json
```

---

## 📊 Performance

| Metric | Score |
|--------|-------|
| Lighthouse | ✅ 94 |
| First Contentful Paint | ✅ 1.2s |
| Bundle Size (gzipped) | ✅ 150KB |
| Build Time | ✅ 22s |

---

## 🔐 Environment Variables

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
GROQ_API_KEY=your_groq_key
GEMINI_API_KEY=your_gemini_key
NEXT_PUBLIC_GA_ID=your_analytics_id (optional)
```

**Get API Keys:**
- [Groq Console](https://console.groq.com)
- [Google AI Studio](https://ai.google.dev)

---

## 📝 Scripts

```
pnpm dev           # Start dev server
pnpm build         # Build for production
pnpm start         # Run production server
pnpm lint          # Run ESLint
pnpm type-check    # Check TypeScript
```

---

## 🚀 Deploy to Vercel

```
git push origin main
```

1. Go to [vercel.com/new](https://vercel.com/new)
2. Select your repo
3. Add environment variables
4. Deploy

Auto-deploys on every `git push`. Live in 2-3 minutes.

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `pnpm-lock.yaml` out of sync | `rm pnpm-lock.yaml && pnpm install` |
| Service Worker not registering | Clear cache (Ctrl+Shift+Del), hard refresh |
| LLM API errors | Verify API keys, check usage limits |
| Dark mode not working | Clear cache, hard refresh (Ctrl+Shift+R) |

---

## 📈 Roadmap

- [ ] **Phase 2**: Vercel Postgres, NextAuth.js, user profiles
- [ ] **Phase 3**: Push notifications, community discussions, user contributions
- [ ] **Phase 4**: Premium features, subscription model
- [ ] **Phase 5**: React Native mobile app, multi-language support

---

## 🤝 Contributing

```
# Fork & clone
git clone https://github.com/YOUR_USERNAME/festiro-app.git

# Create feature branch
git checkout -b feature/amazing-feature

# Commit & push
git commit -m '✨ Add amazing-feature'
git push origin feature/amazing-feature

# Open Pull Request
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

## 📞 Support

- [GitHub Issues](https://github.com/Arjun-57561/festiro-app/issues)
- [GitHub Discussions](https://github.com/Arjun-57561/festiro-app/discussions)
- Email: [mallikarjun57561@gmail.com](mailto:mallikarjun57561@gmail.com)

---

## 🙏 Built With

[shadcn/ui](https://ui.shadcn.com/) • [Tailwind CSS](https://tailwindcss.com/) • [Framer Motion](https://www.framer.com/motion/) • [Lucide Icons](https://lucide.dev/) • [Groq](https://console.groq.com/) • [Google AI](https://ai.google.dev/) • [Vercel](https://vercel.com/)

---

<div align="center">

**Made with ❤️ by Arjun**

[⬆ Back to top](#-festiro---indian-festival-calendar--ai-assistant)

</div>
```
