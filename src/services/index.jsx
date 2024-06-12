import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOrazv26KBZLzmx8nwi4mZjx00_3K_FEo",
  authDomain: "employee-bank.firebaseapp.com",
  projectId: "employee-bank",
  storageBucket: "employee-bank.appspot.com",
  messagingSenderId: "774173068598",
  appId: "1:774173068598:web:1348664d17854e998d7797",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
