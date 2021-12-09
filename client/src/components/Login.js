import React from "react";
//global State
import { useGlobalContext } from "../context";
//Message displays messages from the Server
import Message from "../components/Message";

//IX (VIII Home.js; X -> Register.js)
//'props' for 'history' => navigate user to 'Menu' page
// props.history.push("/menu");
const Login = (props) => {
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
            <input type="password" name="password" onChange={changeForm} placeholder="Enter password" />

            <button className="submit" type="submit">
              Log in
            </button>
          </form>

          {/*if message !==null display message from server OR do nothing   */}
          {message ? <Message message={message} /> : null}
        </div>
      </section>
    </main>
  );
};
export default Login;
