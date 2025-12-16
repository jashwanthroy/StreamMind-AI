/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import auth from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const email = useRef(null);
  const pswd = useRef(null);
  const name = useRef(null);
  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };
  const handlebtnClick = () => {
    // console.log(email,pswd);
    const msg = checkValidData(email.current.value, pswd.current.value);
    setErrorMsg(msg);
    if (msg) {
      return;
    }
    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        pswd.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const {uid, email, displayName, photoURL} = auth.currentUser;
              dispatch(addUser({
                uid:uid,
                email:email,
                displayName:displayName,
                photoURL:photoURL
              }))
              navigate("/browser");
            })
            .catch((error) => {
              setErrorMsg(error.message)
            });
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          setErrorMsg(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, pswd.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browser");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div className="relative h-screen w-screen">
      <Header />
      {/* <div className="absolute"> */}
      <img
        className="absolute w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/29b665f6-0a62-4745-b9c2-f617fb7eadc6/web/IN-en-20251208-TRIFECTA-perspective_c78aea89-8f13-4e2c-ba7a-f9b40f53bf8c_medium.jpg"
        alt="bg"
      />
      {/* </div> */}
      <form
        className="absolute w-96 p-12 bg-black/60 my-36 mx-auto right-0 left-0 flex flex-col space-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl py-4 text-white">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="py-3 px-3 w-full bg-white rounded-lg"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="py-3 px-3 w-full bg-white rounded-lg"
        />
        <input
          ref={pswd}
          type="password"
          placeholder="Password"
          className="py-3 px-3 w-full bg-white rounded-lg"
        />
        <p className="text-red-700 py-2">{errorMsg}</p>
        <button
          className="py-3 bg-red-700 text-white w-full rounded-lg cursor-pointer"
          onClick={handlebtnClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-white cursor-pointer" onClick={toggleSignInForm}>
          {isSignIn
            ? "New to StreamMindAI? Sign Up Now"
            : "Already a User, Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
