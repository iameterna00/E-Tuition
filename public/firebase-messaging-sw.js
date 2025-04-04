messagingSenderId: "501389612416",importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js");
import kube from "../src/assets/newcube.png"

firebase.initializeApp({
  apiKey: "AIzaSyB8qJHygCpyMmF1aRwDlOOfTOYuyPn_oAU",
  authDomain: "etuitor-6f60f.firebaseapp.com",
  projectId: "etuitor-6f60f",
  storageBucket: "etuitor-6f60f.appspot.com",
  messagingSenderId: "501389612416",
  appId: "1:501389612416:web:f47cd5176c0c95b174dd65",
  measurementId: "G-6TCKQLCBPC"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: kube,
  });
});
