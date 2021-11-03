import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";

const Menu = () => {
  const { times, timeOfDay, chooseTimeInterval } = useGlobalContext();

  return (
    <div className="container">
      <h1>Menu</h1>
      {timeOfDay}
      <div className="container">
        {times.map((time) => {
          return (
            <button onClick={() => chooseTimeInterval(time)} key={time}>
              <Link to="/dashboard"> {time}</Link>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
