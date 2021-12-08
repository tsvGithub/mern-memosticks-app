import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
    submitLoginForm,
    // history,
    logout,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    logoutHandler,
    message,
    setMessage,
    handleClick,
  } = useGlobalContext();
  // console.log(`Login Component 'user' ${user}`);
  // const { username } = user;
  // console.log(`Login Component 'username' ${username}`);
  const history = useHistory();
  console.log(`Login Component history.length ${history.length}`);
  console.log(`history ${{ history }}`);

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
          <form onSubmit={submitLoginForm}>
            <h3>Please sign in</h3>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              onChange={changeForm}
              placeholder="Enter username"
              required
              aria-label="username"
            />

            <label htmlFor="password">Password:</label>
            <input type="password" name="password" onChange={changeForm} placeholder="Enter password" />

            <button type="submit">Log in</button>
          </form>
          <button onClick={handleClick}>Hi</button>

          {/*if message !==null display message from server OR do nothing   */}
          {message ? <Message message={message} /> : null}
        </div>
      </section>
    </main>
  );
};
export default Login;
