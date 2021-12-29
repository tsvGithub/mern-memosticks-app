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

  console.log(`Menu videos:`, videos); //[9]
  console.log(`Menu videos.length:`, videos.length); //9

  let filters = {
    Morning: [5, 10],
    Afternoon: [2, 3, 20],
    Evening: [5, 10, 20],
    // Evening: [5, 10, 20, "pranayama", "meditation"],
  };
  let filtersKeys = Object.keys(filters);
  console.log(`Menu All filtersKeys:`, filtersKeys);
  //3) ['Morning', 'Afternoon', 'Evening']
  let filtersKey = filtersKeys.filter((name) => name === timeOfDay);
  console.log(`Menu One filtersKey:`, filtersKey);
  //['Afternoon']
  console.log(`Menu filters[filtersKey]:`, filters[filtersKey]);
  //[2,3,20]

  console.log(timeOfDay); //Afternoon
  const exercises = filters[filtersKey].map((time) => {
    console.log(`Menu time:`, time); //2
    console.log(`Menu timeOfDay:`, timeOfDay); //Afternoon
    // console.log(`Menu videos.length:`, videos.length); //9
    // videos ? console.log(`Menu videos:`, videos) : console.log(`Non of videos`);
    //[9]
    let video = videos.filter(
      (video) =>
        console.log(
          `Menu video.timesOfDay == timeOfDay.trim():`,
          video.timesOfDay == timeOfDay.trim(),
          // video.timesOfDay, timeOfDay,
          `Menu video.length === time:`,
          video.length === time,
          `video.title:`,
          video.title
        )
      //Works:
      // video.timesOfDay === timeOfDay.trim() && video.length === time
      //!!!!????
      // (video.timesOfDay === timeOfDay.trim() && video.length === time) || video.type === ("pranayama" || "meditation")
    );
    // setVideo(...video);
    // console.log(`Menu ...video`, ...video);
    // //{Spine Energy}
    // console.log(`Menu {video}`, { video });
    // //{video: [Array (1) ]}
    console.log(`Menu video`, video);
    // //[0:{Tibetans}, 1:{Pranayama}]
    // console.log(Menu`video.title`, video.title); //uzhe ni4ego i posle etotgo ne idjet vniz!
    // console.log(Menu`video.title`, video[0].title);

    // console.log(video.title);
    // console.log(typeof time === "string" ? time : `${video.title} ${time} minutes`);
    return (
      <button onClick={() => chooseTimeInterval(time)} key={time}>
        <Link to="/dashboard">{` ${time} minutes`}</Link>
        {/* <Link to="/dashboard">
          {typeof time === "string" ? (
            time
          ) : (
            <span>
              {/* <p>{video[0].title}</p>  */}
        {/* <p className="small">{time} minutes</p>
            </span>
          )}
        </Link> */}
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
