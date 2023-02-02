import React, { useEffect, useState } from "react";
import { app } from "../firebase/app";
import { Auth, getAuth, User } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { useAPIClient } from "../hooks/api-client";
import { IUser } from "../types/user";
import { useQuery } from "react-query";
import { AxiosError } from "axios";

const FirebaseAppContext = React.createContext<{
  auth: Auth;
  storage: FirebaseStorage;
  user?: User | null;
  token?: string | null;
}>({ auth: getAuth(app), storage: getStorage(app) });

const useFirebaseApp = () => React.useContext(FirebaseAppContext);

// Authentication
const useFirebaseAuth = () => useFirebaseApp().auth;
const useFirebaseAuthUser = () => useFirebaseApp().user;
const useFirebaseAuthToken = () => useFirebaseApp().token;

// Storage
const useFirebaseStorage = () => useFirebaseApp().storage;

const FirebaseAppProvider = (props: { children: React.ReactNode }) => {
  const auth = getAuth(app);
  const storage = getStorage(app);
  const [user, setUser] = useState<User | null | undefined>();
  const [token, setToken] = useState<string | null | undefined>();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user === null) return setUser(null);
      setUser(user);
    });
  }, [auth]);

  useEffect(() => {
    return auth.onIdTokenChanged((user) => {
      if (user === null) return setToken(null);
      user.getIdToken().then((token) => setToken(token));
    });
  }, [auth]);

  return (
    <FirebaseAppContext.Provider
      value={{
        storage,
        auth,
        user,
        token,
      }}
    >
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
  useFirebaseStorage,
};
