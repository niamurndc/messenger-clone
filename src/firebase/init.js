import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCCPA8HkiGdU2UfsAPt2zpgUXYbI1jdxAw",
  authDomain: "messenger-clone-vue.firebaseapp.com",
  databaseURL: "https://messenger-clone-vue.firebaseio.com",
  projectId: "messenger-clone-vue",
  storageBucket: "messenger-clone-vue.appspot.com",
  messagingSenderId: "807951831232",
  appId: "1:807951831232:web:09d22c379c079a70f9dd25"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default  firebaseApp.firestore()