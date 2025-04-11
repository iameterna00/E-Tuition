import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage, deleteToken } from "firebase/messaging";
import axios from "axios";
import { webApi } from "./api";

const firebaseConfig = {
  apiKey: "AIzaSyB8qJHygCpyMmF1aRwDlOOfTOYuyPn_oAU",
  authDomain: "etuitor-6f60f.firebaseapp.com",
  projectId: "etuitor-6f60f",
  storageBucket: "etuitor-6f60f.appspot.com", // Fixed the storageBucket URL
  messagingSenderId: "501389612416",
  appId: "1:501389612416:web:f47cd5176c0c95b174dd65",
  measurementId: "G-6TCKQLCBPC"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export const auth = getAuth(app);

// Add foreground message handler
onMessage(messaging, (payload) => {
  console.log("Foreground message received:", payload);
});

export const generateToken = async () => {
  // Check if user is authenticated first
  const user = auth.currentUser;
  if (!user) {
    console.log("No authenticated user - skipping token generation");
    return null;
  }
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: '/',
        updateViaCache: 'none' 
      });

      console.log('ServiceWorker registration successful');

      if (registration.active) {
        console.log('Service worker is active');
      } else if (registration.installing) {
        await new Promise(resolve => {
          registration.installing.addEventListener('statechange', (event) => {
            if (event.target.state === 'activated') {
              resolve();
            }
          });
        });
      }

      const token = await getToken(messaging, {
        vapidKey: 'BHbFsY_YmRVJowgGizRjvzTmbq69M3tiiixsmOysmOCUsE1h8ozbLMTNhH3mwA93YtCAmd0OzWzuW13hCtNa_fc',
        serviceWorkerRegistration: registration
      });

      if (token) {
        console.log('FCM Token:', token);
        await saveTokenToBackend(token);
        return token; 
      }
    }
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};
export const delete_fmcToken = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.log("No authenticated user - skipping token deletion");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    const success = await deleteToken(messaging, {
      serviceWorkerRegistration: registration,
      vapidKey: 'BHbFsY_YmRVJowgGizRjvzTmbq69M3tiiixsmOysmOCUsE1h8ozbLMTNhH3mwA93YtCAmd0OzWzuW13hCtNa_fc'
    });

    if (success) {
      console.log("FCM token deleted from Firebase");

      // Optionally also delete it from backend
      await removeTokenFromBackend(user.uid);
    } else {
      console.warn("Token was already deleted or not found");
    }
  } catch (error) {
    console.error("Error deleting FCM token:", error);
    throw error;
  }
};


const removeTokenFromBackend = async (userUid) => {
  try {
    const response = await axios.post(`${webApi}/api/delete_fcm_token`, {
      user_uid: userUid,
    });
    return response.data;
  } catch (error) {
    console.error("Error removing FCM token from backend:", error);
    throw error;
  }
};

const saveTokenToBackend = async (fcmToken) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const response = await axios.post(`${webApi}/api/save_fcm_token`, {
      fcm_token: fcmToken,
      user_uid: user.uid,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving FCM token:", error);
    throw error;
  }
};