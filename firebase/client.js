import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"

import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDCIFB9WvFZmRShY0dsmS_qgO9FQPrW0QA",
  authDomain: "devter-6a5e6.firebaseapp.com",
  projectId: "devter-6a5e6",
  storageBucket: "devter-6a5e6.appspot.com",
  messagingSenderId: "1045717681044",
  appId: "1:1045717681044:web:01f0e69e2197755a31c581",
  measurementId: "G-26CLDJJELC",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoUrl, screenName } = user.reloadUserInfo
  const { uid } = user

  return {
    avatar: photoUrl,
    username: screenName,
    email,
    name: displayName,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  const auth = getAuth()
  return auth.onAuthStateChanged((user) => {
    const extractedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(extractedUser)
  })
}

export const loginWithGitHub = async () => {
  const githubProvider = new GithubAuthProvider()

  const auth = getAuth()

  try {
    const result = await signInWithPopup(auth, githubProvider)
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    // const credential = GithubAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    // No callback needed because we are using onAuthStateChanged
    return mapUserFromFirebaseAuthToUser(user)
  } catch (error) {
    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    // const credential = GithubAuthProvider.credentialFromError(error);
    // ...
    return error.message
  }
}

export const addDevit = async ({ avatar, message, img, userId, username }) => {
  try {
    const docRef = await addDoc(collection(db, "devits"), {
      avatar,
      message,
      userId,
      img,
      username,
      createdAt: Date.now(),
      likesCount: 0,
      sharedCount: 0,
    })
    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

const mapDevitFromFirebaseToDevitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return {
    ...data,
    id,
    createdAt,
  }
}

export const listenLatestDevits = (callback) => {
  const unsub = onSnapshot(
    query(collection(db, "devits"), orderBy("createdAt", "desc"), limit(20)),
    (querySnapshot) => {
      const newDevits = querySnapshot.docs.map(
        mapDevitFromFirebaseToDevitObject
      )
      callback(newDevits)
    }
  )

  return unsub
}

export const fetchLatestsDevits = async () => {
  const devitsRef = collection(db, "devits")

  const q = query(devitsRef, orderBy("createdAt", "desc"), limit(20))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map(mapDevitFromFirebaseToDevitObject)
}

export const uploadImage = (file) => {
  const storage = getStorage()
  const storageRef = ref(storage, `images/${file.name}`)
  const uploadTask = uploadBytesResumable(storageRef, file)

  return uploadTask
}
