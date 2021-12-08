import React, { useRef, useEffect } from "react";
import Message from "./Message";
//global context
import { useGlobalContext } from "../context";
//fetch
import AuthService from "../Services/AuthService";

const Register = () => {
  const { user, setUser, message, setMessage, changeForm } = useGlobalContext();
  let timerID = useRef(null);

  //cleans up the setTimeout
  useEffect(() => {
    //===component did unmout
    return () => {
      clearTimeout(timerID);
    };
  }, []);
  //

  return <div></div>;
};

export default Register;
