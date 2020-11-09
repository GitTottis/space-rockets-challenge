import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAEfPweZOns0XbhP5kQdwWGf_B-xBDFMiI",
    authDomain: "space-rockets-42257.firebaseapp.com",
    databaseURL: "https://space-rockets-42257.firebaseio.com",
    projectId: "space-rockets-42257",
    storageBucket: "space-rockets-42257.appspot.com",
    messagingSenderId: "189536192711",
    appId: "1:189536192711:web:cecb0c48e325ca868a56e2"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp;

