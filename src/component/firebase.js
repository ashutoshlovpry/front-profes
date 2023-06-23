import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const FirestoreSaveComponent = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyBIs55AlGIwWwTsNpYOU8vnlKMF8gEeZfU",
        authDomain: "prof-caaf9.firebaseapp.com",
        projectId: "prof-caaf9",
        storageBucket: "prof-caaf9.appspot.com",
        messagingSenderId: "901548715650",
        appId: "1:901548715650:web:612cdbe4f1f5cdfa738e9b",
        measurementId: "G-B27FY1BTYT"
      };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

  const saveDocument = () => {
    // Get a reference to the Firestore database
    
      
      // Initialize Firebase
      
       
    // Specify the collection and document ID
   // const collectionRef = collection('users',db);
    //const documentId = localStorage.getItem('email');
    //const collectionName = collectionRef.path;
    //console.log("Collection name:", collectionName);
    // Create a document reference with the custom ID

   // const docRef = doc(documentId);

    // Document data to be saved
    const data = {
      // Your document data here
    };

    // Save the document
    // docRef
    //   .set(data)
    //   .then(() => {
    //     console.log('Document saved with ID:', documentId);
    //   })
    //   .catch((error) => {
    //     console.error('Error saving document:', error);
    //   });
  };

  const sendNotification=async()=>{
    const auth = await getAuth();
    console.log("aaaa",auth);
    const email = 'user@example.com';
const password = 'password123';

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('User registered:', user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Registration error:', errorCode, errorMessage);
  });
    onAuthStateChanged(auth, (user) => {
        console.log({user});
        if (user) {
          // User is signed in, retrieve the ID token
          user.getIdToken(/* forceRefresh */ true)
            .then((idToken) => {
              // Access the ID token
              console.log("ID token:", idToken);
            })
            .catch((error) => {
              // Handle any errors
              console.error("Error retrieving ID token:", error);
            });
        } else {
          // User is not signed in
          console.log("User not signed in.");
        }
    })

 let ans=await axios('https://fcm.googleapis.com//v1/projects/prof-caaf9/messages:send',{
    method: "POST",
    headers: {
   "Content-Type": "application/json",
   "Authorization":'bearer ccdMSqeivrmpRJytggJVe3:APA91bGIHCcVootslngfK4KgHlGpfZeLWxJCU7NspmOAFrlxcbfOYjCuIpSaRS73IYNmFVvCc782mDZUedTR8QxKARaqAprdQWOwLqantQ4vvuQjgIOts8Kdcmi204t7TmOXzrNRgc4v'
   },
    data:{
        "message": {
          "topic": "matchday",
          "notification": {
            "title": "Background Message Title",
            "body": "Background message body"
          },
          "webpush": {
            "fcm_options": {
              "link": "https://dummypage.com"
            }
          }
        }
      },
  })

  console.log("rr",ans);
  }

  return (
    <div>
      <button onClick={saveDocument}>Save Document</button>
      <button onClick={sendNotification}>Send Notification</button>

    </div>
  );
};

export default FirestoreSaveComponent;
