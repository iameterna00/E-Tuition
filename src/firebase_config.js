import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import axios from "axios";
import { webApi } from "./api";

const firebaseConfig = {
  apiKey: "AIzaSyB8qJHygCpyMmF1aRwDlOOfTOYuyPn_oAU",
  authDomain: "etuitor-6f60f.firebaseapp.com",
  projectId: "etuitor-6f60f",
  storageBucket: "etuitor-6f60f.firebasestorage.app",
  messagingSenderId: "501389612416",
  appId: "1:501389612416:web:f47cd5176c0c95b174dd65",
  measurementId: "G-6TCKQLCBPC"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export const auth = getAuth(app);

export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BHbFsY_YmRVJowgGizRjvzTmbq69M3tiiixsmOysmOCUsE1h8ozbLMTNhH3mwA93YtCAmd0OzWzuW13hCtNa_fc',
      });

      if (token) {
        console.log('FCM Token:', token);
        await saveTokenToBackend(token);
      } else {
        console.error('No FCM token found.');
      }
    } else {
      console.error('Notification permission not granted.');
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};

const saveTokenToBackend = async (fcmToken) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    const userUid = user.uid;

    const response = await axios.post(`${webApi}/api/save_fcm_token`, {
      fcm_token: fcmToken,
      user_uid: userUid,
    });

    console.log(response.data);
  } catch (error) {
    console.error("Error saving FCM token:", error);
  }
};
