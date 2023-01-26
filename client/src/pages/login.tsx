import {
  useFirebaseAuth,
  useFirebaseAuthUser,
} from "../contexts/firebase-app-context";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAPIClient } from "../hooks/api-client";
import LoadingSpinner from "../components/listing-form-page/loading-spinner";

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
    return (
      <div className="w-screen h-screen grid place-items-center">
        <LoadingSpinner classname="w-16 h-16" />
      </div>
    );
  }

  return (
    <div>
      <section className="w-screen h-screen flex items-center justify-center">
        {/* Login Container */}
        <div className="w-full h-full bg-white flex overflow-hidden">
          {/* Left Side */}
          <div className="w-1/2 bg-black"></div>

          {/* Right Side */}
          <div className="w-1/2">
            {/* Email & Password Input */}
            <div className="w-full h-full grid place-items-center">
              <button
                className="bg-black text-white px-[14px] py-[10px] rounded-sm hover:opacity-70"
                onClick={() => {
                  signInWithPopup(auth, new GoogleAuthProvider());
                }}
              >
                Sign in with <span className="text-red-500">Google</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
