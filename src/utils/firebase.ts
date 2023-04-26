import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbPIH_e5UAfYHCr3L7tIdmgRqU5tWfFhc",
  authDomain: "graphiql-auth.firebaseapp.com",
  projectId: "graphiql-auth",
  storageBucket: "graphiql-auth.appspot.com",
  messagingSenderId: "321298717669",
  appId: "1:321298717669:web:fdc941433daec2fc926d0c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const fbLogin = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch {
    return false;
  }
};

export const fbRegister = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return true;
  } catch {
    return false
  }
};

export const logout = () => {
  signOut(auth);
};
