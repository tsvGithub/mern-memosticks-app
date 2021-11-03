import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import axios from "axios";
const Dashboard = () => {
  const {
    times,
    time,
    setTime,
    //  videos,
    video,
    chooseTimeInterval,
    getVideos,
    getOneVideo,
  } = useGlobalContext();
  //   console.log(time);
  const [videos, setVideos] = useState([]);
  // const [video, setVideo] = useState({});
  console.log(`video`, video);

  // const getVideos = async () => {
  //   const res = await axios.get("/all");
  //   // console.log(`getVideos 'res':`, res);
  //   const videos = await res.data.videos;
  //   // console.log(`videos`, videos);
  //   setVideos(videos);
  // };
  // useEffect(() => {
  //   getVideos();
  // }, []);
  //-------------

  const allVideos = videos.map((video) => {
    return (
      <section className="container" key={video._id}>
        <h3>{video.title}</h3>
        <iframe src={video.url} title="YouTube video player"></iframe>
      </section>
    );
  });

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
      {/* <section className="container" key={video._id}>
        <h3>{video.title}</h3>
        <h3>{video.length}</h3>
        <iframe src={video.url} title="YouTube video player"></iframe>
      </section> */}
    </div>
  );
};

export default Dashboard;
