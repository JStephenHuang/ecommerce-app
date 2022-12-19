import React, { useEffect, useState } from 'react';
import { app } from '../firebase/app';
import { FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth';

const FirebaseAppContext = React.createContext<FirebaseApp>(app);
const useFirebaseApp = () => React.useContext(FirebaseAppContext);

// Authentication
const useFirebaseAuth = () => getAuth(useFirebaseApp());
const useFirebaseAuthUser = () => {
  const auth = useFirebaseAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged(setUser);
  }, [auth]);

  return user;
};
const useFirebaseAuthToken = () => {
  const auth = useFirebaseAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    return auth.onIdTokenChanged((user) => {
      if (user === null) return;
      user.getIdToken().then(setToken);
    });
  }, [auth]);

  return token;
};
const useFirebaseAuthSignInWithGoogle = () => {
  const auth = useFirebaseAuth();
  signInWithPopup(auth, new GoogleAuthProvider());
};

const FirebaseAppProvider = (props: { children: React.ReactNode }) => {
  return (
    <FirebaseAppContext.Provider value={app}>
      {props.children}
    </FirebaseAppContext.Provider>
  );
};

export {
  FirebaseAppProvider,
  useFirebaseApp,
  useFirebaseAuth,
  useFirebaseAuthUser,
  useFirebaseAuthToken,
  useFirebaseAuthSignInWithGoogle,
};
