// app/layout.tsx

import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AppShell } from "@/components/layout/app-shell"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


// ============================================
// FONT CONFIGURATION
// ============================================
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
})

// ============================================
// METADATA EXPORT
// ============================================
export const metadata: Metadata = {
  // ===== MetadataBase for OG Images =====
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://festiro.vercel.app"
  ),

  // ===== Basic Metadata =====
  title: {
    default: "FestiRo - Your Indian Festival Calendar & AI Assistant",
    template: "%s | FestiRo",
  },
  description:
    "Never miss an Indian festival! FestiRo is your intelligent guide to Diwali, Holi, regional celebrations, muhurat timings, and cultural traditions. Get personalized reminders and AI-powered insights.",

  // ===== Keywords for SEO =====
  keywords: [
    "Indian festivals",
    "festival calendar",
    "Diwali dates",
    "Holi celebration",
    "muhurat timing",
    "auspicious dates",
    "Indian cultural calendar",
    "festival reminders",
    "Hindu festivals 2025",
    "regional festivals India",
    "festival AI assistant",
    "cultural celebrations",
  ],

  // ===== Author & Creator =====
  authors: [{ name: "FestiRo Team" }],
  creator: "FestiRo",
  publisher: "FestiRo",

  // ===== Application Info =====
  applicationName: "FestiRo",
  generator: "Next.js 15",

  // ===== Referrer Policy =====
  referrer: "origin-when-cross-origin",

  // ===== Open Graph (Social Media Sharing) =====
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://festiro.vercel.app",
    siteName: "FestiRo",
    title: "FestiRo - Never Miss an Indian Festival",
    description:
      "Your intelligent companion for Indian festivals, muhurat timings, and cultural celebrations. Get AI-powered insights and personalized reminders.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FestiRo - Indian Festival Calendar",
      },
      {
        url: "/og-image-square.png",
        width: 800,
        height: 800,
        alt: "FestiRo Logo",
      },
    ],
  },

  // ===== Twitter Card =====
  twitter: {
    card: "summary_large_image",
    title: "FestiRo - Your Indian Festival Calendar",
    description:
      "Never miss Diwali, Holi, or any festival! Get AI-powered insights, muhurat timings, and personalized reminders.",
    creator: "@festiroapp",
    images: ["/twitter-image.png"],
  },

  // ===== Icons & Favicons =====
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  // ===== Web App Manifest =====
  manifest: "/manifest.json",

  // ===== Apple Web App =====
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FestiRo",
  },

  // ===== Format Detection =====
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },

  // ===== Verification (Add your codes) =====
  verification: {
    google: "your-google-verification-code", // Google Search Console
    // yandex: "your-yandex-code",
    // bing: "your-bing-code",
  },

  // ===== Robots =====
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ===== Alternate Languages =====
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || "https://festiro.vercel.app",
    languages: {
      "en-IN": `${process.env.NEXT_PUBLIC_APP_URL || "https://festiro.vercel.app"}/en`,
      "hi-IN": `${process.env.NEXT_PUBLIC_APP_URL || "https://festiro.vercel.app"}/hi`,
      "te-IN": `${process.env.NEXT_PUBLIC_APP_URL || "https://festiro.vercel.app"}/te`,
      "ta-IN": `${process.env.NEXT_PUBLIC_APP_URL || "https://festiro.vercel.app"}/ta`,
    },
  },

  // ===== Category =====
  category: "lifestyle",
}

// ============================================
// VIEWPORT EXPORT (Separate from Metadata!)
// ============================================
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FF7A3D" },
    { media: "(prefers-color-scheme: dark)", color: "#FFA35C" },
  ],
}

// ============================================
// ROOT LAYOUT COMPONENT
// ============================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Preconnect to External Domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://vercel.com" />
        <link rel="dns-prefetch" href="https://console.groq.com" />
        <link rel="dns-prefetch" href="https://api.gemini.google.com" />

        {/* Structured Data - JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "FestiRo",
              description:
                "Your intelligent guide to Indian festivals, muhurat timings, and cultural celebrations.",
              url: process.env.NEXT_PUBLIC_APP_URL || "https://festiro.vercel.app",
              applicationCategory: "LifestyleApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1250",
              },
              author: {
                "@type": "Organization",
                name: "FestiRo",
              },
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FestiRo",
              url: process.env.NEXT_PUBLIC_APP_URL || "https://festiro.vercel.app",
              logo: `${process.env.NEXT_PUBLIC_APP_URL || "https://festiro.vercel.app"}/icon-512.png`,
              description: "Indian Festival Calendar & AI Assistant",
              sameAs: [
                "https://twitter.com/festiroapp",
                "https://www.facebook.com/festiroapp",
              ],
            }),
          }}
        />
      </head>

      <body className="antialiased">
        {/* Theme Provider for Dark/Light Mode */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Main App Shell */}
          <AppShell>{children}</AppShell>

          {/* Toast Notifications */}
          <Toaster />

          {/* Analytics (Vercel) */}
          <Analytics />

          {/* Speed Insights (Vercel) */}
          <SpeedInsights />
        </ThemeProvider>

        {/* Service Worker Registration for PWA */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker
                    .register('/sw.js')
                    .then(function(registration) {
                      console.log(
                        '✅ Service Worker registered:',
                        registration.scope
                      );

                      // Check for updates
                      registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                          if (
                            newWorker.state === 'installed' &&
                            navigator.serviceWorker.controller
                          ) {
                            // New service worker available
                            const proceed = confirm(
                              'New version available! Reload to update?'
                            );
                            if (proceed) {
                              newWorker.postMessage({ type: 'SKIP_WAITING' });
                              window.location.reload();
                            }
                          }
                        });
                      });
                    })
                    .catch(function(err) {
                      console.log('❌ Service Worker registration failed:', err);
                    });

                  // Reload page when new service worker takes control
                  let refreshing = false;
                  navigator.serviceWorker.addEventListener(
                    'controllerchange',
                    () => {
                      if (!refreshing) {
                        refreshing = true;
                        window.location.reload();
                      }
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
