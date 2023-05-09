import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBdayempNqSU8fhC9IzSaFYUsLZtgcLCnI",
  authDomain: "agromarketplace2023.firebaseapp.com",
  projectId: "agromarketplace2023",
  storageBucket: "agromarketplace2023.appspot.com",
  messagingSenderId: "562763134159",
  appId: "1:562763134159:web:ef54fdcc48ed8c8abd33ba"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db =firebaseApp.firestore();
const auth = firebase.auth();

export { auth ,db};