importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyB8qJHygCpyMmF1aRwDlOOfTOYuyPn_oAU",
  authDomain: "etuitor-6f60f.firebaseapp.com",
  projectId: "etuitor-6f60f",
  storageBucket: "etuitor-6f60f.appspot.com",
  messagingSenderId: "501389612416",
  appId: "1:501389612416:web:f47cd5176c0c95b174dd65",
  measurementId: "G-6TCKQLCBPC"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Message deduplication system
const messageCache = new Map();
const MAX_CACHE_SIZE = 50;

// Background message handler with robust deduplication
messaging.onBackgroundMessage(async (payload) => {
  console.log('[SW] Received message', payload);

  // Skip if already handled by foreground
  if (payload.data?.handled === 'true') {
    console.log('[SW] Message handled in foreground');
    return;
  }

  // Create unique message ID
  const messageId = payload.data?.messageId || 
                   `${payload.data?.vacancy_id || 'general'}_${Date.now()}`;

  // Check for duplicates
  if (messageCache.has(messageId)) {
    console.log('[SW] Duplicate message detected');
    return;
  }

  // Add to cache
  messageCache.set(messageId, true);
  
  // Clean old entries
  if (messageCache.size > MAX_CACHE_SIZE) {
    const oldestKey = messageCache.keys().next().value;
    messageCache.delete(oldestKey);
  }

  // Prepare notification from data payload if available
  const notificationData = payload.data || {};
  const title = notificationData.title || payload.notification?.title || 'New Notification';
  const body = notificationData.body || payload.notification?.body || 'You have a new message';

  const notificationOptions = {
    body,
    icon: '/etuitor//src/assets//newcube.png',
    badge: '/icons/badge-72x72.png',
    data: {
      ...notificationData,
      url: notificationData.click_url || '/teacherscommunity'
    },
    tag: `vacancy_${notificationData.vacancy_id || 'general'}`,
    timestamp: Date.now(),
    vibrate: [200, 100, 200]
  };

  try {
    await self.registration.showNotification(title, notificationOptions);
    console.log('[SW] Notification shown:', messageId);
  } catch (err) {
    console.error('[SW] Notification failed:', err);
    messageCache.delete(messageId);
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = new URL(
    event.notification.data?.url || '/teacherscommunity',
    self.location.origin
  ).href;

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((windowClients) => {
      const matchingClient = windowClients.find(client => 
        new URL(client.url).pathname === new URL(urlToOpen).pathname
      );
      return matchingClient ? matchingClient.focus() : clients.openWindow(urlToOpen);
    })
  );
});