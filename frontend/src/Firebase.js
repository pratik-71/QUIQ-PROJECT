
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCPJIuW_BAnKU1p9AfglchO5C5MNKTr5cM",
  authDomain: "qviq-project-databse.firebaseapp.com",
  projectId: "qviq-project-databse",
  storageBucket: "qviq-project-databse.appspot.com",
  messagingSenderId: "748410340838",
  appId: "1:748410340838:web:08bce2d39a7711bdeb8227",
  measurementId: "G-82NFD7DJVB"
};


const firebase_app = initializeApp(firebaseConfig);
export const auth = getAuth()
export default firebase_app