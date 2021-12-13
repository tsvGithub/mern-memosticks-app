import React from "react";
import Message from "./Message";
//global context
import { useGlobalContext } from "../context";
//fetch
import AuthService from "../Services/AuthService";

const Register = () => {
  const {
    mood,
    switchMood,
    moon,
    sun,
    user,
    setUser,
    message,
    setMessage,
    changeRegisterForm,
    resetForm,
    submitRegisterForm,
  } = useGlobalContext();
  //

  return (
    <main className={`wrapper wrapper-${mood}`}>
      <section className={`outer outer-${mood}`}>
        {/*========================THEME=========================== */}
        <button className={`login-switcher switcher switcher-${mood}`} onClick={switchMood}>
          <img className="sw" src={mood === "dark" ? sun : moon} alt="mood" title="Switch mood" />
        </button>

        <div className={`container container-${mood}`}>
          {/*========================Register Form======================= */}
          <form className={`container container-${mood}`} onSubmit={submitRegisterForm}>
            <h3>Please sign in</h3>
            {/* <label htmlFor="username">Username:</label> */}
            <input
              type="text"
              name="username"
              onChange={changeRegisterForm}
              placeholder="Enter username"
              required
              aria-label="username"
            />

            {/* <label htmlFor="password">Password:</label> */}
            <input
              type="password"
              name="password"
              onChange={changeRegisterForm}
              placeholder="Enter password"
              required
            />

            <button className="submit" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </section>
      {/*if message !==null display message from server OR do nothing   */}
      {message ? <Message message={message} /> : null}
    </main>
  );
};

export default Register;
