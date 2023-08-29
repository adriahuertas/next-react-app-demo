import { initializeApp } from 'firebase/app';
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDCIFB9WvFZmRShY0dsmS_qgO9FQPrW0QA",
    authDomain: "devter-6a5e6.firebaseapp.com",
    projectId: "devter-6a5e6",
    storageBucket: "devter-6a5e6.appspot.com",
    messagingSenderId: "1045717681044",
    appId: "1:1045717681044:web:01f0e69e2197755a31c581",
    measurementId: "G-26CLDJJELC"
};

const app = initializeApp(firebaseConfig);


export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider();
  
  const auth = getAuth();

  return signInWithPopup(auth, githubProvider);
}