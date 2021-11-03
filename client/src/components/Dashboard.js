import React from "react";
import { useGlobalContext } from "../context";
const Dashboard = () => {
  const { time, video } = useGlobalContext();
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
      <section className="container" key={video._id}>
        <h3>{video.title}</h3>
        <h3>{video.length}</h3>
        <iframe src={video.url} title="YouTube video player"></iframe>
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
