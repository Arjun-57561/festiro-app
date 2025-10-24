# FestiRo - Cultural Calendar Assistant

A multilingual cultural calendar assistant that helps users discover festivals, set reminders, create events, and learn about cultural celebrations.

## Features

- **Chat Assistant**: AI-powered conversational interface with voice input and TTS support
- **Calendar**: Interactive monthly calendar with festival highlights and event management
- **Event Creation**: Comprehensive form with AI generation, muhurat calculation, and poster upload
- **Notifications**: Smart reminder system with quiet hours and multi-channel support
- **Promotions**: Curated feed of featured events with rich media
- **Learning Hub**: Educational content about festivals and cultural traditions
- **Settings**: Customizable preferences for language, region, notifications, and accessibility

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Form Validation**: Zod + react-hook-form
- **State Management**: React Query (recommended for production)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env
# API Endpoints (replace with your backend URLs)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Optional: External service keys
# Add your API keys for speech-to-text, text-to-speech, etc.
\`\`\`

## Project Structure

\`\`\`
festiro-app/
├── app/                      # Next.js app router pages
│   ├── chat-assistant/       # Chat interface
│   ├── calendar/             # Calendar view
│   ├── event-create/         # Event creation form
│   ├── notifications/        # Reminders management
│   ├── promotions/           # Promotions feed
│   ├── learning/             # Learning hub
│   └── settings/             # User settings
├── components/               # React components
│   ├── layout/               # App shell, navigation
│   ├── chat/                 # Chat components
│   ├── calendar/             # Calendar components
│   ├── event-create/         # Event form components
│   ├── notifications/        # Notification components
│   ├── promotions/           # Promotion components
│   ├── learning/             # Learning components
│   ├── settings/             # Settings components
│   └── ui/                   # shadcn/ui components
├── lib/                      # Utilities and types
│   ├── types.ts              # TypeScript types
│   ├── api-client.ts         # API client
│   └── utils.ts              # Helper functions
└── public/                   # Static assets
\`\`\`

## API Integration

The app includes a type-safe API client (`lib/api-client.ts`) with the following endpoints:

- `POST /api/assist_v2` - Chat assistant
- `GET /api/events` - Fetch events
- `POST /api/events/generate` - Generate event from prompt
- `POST /api/reminders` - Create reminder
- `GET /api/reminders` - Fetch reminders
- `GET /api/promos/match` - Fetch promotions
- `POST /api/speech-to-text` - Convert speech to text
- `POST /api/text-to-speech` - Convert text to speech
- `GET /api/panchang/muhurat` - Fetch auspicious times
- `GET /api/lessons` - Fetch learning content

Replace the mock implementations with your actual backend API calls.

## Customization

### Theme

Edit `app/globals.css` to customize the color palette and design tokens.

### Languages

Add new language options in:
- `components/layout/app-header.tsx` (language selector)
- `components/settings/settings-view.tsx` (settings page)

### Regions

Update region options in:
- `components/settings/settings-view.tsx`
- Filter components across the app

## Accessibility

The app includes:
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode option

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
