import {
  useFirebaseAuth,
  useFirebaseAuthUser,
} from "../contexts/firebase-app-context";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import LoadingStatus from "../components/status/loading";

interface MarqueeProperties {
  imageSrcs: string[];
}

const LoginPage = () => {
  const auth = useFirebaseAuth();
  const user = useFirebaseAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null && user !== undefined) navigate("/onboarding");
  }, [user]);

  if (user === undefined) {
    return <LoadingStatus />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ delay: 0.2 }}
    >
      <section className="w-screen h-screen flex items-center justify-center">
        <div className="w-full h-full bg-white flex overflow-hidden">
          <div className="w-1/2">
            <div className="w-full h-full inline-block px-10 pt-[5rem] tracking-tighter">
              <p className="text-[5rem] font-extrabold">
                Start by signing in to explore our features.
              </p>
              <p className="font-thin text-[24px] mb-5 w-[80%]">
                You can only sign in with Google at the moment, we will be
                integrating branded logins in the future.
              </p>
              <button
                className="w- bg-black text-white px-[14px] py-[10px] rounded-sm hover:opacity-70"
                onClick={() => {
                  signInWithPopup(auth, new GoogleAuthProvider());
                }}
              >
                Sign in with Google
              </button>
            </div>
          </div>
          <div className="w-1/2 bg-black"></div>
        </div>
      </section>
    </motion.div>
  );
};

export default LoginPage;
