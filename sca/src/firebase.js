import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

firebase.initializeApp({
  apiKey: "AIzaSyAf6fw_e4ui7NyCNQz5o1cr3Yp_-QwV8mc",
  authDomain: "ssd-chat-app-5f07b.firebaseapp.com",
  projectId: "ssd-chat-app-5f07b",
  storageBucket: "ssd-chat-app-5f07b.appspot.com",
  messagingSenderId: "492839436600",
  appId: "1:492839436600:web:f30a8e24eabdaa941601cd",
  measurementId: "G-TK6LDL3FT4"
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

export {firebase,auth,firestore,analytics};