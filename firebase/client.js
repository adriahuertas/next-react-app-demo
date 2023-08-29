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


export const loginWithGitHub = async () => {
  const githubProvider = new GithubAuthProvider();
  
  const auth = getAuth();

  try {
    const result = await signInWithPopup(auth, githubProvider);
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log(user);
    const {displayName} = user;
    return displayName;
  }
  catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
    console.log(error.message);
  }
}