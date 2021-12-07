import React, { useState, useEffect } from "react";
//fetch
import AuthService from "../Services/AuthService";
//global State
import { useGlobalContext } from "../context";
//Message displays messages from the Server
import Message from "../components/Message";

//IX (VIII Home.js; X -> Register.js)
//'props' for 'history' => navigate user to 'todo' page
// props.history.push("/todos");
const Login = (props) => {
  //1 set state:
  // const [user, setUser] = useState({ username: "", password: "" });
  // const [message, setMessage] = useState("");
  //2 global context
  const {
    mood,
    switchMood,
    moon,
    sun,
    changeForm,
    submitForm,
    logout,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    logoutHandler,
    message,
    setMessage,
  } = useGlobalContext();
  console.log(user);
  //3
  return (
    <main className={`wrapper wrapper-${mood}`}>
      <section className={`basil outer outer-${mood}`}>
        {/*========================THEME=========================== */}
        <button className={`switcher switcher-${mood}`} onClick={switchMood}>
          <img className="sw" src={mood === "dark" ? sun : moon} alt="mood" />
        </button>

        <div className={`home container container-${mood}`}>
          {/*========================TWO Options======================= */}
          {/* {!isAuthenticated ? unAuthenticated() : authenticated()} */}
          <form onSubmit={submitForm}>
            <h3>Please sign in</h3>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              //?
              // value={user.username}
              onChange={changeForm}
              placeholder="Enter username"
              required
              aria-label="username"
            />

            <label htmlFor="password">Password:</label>
            <input type="password" name="password" onChange={changeForm} placeholder="Enter password" />

            <button type="submit">Log in</button>
          </form>

          {/*if message !==null display message from server OR do nothing   */}
          {message ? <Message message={message} /> : null}
        </div>
      </section>
    </main>
  );
};
export default Login;
