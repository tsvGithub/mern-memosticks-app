import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
const List = () => {
  // const [videos, setVideos] = useState([]);
  const {
    // times,
    // time,
    // setTime,
    //  videos,
    video,
    // chooseTimeInterval,
    // getVideos,
    // getOneVideo,
  } = useGlobalContext();

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

  // const allVideos = videos.map((video) => {
  //   return (
  //     <section className="container" key={video._id}>
  //       <h3>{video.title}</h3>
  //       {/* <video width="400" controls> */}
  //       {/* <source src="https://www.youtube.com/embed/tgbNymZ7vqY" type="video/mp4" autoplay muted></source> */}
  //       {/* <source src="mov_bbb.ogg" type="video/ogg" autoplay muted></source> */}
  //       {/* <iframe
  //         width="560"
  //         height="315"
  //         src="https://www.youtube.com/embed/tgbNymZ7vqY"
  //         title="YouTube video player"
  //         frameBorder="0"
  //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //         allowFullScreen
  //       ></iframe> */}
  //       <iframe
  //         // width="420"
  //         // height="315"
  //         src={video.url}
  //         // src="https://www.youtube.com/embed/tgbNymZ7vqY"
  //         title="YouTube video player"
  //       ></iframe>
  //       {/* </video> */}
  //       {/* <div>{video.url}</div> */}
  //     </section>
  //   );
  // });
  console.log(video.title);
  return (
    <div>
      <h1>List Component</h1>
      {/* <p>{videos.map((video) => video.title)}</p> */}
      {/* {allVideos} */}
      <section className="container" key={video._id}>
        <h3>{video.title}</h3>
        <h3>{video.length}</h3>
        <iframe src={video.url} title="YouTube video player"></iframe>
      </section>
    </div>
  );
};

export default List;
