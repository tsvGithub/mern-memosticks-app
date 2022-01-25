import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";

const Meditation = () => {
  const {
    history,
    mood,
    moon,
    sun,
    logout,
    switchMood,
    logoutHandler,
    // times,
    // timeOfDay,
    wish,
    user,
    // chooseTimeInterval,
    // video,
    // title,
    setVideo,
    videos,
    // chooseVideo,
  } = useGlobalContext();

  const chooseVideo = (video) => {
    // console.log(`chooseVdeo Meditation "video"`, video);
    setVideo(video);
    // getMentalVideo(video);
  };

  const meditationToShow = videos
    .filter((video) => video.type === "meditation")
    .map((video) => {
      return (
        <button onClick={() => chooseVideo(video)} key={video.title}>
          <Link to="/dashboard">
            {
              <span>
                <p className="italic">{video.title}</p>
              </span>
            }
          </Link>
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
        <div className={`container container-${mood}`}>
          <h3>Let's meditate!</h3>
          {meditationToShow}
        </div>
      </section>

      <button className="admin" onClick={() => history.goBack()}>
        Go Back
      </button>
      {user.role === "admin" && (
        <button className="admin">
          <Link to="/menu">Back Home</Link>
        </button>
      )}
    </main>
  );
};

export default Meditation;
