import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";

const Menu = () => {
  const { times, timeOfDay, wish, user, chooseTimeInterval } = useGlobalContext();

  return (
    <div className="wrapper wrapper-dark">
      <h1>{wish}</h1>
      {/* {timeOfDay} */}
      <div className="container">
        <h3>How much time do you have?</h3>
        {times.map((time) => {
          return (
            <button onClick={() => chooseTimeInterval(time)} key={time}>
              <Link to="/dashboard"> {time} minutes</Link>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
