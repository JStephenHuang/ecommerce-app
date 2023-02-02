import { RefObject, useEffect, useRef, useState } from "react";
import { useAPIClient } from "../../hooks/api-client";
import { useFirebaseAuthUser } from "../../contexts/firebase-app-context";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types/user";
import { motion } from "framer-motion";
import LoadingStatus from "../../components/status/loading";

interface FirstLastNameProperties {
  firstnameRef: RefObject<HTMLInputElement>;
  lastnameRef: RefObject<HTMLInputElement>;
}

const FirstLastName = ({
  firstnameRef,
  lastnameRef,
}: FirstLastNameProperties) => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-5">
      <div>
        <p className="opacity-70 text-[12px] tracking-wider">First Name</p>
        <input
          className="w-full font-normal border border-black p-2.5"
          type="text"
          ref={firstnameRef}
        />
      </div>
      <div>
        <p className="opacity-70 text-[12px] tracking-wider">Last Name</p>
        <input
          className="w-full font-normal border border-black p-2.5"
          type="text"
          ref={lastnameRef}
        />
      </div>
    </div>
  );
};

const OnboardingPage = () => {
  const user = useFirebaseAuthUser();
  const client = useAPIClient();
  const navigate = useNavigate();

  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const [currentUser, setCurrentUser] = useState<IUser | null | undefined>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (user === null) navigate("/login");
    if (user !== undefined) {
      getCurrentUser();
    }
  }, [user, currentUser]);

  const getCurrentUser = async () => {
    const res = await client.get("/user/current").catch((err) => {
      if (err.response.status === 404) {
        setCurrentUser(null);
      }
    });
    if (res) {
      setCurrentUser(res.data);
      navigate("/");
    }
  };

  const createAccount = async () => {
    if (
      firstnameRef.current &&
      lastnameRef.current &&
      usernameRef.current &&
      user
    ) {
      const userBody = {
        firstname: firstnameRef.current.value,
        lastname: lastnameRef.current.value,
        username: usernameRef.current.value,
        email: user.email,
      };

      const res = await client.post("/user", userBody).catch((err) => {
        if (err.response.status === 400) {
          setError("Username Taken");
        }
      });

      if (res) {
        if (res.status === 200) setCurrentUser(res.data);
      }
    }
  };

  if (currentUser === undefined) {
    return <LoadingStatus />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ delay: 0.2 }}
      className="h-screen w-screen flex"
    >
      <div className="w-[50%] h-full flex flex-col items-center">
        <div className="w-[60%] mt-10">
          <p className="text-center font-thin">
            *You may be logged in, but we a little more details from you to
            finish your account.*
          </p>

          <p className="text-center text-[30px] my-5">Add details</p>
          <div className="text-start font-normal">
            <p className="">
              We need this info to create your account and verify it's you:
            </p>
            <FirstLastName
              firstnameRef={firstnameRef}
              lastnameRef={lastnameRef}
            />
            <div className="my-5">
              {error === "Username Taken" ? (
                <p className="opacity-70 text-[12px] tracking-wider text-red-600">
                  Username already taken
                </p>
              ) : (
                <p className="opacity-70 text-[12px] tracking-wider">
                  Username
                </p>
              )}
              <input
                id="username"
                className={
                  error === "Username Taken"
                    ? "w-full font-normal border p-2.5 border-red-600"
                    : "w-full font-normal border p-2.5 border-black"
                }
                type="text"
                ref={usernameRef}
              />
            </div>

            <button
              type="submit"
              onClick={createAccount}
              className="create-account-button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="w-[50%] h-full bg-black"></div>
    </motion.div>
  );
};

export default OnboardingPage;
