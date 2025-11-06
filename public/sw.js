// public/sw.js

// ==================================================
// FestiRo Service Worker - Enhanced PWA Support
// ==================================================

const CACHE_NAME = 'festiro-v1.2.0'; // Update version when making changes
const RUNTIME_CACHE = 'festiro-runtime';
const IMAGE_CACHE = 'festiro-images';

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/calendar',
  '/chat',
  '/promotions',
  '/learning',
  '/settings',
  '/offline', // Offline fallback page (create this)
  '/globals.css',
  '/manifest.json',
];

// Cache API responses for these routes
const API_CACHE_ROUTES = [
  '/api/assist_v2',
];

// Image extensions to cache
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.ico'];

// ==================================================
// INSTALL EVENT - Precache static assets
// ==================================================
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Precaching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting()) // Activate immediately
  );
});

// ==================================================
// ACTIVATE EVENT - Clean up old caches
// ==================================================
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  const cacheWhitelist = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE];
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim()) // Take control immediately
  );
});

// ==================================================
// FETCH EVENT - Network strategies
// ==================================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // API requests - Network First, fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, RUNTIME_CACHE));
    return;
  }

  // Images - Cache First, fallback to network
  if (IMAGE_EXTENSIONS.some(ext => url.pathname.endsWith(ext))) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // HTML pages - Network First, fallback to cache, then offline page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => {
          return caches.match(request)
            .then((cached) => cached || caches.match('/offline'));
        })
    );
    return;
  }

  // Default - Cache First for everything else
  event.respondWith(cacheFirst(request, CACHE_NAME));
});

// ==================================================
// CACHING STRATEGIES
// ==================================================

// Cache First - Use cache, fallback to network
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('[Service Worker] Cache First failed:', error);
    throw error;
  }
}

// Network First - Try network, fallback to cache
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[Service Worker] Network failed, using cache');
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// ==================================================
// BACKGROUND SYNC (Future feature)
// ==================================================
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-reminders') {
    event.waitUntil(syncReminders());
  }
});

async function syncReminders() {
  // Sync saved reminders when back online
  console.log('[Service Worker] Syncing reminders...');
  // Implementation here
}

// ==================================================
// PUSH NOTIFICATIONS (Future feature)
// ==================================================
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'FestiRo Reminder';
  const options = {
    body: data.body || 'You have a festival reminder!',
    icon: '/icon-192.png',
    badge: '/badge-icon.png',
    tag: 'festival-reminder',
    requireInteraction: false,
    data: {
      url: data.url || '/',
    },
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

// ==================================================
// MESSAGE HANDLER (for communication with app)
// ==================================================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

console.log('[Service Worker] Loaded successfully');
