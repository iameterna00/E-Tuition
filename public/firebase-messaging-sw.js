// Import the Firebase SDK scripts for service workers
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js");

// Firebase config for initialization
const firebaseConfig = {
  apiKey: "AIzaSyB8qJHygCpyMmF1aRwDlOOfTOYuyPn_oAU",
  authDomain: "etuitor-6f60f.firebaseapp.com",
  projectId: "etuitor-6f60f",
  storageBucket: "etuitor-6f60f.appspot.com",
  messagingSenderId: "501389612416",  // Can remain here if required for messaging initialization
  appId: "1:501389612416:web:f47cd5176c0c95b174dd65",
  measurementId: "G-6TCKQLCBPC"
};

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);

// Get Firebase messaging instance
const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Received background message', payload);

  const notificationTitle = payload.data.title || 'New Notification';
  const notificationOptions = {
    body: payload.data.body || 'You have a new message',
    icon: 'https://www.kubenp.com/assets/newcube-CA76bIr8.png',  // Ensure this path is correct
    data: payload.data || {}  // Additional data passed with the notification
  };

  // Show notification
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/teacherscommunity';
  
  // Match all open windows
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Focus on the existing window/tab if it matches the notification URL
      for (const client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Open a new window if no existing window is found
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
