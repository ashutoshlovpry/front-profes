importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyBIs55AlGIwWwTsNpYOU8vnlKMF8gEeZfU",
    authDomain: "prof-caaf9.firebaseapp.com",
    projectId: "prof-caaf9",
    storageBucket: "prof-caaf9.appspot.com",
    messagingSenderId: "901548715650",
    appId: "1:901548715650:web:612cdbe4f1f5cdfa738e9b",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});