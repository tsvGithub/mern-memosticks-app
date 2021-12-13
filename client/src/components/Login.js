import React from "react";
//global State
import { useGlobalContext } from "../context";
//Message displays messages from the Server
import Message from "./Message";

//IX (VIII Home.js; X -> Register.js)
const Login = () => {
  //global context
  const {
    mood,
    switchMood,
    moon,
    sun,
    changeForm,
    submitLoginForm,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    logoutHandler,
    message,
    setMessage,
  } = useGlobalContext();

  //3
  return (
    <main className={`wrapper wrapper-${mood}`}>
      <section className={`outer outer-${mood}`}>
        {/* <section className={`basil outer outer-${mood}`}> */}
        {/*========================THEME=========================== */}
        <button className={`login-switcher switcher switcher-${mood}`} onClick={switchMood}>
          <img className="sw" src={mood === "dark" ? sun : moon} alt="mood" title="Switch mood" />
        </button>

        <div className={`container container-${mood}`}>
          {/* <div className={`home container container-${mood}`}> */}
          {/*========================TWO Options======================= */}
          {/* {!isAuthenticated ? unAuthenticated() : authenticated()} */}
          <form className={`container container-${mood}`} onSubmit={submitLoginForm}>
            <h3>Please sign in</h3>
            {/* <label htmlFor="username">Username:</label> */}
            <input
              type="text"
              name="username"
              onChange={changeForm}
              placeholder="Enter username"
              required
              aria-label="username"
            />

            {/* <label htmlFor="password">Password:</label> */}
            <input type="password" name="password" onChange={changeForm} placeholder="Enter password" required />

            <button className="submit" type="submit">
              Log in
            </button>
          </form>
        </div>
      </section>
      {/*if message !==null display message from server OR do nothing   */}
      {message ? <Message message={message} /> : null}
    </main>
  );
};
export default Login;
