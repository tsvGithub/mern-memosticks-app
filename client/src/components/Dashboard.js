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
  console.log(video);

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
  //Get One Video => 'Morning'
  // const getOneVideo = async (video) => {
  //   // let newTodo = { ...todo };
  //   const res = await axios.get(`/${video._id}`);
  //   // const res = await axios.put(`/todos/${newTodo._id}`, newTodo);
  //   // console.log(res.data); //
  //   // setTodo(res.data);
  //   const selectedVideo = await res.data.video;
  //   // console.log(`videos`, videos);
  //   setVideo(selectedVideo);
  // };

  const allVideos = videos.map((video) => {
    return (
      <section className="container" key={video._id}>
        <h3>{video.title}</h3>
        <iframe src={video.url} title="YouTube video player"></iframe>
      </section>
    );
  });
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>{time}</h3>
      {/* {allVideos} */}
      <section className="container" key={video._id}>
        <h3>{video.title}</h3>
        <h3>{video.length}</h3>
        <iframe src={video.url} title="YouTube video player"></iframe>
      </section>
    </div>
  );
};

export default Dashboard;
