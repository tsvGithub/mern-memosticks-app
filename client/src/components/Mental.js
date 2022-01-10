import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";

const Mental = () => {
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
    title,
    setVideo,
    videos,
  } = useGlobalContext();
  // console.log(`Menu Component 'user.role' ${user.role}`);
  // console.log(timeOfDay);
  // console.log(times);

  console.log(`Menu videos:`, videos); //[9]

  const timeToShow = videos
    .filter((video) => video.timesOfDay === timeOfDay.trim())
    .map((time) => {
      console.log(`Menu timeToShow time.length`, time.length);
      console.log(`Menu timeToShow time.title`, time.title);
      let isATime = time.length > 0 ? `${time.length} minutes` : "";
      return (
        <button onClick={() => chooseTimeInterval(time.length)} key={time.length}>
          <Link to="/dashboard">
            {
              <span>
                <p className="italic">{time.title}</p>
                <p className="small">{isATime}</p>
              </span>
            }
          </Link>

          {/* <Link to="/dashboard">{`${time.title} ${isATime}`}</Link> */}
          {/* <Link to="/dashboard">{`  ${time.title} ${time.length} minutes`}</Link> */}
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
  // console.log(timeToShow);

  // const exercises = filters[filtersKey].map((time) => {
  //   console.log(`Menu time:`, time); //2
  //   console.log(`Menu timeOfDay:`, timeOfDay); //Afternoon
  //   console.log(`Menu {video}:`, { video }); //{video: undefined}
  //   // console.log(`Menu videos.length:`, videos.length); //9
  //   // videos ? console.log(`Menu videos:`, videos) : console.log(`Non of videos`);
  //   //[9]
  //   // let video = videos.filter(
  //   //   (video) =>
  //   //     // console.log(
  //   //     //   `Menu video.timesOfDay == timeOfDay.trim():`,
  //   //     //   video.timesOfDay == timeOfDay.trim(),
  //   //     //   // video.timesOfDay, timeOfDay,
  //   //     //   `Menu video.length === time:`,
  //   //     //   video.length === time,
  //   //     //   `video.title:`,
  //   //     //   video.title
  //   //     // )
  //   //     //Works:
  //   //     video.timesOfDay === timeOfDay.trim() && video.length === time
  //   //   //!!!!????
  //   //   // (video.timesOfDay === timeOfDay.trim() && video.length === time) || video.type === ("pranayama" || "meditation")
  //   // );
  //   // setVideo(...video);
  //   // console.log(`Menu ...video`, ...video);
  //   // //{Spine Energy}
  //   // console.log(`Menu {video}`, { video });
  //   // //{video: [Array (1) ]}
  //   // console.log(`Menu video`, video);
  //   // //[0:{Tibetans}, 1:{Pranayama}]
  //   // console.log(Menu`video.title`, video.title); //uzhe ni4ego i posle etotgo ne idjet vniz!
  //   // console.log(Menu`video.title`, video[0].title);

  //   // console.log(video.title);
  //   // console.log(typeof time === "string" ? time : `${video.title} ${time} minutes`);
  //   console.log(title); //
  //   return (
  //     <button onClick={() => chooseTimeInterval(time)} key={time}>
  //       <Link to="/dashboard">{`  ${title} ${time} minutes`}</Link>
  //       {/* <Link to="/dashboard">
  //         {typeof time === "string" ? (
  //           time
  //         ) : (
  //           <span>
  //             {/* <p>{video[0].title}</p>  */}
  //       {/* <p className="small">{time} minutes</p>
  //           </span>
  //         )}
  //       </Link> */}
  //       {/* <Link to="/dashboard">{typeof time === "string" ? time : `${video[0].title} ${time} minutes`}</Link> */}
  //     </button>
  //   );
  // });
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
          <h3>What shall we do?</h3>
          {/* <h3>How much time do you have?</h3> */}
          {/* {times.map((time) => {
            return (
              <button onClick={() => chooseTimeInterval(time)} key={time}>
                <Link to="/dashboard"> {time} minutes</Link>
              </button>
            );
          })} */}
          {/* {exercises} */}

          {/* {timeToShow} */}

          <button>
            <Link to="/pranayama"> Pranayama</Link>
          </button>
          <button>
            <Link to="/meditation"> Meditation</Link>
          </button>

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
      {/* {user.role === "admin" && ( */}
      <button className="admin">
        <Link to="/menu">Back</Link>
      </button>
      {/* )} */}
    </main>
  );
};

export default Mental;
