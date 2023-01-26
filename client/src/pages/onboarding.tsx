import { RefObject, useEffect, useRef, useState } from "react";
import { useAPIClient } from "../hooks/api-client";
import {
  useFirebaseAuth,
  useFirebaseAuthUser,
} from "../contexts/firebase-app-context";
import { useNavigate } from "react-router-dom";

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

const Checkbox = () => {
  return (
    <div className="flex items-start w-full my-5">
      <input
        id="stephendick"
        className="w-5 aspect-square mt-1 appearance-none border border-black checked:bg-blue-500"
        type="checkbox"
      />
      <label htmlFor="stephendick" className="text-[12px] ml-2">
        By check this box you agree to suck stephen's dick for the next 14 days,
        dont be late :)
      </label>
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

  useEffect(() => {
    if (user === null) navigate("/login");
  }, [user]);

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

      await client.post("/user", userBody).catch((err) => {
        return console.log(err);
      });

      navigate("/");
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="w-[50%] h-full bg-black"></div>
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
              <p className="opacity-70 text-[12px] tracking-wider">Username</p>
              <input
                id="username"
                className="w-full font-normal border p-2.5 border-black"
                type="text"
                ref={usernameRef}
              />
            </div>

            <button
              type="submit"
              onClick={createAccount}
              className="font-extrabold bg-black p-3 text-white w-full text-center hover:opacity-50 transition-all rounded-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
