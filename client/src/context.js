import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  //State:
  //exercises length:
  const [times, setTimes] = useState([5, 10, 15]);
  const [time, setTime] = useState(null);
  //
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState();
  //   console.log({ video });
  //time of the day:
  const [timeOfDay, setTimeOfDay] = useState("");
  //   let hour = new Date().getHours();
  const getTimeOfDay = () => {
    let hour = new Date().getHours();
    // console.log(hour);
    const wish = `${(hour > 5 && hour < 12 && "Morning") || (hour > 12 && hour <= 19 && "Afternoon") || "Evening"} `;
    // console.log(wish);
    setTimeOfDay(wish);
  };
  useEffect(() => {
    getTimeOfDay();
    // console.log(timeOfDay);
  }, [time]);
  //----------------------------------------------------------------
  const getVideos = async () => {
    const res = await axios.get("/all");
    // console.log(`getVideos 'res':`, res);
    const videos = await res.data.videos;
    // console.log(`videos`, videos);
    setVideos(videos);
  };
  useEffect(() => {
    getVideos();
  }, []);

  const chooseTimeInterval = (time) => {
    console.log(time);
    setTime(time);
    // getOneVideo();
  };

  const getOneVideo = async () => {
    console.log(`videos`, videos);
    console.log(`time`, time);
    let video = videos.filter((video) => video.length === time);
    console.log(...video); //Array(1)
    // console.log(video._id); //undefined;
    // // let id = video[0]._id;
    // console.log([...video]); //
    // console.log({ ...video });
    // console.log(...video); ///

    // let [pirmais] = video;
    // let videoId = pirmais._id;
    // console.log(videoId);
    setVideo(...video);
    console.log(video); //
    // let selected = video[0];
    // console.log(selected._id);
    // let id = selected._id;

    // setVideo(video);
    // // let oneVideo = videos.filter((video) => video.length === time);
    // console.log(`oneVideo`, { video });
    // // console.log(oneVideo.length);
    // console.log(video[0].title);
    console.log(video[0]._id);
    console.log(video._id); //undefined;
    let id = video[0]._id;

    const res = await axios.get(`/${id}`);
    console.log(res.data); //
    // // setTodo(res.data);
    const selectedVideo = await res.data;
    // // console.log(`videos`, videos);
    console.log({ selectedVideo });
    console.log(selectedVideo.url);
    setVideo(selectedVideo);
  };

  useEffect(() => {
    getOneVideo();
  }, [time]);

  return (
    <AppContext.Provider
      value={{
        times,
        time,
        setTime,
        videos,
        video,
        // hour,
        timeOfDay,
        //
        chooseTimeInterval,
        getVideos,
        getOneVideo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
