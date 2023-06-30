// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getMessaging} from 'firebase/messaging'
//import { BackgroundMessage } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIs55AlGIwWwTsNpYOU8vnlKMF8gEeZfU",
  authDomain: "prof-caaf9.firebaseapp.com",
  projectId: "prof-caaf9",
  storageBucket: "prof-caaf9.appspot.com",
  messagingSenderId: "901548715650",
  appId: "1:901548715650:web:612cdbe4f1f5cdfa738e9b",
  measurementId: "G-B27FY1BTYT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging=getMessaging(app);
// BackgroundMessage(function(payload) {
//   console.log('Received background message ', payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });