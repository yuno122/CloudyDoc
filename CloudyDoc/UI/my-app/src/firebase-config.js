import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCZThCp7UxD43AViQXMTgvkqSL9UwJ3Yes",
    authDomain: "cloudy-b8957.firebaseapp.com",
    projectId: "cloudy-b8957",
    storageBucket: "cloudy-b8957.appspot.com",
    messagingSenderId: "926559035280",
    appId: "1:926559035280:web:4533488f070234b839dd15",
    measurementId: "G-2KD3G11Y18"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };