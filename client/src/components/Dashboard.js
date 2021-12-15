import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
const Dashboard = () => {
  const { time, video, mood } = useGlobalContext();
  console.log(`video`, video);
  //-------------
  // const allVideos = videos.map((video) => {
  //   return (
  //     <section className="container" key={video._id}>
  //       <h3>{video.title}</h3>
  //       <iframe src={video.url} title="YouTube video player"></iframe>
  //     </section>
  //   );
  // });

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
          <button>
            <Link to="/menu">Back Home</Link>
          </button>
        </div>
      </section>
    );
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>{time}</h3>
      {/* {allVideos} */}
    </div>
  );
};

export default Dashboard;
