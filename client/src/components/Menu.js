import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";
// import moon from "./../assets/images/icon-moon.svg";
// import sun from "./../assets/images/icon-sun.svg";
// // import logout from "../assets/images/logout_white_18dp.svg";
// import logout from "../assets/images/logout_white_24dp.svg";

const Menu = (props) => {
  const { mood, moon, sun, logout, switchMood, logoutHandler, times, timeOfDay, wish, user, chooseTimeInterval } =
    useGlobalContext();
  // console.log(mood);
  // const { username } = user;
  // console.log(`Menu Component 'username' ${username}`);
  console.log(`Menu Component 'user.role' ${user.role}`);
  console.log(timeOfDay);
  console.log(times);
  // const Morning = times.filter((t) => t > 3 && t <= 10);
  // console.log(Morning);
  // const Afternoon = times.filter((t) => t < 5);
  // console.log(Afternoon);
  // const Evening = times.filter((t) => typeof t);
  // console.log(Evening);

  // let Morning = [5, 10];
  // let Afternoon = [2, 3];
  // let Evening = [5, 10, "pranayama", "meditation"];

  let filters = {
    Morning: [5, 10],
    Afternoon: [2, 3],
    Evening: [5, 10, "pranayama", "meditation"],
  };
  let filtersKeys = Object.keys(filters);
  console.log(filtersKeys); //3) ['Morning', 'Afternoon', 'Evening']
  let filtersKey = filtersKeys.filter((name) => name === timeOfDay);
  console.log(filtersKey); //['Morning']
  console.log(filters[filtersKey]); //[5,10]

  let vremjaSutok = timeOfDay;
  console.log(vremjaSutok); //Morning
  // let upr = timeOfDay;
  // const exercises = vremjaSutok.map((time) => {
  const exercises = filters[filtersKey].map((time) => {
    return (
      <button onClick={() => chooseTimeInterval(time)} key={time}>
        <Link to="/dashboard"> {time} minutes</Link>
      </button>
    );
  });
  console.log(exercises);
  // {
  //   timeOfDay === "Afternoon" &&
  //     times.map((time) => {
  //       console.log(time);
  //       // const filters = times.filter((time) => time <= 3);
  //       return times
  //         .filter((time) => time <= 3, console.log(time))
  //         .map((time) => {
  //           console.log(time);
  //           return (
  //             <button className="test" onClick={() => chooseTimeInterval(time)} key={time}>
  //               <Link to="/dashboard"> {time} minutes</Link>
  //             </button>
  //           );
  //         });
  //     });
  // }

  return (
    <main className={`wrapper wrapper-${mood}`}>
      <section className={`outer outer-${mood}`}>
        {/*!!!========================LOGOUT=========================== */}
        <button className={`logout switcher switcher-${mood}`} onClick={logoutHandler}>
          <img className="sw" src={logout} alt="logout" title="Logout" />
        </button>

        {/*========================THEME=========================== */}
        <button className={`switcher switcher-${mood}`} onClick={switchMood}>
          <img className="sw" src={mood === "dark" ? sun : moon} alt="mood" title="Switch mood" />
        </button>

        <h1>{wish}</h1>
        {/* {timeOfDay} */}
        <div className={`container container-${mood}`}>
          <h3>How much time do you have?</h3>
          {/* {times.map((time) => {
            return (
              <button onClick={() => chooseTimeInterval(time)} key={time}>
                <Link to="/dashboard"> {time} minutes</Link>
              </button>
            );
          })} */}
          {exercises}
          {/* {timeOfDay === "Afternoon" &&
            times.map((time) => {
              console.log(time);
              // const filters = times.filter((time) => time <= 3);
              return times
                .filter((time) => time <= 3, console.log(time))
                .map((time) => {
                  console.log(time);
                  return (
                    <button className="test" onClick={() => chooseTimeInterval(time)} key={time}>
                      <Link to="/dashboard"> {time} minutes</Link>
                    </button>
                  );
                });
            })} */}
        </div>
      </section>
      {user.role === "admin" && (
        <button className="admin">
          <Link to="/">Back Home</Link>
        </button>
      )}
    </main>
  );
};

export default Menu;
