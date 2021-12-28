import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";
// import moon from "./../assets/images/icon-moon.svg";
// import sun from "./../assets/images/icon-sun.svg";
// // import logout from "../assets/images/logout_white_18dp.svg";
// import logout from "../assets/images/logout_white_24dp.svg";

const Menu = (props) => {
  const {
    mood,
    moon,
    sun,
    logout,
    switchMood,
    logoutHandler,
    times,
    timeOfDay,
    wish,
    user,
    chooseTimeInterval,
    video,
    setVideo,
    videos,
  } = useGlobalContext();
  // console.log(`Menu Component 'user.role' ${user.role}`);
  // console.log(timeOfDay);
  // console.log(times);

  console.log(`Menu videos:`, videos); //

  let filters = {
    Morning: [5, 10],
    Afternoon: [2, 3],
    Evening: [5, 10, 20, "pranayama", "meditation"],
  };
  let filtersKeys = Object.keys(filters);
  // console.log(filtersKeys); //3) ['Morning', 'Afternoon', 'Evening']
  let filtersKey = filtersKeys.filter((name) => name === timeOfDay);
  // console.log(filtersKey); //['Morning']
  // console.log(filters[filtersKey]); //[5,10]

  console.log(timeOfDay); //Morning
  const exercises = filters[filtersKey].map((time) => {
    console.log(time); //2 //3
    console.log(`Menu timeOfDay:`, timeOfDay); //Afternoon
    // console.log(`Menu videos:`, videos); //
    videos ? console.log(videos) : console.log(`Non of videos`);
    let video = videos.filter(
      (video) =>
        //   console.log(video.timesOfDay == timeOfDay.trim(), video.timesOfDay, timeOfDay)
        //Works:
        // video.timesOfDay === timeOfDay.trim() && video.length === time
        //!!!!????
        video.timesOfDay === timeOfDay.trim() && (video.length === time || video.type === ("pranayama" || "meditation"))
    );
    setVideo(...video);
    console.log(`...video`, ...video);
    console.log(`{video}`, { video }); //Array
    console.log(`video`, video);
    console.log(`video.title`, video[0].title);

    // console.log(video.title);
    // console.log(typeof time === "string" ? time : `${video.title} ${time} minutes`);
    return (
      <button onClick={() => chooseTimeInterval(time)} key={time}>
        {/* <Link to="/dashboard">{typeof time === "string" ? time : ` ${time} minutes`}</Link> */}
        <Link to="/dashboard">
          {typeof time === "string" ? (
            time
          ) : (
            <span>
              <p>{video[0].title}</p> <p className="small">{time} minutes</p>
            </span>
          )}
        </Link>
        {/* <Link to="/dashboard">{typeof time === "string" ? time : `${video[0].title} ${time} minutes`}</Link> */}
      </button>
    );
  });
  // const exercises = filters[filtersKey].map((time) => {
  //   console.log(time); //2 //3
  //   // console.log(video.title);
  //   // console.log(typeof time === "string" ? time : `${video.title} ${time} minutes`);
  //   return (
  //     <button onClick={() => chooseTimeInterval(time)} key={time}>
  //       <Link to="/dashboard">{typeof time === "string" ? time : ` ${time} minutes`}</Link>
  //       {/* <Link to="/dashboard">{typeof time === "string" ? time : `${video.title} ${time} minutes`}</Link> */}
  //     </button>
  //   );
  // });
  // console.log(exercises);
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
