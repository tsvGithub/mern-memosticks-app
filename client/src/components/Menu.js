import React, { useState } from "react";
import { Link, Switch, Route } from "react-router-dom";

import { useGlobalContext } from "../context";
import Dashboard from "./Dashboard";

const Menu = () => {
  const { times, time, setTime, timeOfDay, chooseTimeInterval } = useGlobalContext();

  return (
    <div className="container">
      <h1>Menu</h1>
      {timeOfDay}
      <div className="container">
        {/* {hour} */}
        {times.map((time) => {
          return (
            <button onClick={() => chooseTimeInterval(time)} key={time}>
              {/* <button onClick={() => setTime(time)} key={time}> */}
              <Link to="/dashboard"> {time}</Link>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
