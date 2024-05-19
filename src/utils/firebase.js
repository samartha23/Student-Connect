import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: '"' + import.meta.env.REACT_APP_FIREBASE_API_KEY + '"',
  authDomain: '"' + import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN + '"',
  projectId: '"' + import.meta.env.REACT_APP_FIREBASE_PROJECT_ID + '"',
  storageBucket: "student-connect-bb855.appspot.com",
  messagingSenderId:
    '"' + import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID + '"',
  appId: '"' + import.meta.env.REACT_APP_FIREBASE_APP_ID + '"',
  measurementId: '"' + import.meta.env.REACT_APP_FIREBASE_MEASUREMENT_ID + '"',
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
