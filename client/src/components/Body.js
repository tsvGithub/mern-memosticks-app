import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";

const Body = () => {
  const {
    history,
    mood,
    moon,
    sun,
    logout,
    switchMood,
    logoutHandler,
    // times,
    timeOfDay,
    wish,
    user,
    chooseTimeInterval,
    // video,
    // title,
    // setVideo,
    videos,
  } = useGlobalContext();
  // console.log(`Menu Component 'user.role' ${user.role}`);
  // console.log(timeOfDay);
  // console.log(times);

  // console.log(`Menu videos:`, videos); //[9]
  const timeToShow = videos
    .filter((video) => video.timesOfDay === timeOfDay.trim())
    .map((time) => {
      // console.log(`Menu timeToShow time.length`, time.length);
      // console.log(`Menu timeToShow time.title`, time.title);
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
          {/* <h3>What should we train?</h3> */}
          <h3>How much time do you have?</h3>
          {/* {times.map((time) => {
            return (
              <button onClick={() => chooseTimeInterval(time)} key={time}>
                <Link to="/dashboard"> {time} minutes</Link>
              </button>
            );
          })} */}
          {/* {exercises} */}

          {timeToShow}

          {/* <button>
            <Link to="/mental">Mental</Link>
          </button>
          <button>
            <Link to="/body">Body</Link>
          </button> */}

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
      <button className="admin" onClick={() => history.goBack()}>
        Go Back
      </button>

      {user.role === "admin" && (
        <button className="admin">
          <Link to="/">Back Home</Link>
        </button>
      )}
    </main>
  );
};

export default Body;
