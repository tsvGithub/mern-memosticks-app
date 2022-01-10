import React from "react";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";

import { useGlobalContext } from "../context";
const Dashboard = () => {
  const { history, time, video, videos, mood } = useGlobalContext();
  // let history = useHistory();
  // console.log(`video`, video);

  if (!video) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (video) {
    return (
      <section className={`wrapper wrapper-${mood}`} key={video._id}>
        {/* <h3>{video.title}</h3>
        <h3>{video.length}</h3> */}
        <div className="embed-container">
          {/* <div className="outer embed-container"> */}
          <iframe src={video.url} allowFullScreen title="YouTube video player"></iframe>
          {/* <button>
            <Link to="/menu">Back Home</Link>
          </button> */}
          <button onClick={() => history.goBack()}>Go Back</button>
        </div>
        {/* {allVideos} */}
      </section>
    );
  }
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
