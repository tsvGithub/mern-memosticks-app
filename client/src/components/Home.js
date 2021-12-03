import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Menu from "./Menu";
//logout
import AuthService from "../Services/AuthService";
//global State
import { useGlobalContext } from "../context";

import moon from "./../assets/images/icon-moon.svg";
import sun from "./../assets/images/icon-sun.svg";

const Home = () => {
  const { mood, switchMood, isAuthenticated, setIsAuthenticated, user, setUser } = useGlobalContext();

  const unAuthenticated = () => {
    return (
      <>
        <button>
          <Link to="/register">Register</Link>
        </button>
        <button>
          <Link to="/login">Login</Link>
        </button>
      </>
    );
  };

  const authenticated = () => {
    return (
      <>
        {/* two types of authenticated users:
        admin or regular user */}
        {user.role === "admin" ? (
          <>
            <button>
              <Link to="/admin">Admin</Link>
            </button>
            <button>
              <Link to="/menu">Menu</Link>
            </button>
          </>
        ) : (
          <Menu />
        )}
      </>
    );
  };
  return (
    <main className={`wrapper wrapper-${mood}`}>
      <h1>Cardio with Basil</h1>

      <section className={`basil outer outer-${mood}`}>
        {/*========================THEME=========================== */}
        <button className={`switcher switcher-${mood}`} onClick={switchMood}>
          <img className="sw" src={mood === "dark" ? sun : moon} alt="mood" />
        </button>
      </section>
      <div className={`home container container-${mood}`}>
        {!isAuthenticated ? unAuthenticated() : authenticated()}
        {/* {times.map((time) => {
            return (
              <button onClick={() => chooseTimeInterval(time)} key={time}>
                <Link to="/dashboard"> {time} minutes</Link>
              </button>
            );
          })} */}
      </div>
    </main>
  );
};

export default Home;
