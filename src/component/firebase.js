import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, doc, setDoc, addDoc } from 'firebase/firestore';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import {getMessaging} from 'firebase/messaging'

let token=''
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
    const email = localStorage.getItem('email');
const password = 'AP!@#$%tosh';

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     const user = userCredential.user;
//     console.log('User registered:', user);
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.error('Registration error:', errorCode, errorMessage);
//   });
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('User signed in:', user);
  })
  .catch((error) => {
  //   createUserWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   const user = userCredential.user;
  //   console.log('User registered:', user);
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   console.error('Registration error:', errorCode, errorMessage);
  // });
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Sign-in error:', errorCode, errorMessage);
  });
    onAuthStateChanged(auth, (user) => {
        console.log({user});
        if (user) {
          // User is signed in, retrieve the ID token
          user.getIdToken(/* forceRefresh */ true)
            .then((idToken) => {
              // Access the ID token
              console.log("ID token:", idToken);
              token=idToken
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
    // addDoc(collection(db, 'user'), data)
    // .then((docRef) => {
    //   console.log('Document added with ID:', docRef.id);
    // })
    // .catch((error) => {
    //   console.error('Error adding document:', error);
    // });
    // getMessaging().subscribeToTopic([localStorage.getItem('firebase')], 'matchday')
    // .then((response) => {
    //   // See the MessagingTopicManagementResponse reference documentation
    //   // for the contents of response.
    //   console.log('Successfully subscribed to topic:', response);
    // })
    // .catch((error) => {
    //   console.log('Error subscribing to topic:', error);
    // });
 let ans=await axios('https://fcm.googleapis.com//v1/projects/prof-caaf9/messages:send',{
    method: "POST",
    headers: {
   "Content-Type": "application/json",
   "Authorization":`bearer AAAA0eh9roI:APA91bFWY7ygOX49dMgO0sRKhCxP-3LSNIgswsmTxkKoAnngTwHMELACjyYpYgMHU0xOBjg6Z7ov_n2Tnq5wVPCV3hUYmKupbsemOFlgwOAYvZOpp06qAvVsTLKJ0VIBiNczylAkx9ZT `
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
