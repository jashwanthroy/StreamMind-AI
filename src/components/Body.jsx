import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import Browse from "./Browse";
import { Routes, Route } from "react-router-dom";
import auth from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
const Body = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        dispatch(removeUser());
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/browser" element={<Browse />} />
    </Routes>
  );
};

export default Body;
