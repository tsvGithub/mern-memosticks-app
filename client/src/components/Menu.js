import React from "react";
import { Link, useHistory } from "react-router-dom";

import { useGlobalContext } from "../context";
// import moon from "./../assets/images/icon-moon.svg";
// import sun from "./../assets/images/icon-sun.svg";
// // import logout from "../assets/images/logout_white_18dp.svg";
// import logout from "../assets/images/logout_white_24dp.svg";

const Menu = () => {
  const { mood, moon, sun, logout, switchMood, logoutHandler, times, timeOfDay, wish, user, chooseTimeInterval } =
    useGlobalContext();
  // const history = useHistory();
  // console.log(`history.length ${history.length}`);
  // console.log(`history ${{ history }}`);
  // console.log(mood);
  // const { username } = user;
  // console.log(`Menu Component 'username' ${username}`);

  return (
    <main className={`wrapper wrapper-${mood}`}>
      <section className={`outer outer-${mood}`}>
        {/*!!!========================LOGOUT=========================== */}
        <button className={`switcher switcher-${mood}`} onClick={logoutHandler}>
          <img className="sw" src={logout} alt="logout" />
        </button>

        {/*========================THEME=========================== */}
        <button className={`switcher switcher-${mood}`} onClick={switchMood}>
          <img className="sw" src={mood === "dark" ? sun : moon} alt="mood" />
        </button>

        <h1>{wish}</h1>
        {/* {timeOfDay} */}
        <div className={`container container-${mood}`}>
          <h3>How much time do you have?</h3>
          {times.map((time) => {
            return (
              <button onClick={() => chooseTimeInterval(time)} key={time}>
                <Link to="/dashboard"> {time} minutes</Link>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Menu;
