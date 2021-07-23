import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyDN7VEanzPU-pc01SiGfnPWKYWrWW_KL8c",
    authDomain: "signal-clone-6fdb1.firebaseapp.com",
    projectId: "signal-clone-6fdb1",
    storageBucket: "signal-clone-6fdb1.appspot.com",
    messagingSenderId: "742264478933",
    appId: "1:742264478933:web:abb04c4a9e9812d614565c"
  };

let app
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig)
}
else {
    app = firebase.app()
}

const db = app.firestore()

const auth = firebase.auth()

export { db, auth}