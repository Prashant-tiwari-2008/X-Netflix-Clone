import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log("api key",process.env.FIREBASE_API)
const firebaseConfig = {
    apiKey: "IzaSyCeMtAUDJuPRkmWVDfrTaFOxf_nssIMUxY",
    authDomain: "x-nextjs-clone.firebaseapp.com",
    projectId: "x-nextjs-clone",
    storageBucket: "x-nextjs-clone.appspot.com",
    messagingSenderId: "203282079698",
    appId: "1:203282079698:web:c80ef89f6e12189a21720b",
    measurementId: "G-MFGDETEQRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage }

// todo : need to updated storage and database mode setting