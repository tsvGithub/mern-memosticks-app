import React from "react";
import { Link } from "react-router-dom";
//global State
import { useGlobalContext } from "../context";
//Message displays messages from the Server
import Message from "./Message";

//IX (VIII Home.js; X -> Register.js)
const Login = () => {
  //global context
  const { mood, switchMood, moon, sun, logout, user, changeForm, submitLoginForm, message } = useGlobalContext();
  // console.log(user);
  // const { username, password } = user;
  //3
  return (
    <main className={`wrapper wrapper-${mood}`}>
      <section className={`outer outer-${mood}`}>
        {/*!!!========================LOGOUT=========================== */}
        <button className={`logout switcher switcher-${mood}`}>
          <Link to="/">
            <img className="sw" src={logout} alt="logout" title="Logout" />
          </Link>
        </button>

        {/*========================THEME=========================== */}
        <button className={`switcher switcher-${mood}`} onClick={switchMood}>
          <img className="sw" src={mood === "dark" ? sun : moon} alt="mood" title="Switch mood" />
        </button>

        <div className={`container container-${mood}`}>
          <form className={`container container-${mood}`} onSubmit={submitLoginForm}>
            <h3>Please sign in</h3>
            {/* <label htmlFor="username">Username:</label> */}
            <input
              type="text"
              name="username"
              // value={user.username}
              onChange={changeForm}
              placeholder="Enter username"
              required
              aria-label="username"
            />

            {/* <label htmlFor="password">Password:</label> */}
            <input
              type="password"
              // value={user.password}
              name="password"
              onChange={changeForm}
              placeholder="Enter password"
              required
            />

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
