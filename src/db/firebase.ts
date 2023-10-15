// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlIuvapKNodq2_3s00HHzqnzwKUR0XmOA", // cspell: disable-line
    authDomain: "fir-realtime-demo-a444c.firebaseapp.com",
    projectId: "fir-realtime-demo-a444c",
    storageBucket: "fir-realtime-demo-a444c.appspot.com",
    messagingSenderId: "512771715534",
    appId: "1:512771715534:web:516d7bfcf2bdf96af5bb9f",
    databaseURL: "https://fir-realtime-demo-a444c-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);