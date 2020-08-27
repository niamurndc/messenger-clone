import firebase from 'firebase'

var firebaseConfig = {
  here your won configuretion imported from firebase
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default  firebaseApp.firestore()
