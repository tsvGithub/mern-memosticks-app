import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";
import moon from "./../assets/images/icon-moon.svg";
import sun from "./../assets/images/icon-sun.svg";

const Menu = () => {
  const { mood, switchMood, times, timeOfDay, wish, user, chooseTimeInterval } = useGlobalContext();
  console.log(mood);

  return (
    <main className={`wrapper wrapper-${mood}`}>
      {/*========================THEME=========================== */}
      <button className="switcher" onClick={switchMood}>
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
    </main>
  );
};

export default Menu;
