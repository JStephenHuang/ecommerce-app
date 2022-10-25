import React from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";
import { app } from "../firebase/app";

class Firebase {
  private auth: Auth;

  constructor() {
    this.auth = getAuth(app);
  }

  signInWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(this.auth, email, password);
  };

  signInWithGoogle = () => {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  };

  signInWithFacebook = () => {
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  };

  signOut = () => {
    return signOut(this.auth);
  };
}

const defaultValue = new Firebase();
const FirebaseContext = React.createContext<Firebase>(defaultValue);
const useFirebase = () => React.useContext(FirebaseContext);

const FirebaseProvider = (props: { children: React.ReactNode }) => {
  return (
    <FirebaseContext.Provider value={defaultValue}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider, useFirebase };
