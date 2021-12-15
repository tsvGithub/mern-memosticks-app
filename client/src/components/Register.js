import React from "react";
import { Link } from "react-router-dom";
import Message from "./Message";
//global context
import { useGlobalContext } from "../context";

const Register = () => {
  const { mood, switchMood, moon, sun, logout, user, message, changeRegisterForm, submitRegisterForm } =
    useGlobalContext();

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
          {/*========================Register Form======================= */}
          <form className={`container container-${mood}`} onSubmit={submitRegisterForm}>
            <h3>Please sign in</h3>
            {/* <label htmlFor="username">Username:</label> */}
            <input
              type="text"
              name="username"
              // value={user.username}
              onChange={changeRegisterForm}
              placeholder="Enter username"
              required
              aria-label="username"
            />

            {/* <label htmlFor="password">Password:</label> */}
            <input
              type="password"
              name="password"
              // value={user.password}
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
