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
  //time of the day:
  const [timeOfDay, setTimeOfDay] = useState("");
  const getTimeOfDay = () => {
    let hour = new Date().getHours();
    const wish = `${(hour > 5 && hour < 12 && "Morning") || (hour >= 12 && hour <= 19 && "Afternoon") || "Evening"}`;
    setTimeOfDay(wish);
  };
  useEffect(() => {
    getTimeOfDay();
  }, []);
  //----------------------------------------------------------------
  //get All videos
  const getVideos = async () => {
    const res = await axios.get("/all");
    const videos = await res.data.videos;
    setVideos(videos);
  };
  useEffect(() => {
    getVideos();
  }, []);
  //-----------------------------------------------------------------
  //How much time do you have?
  const chooseTimeInterval = (time) => {
    setTime(time);
  };
  //-----------------------------------------------------------------
  //Get One Video:
  const getOneVideo = async () => {
    console.log(`videos`, videos);
    console.log(`time`, time);
    console.log(`timeOfDay`, timeOfDay);
    let video = videos.filter(
      (video) =>
        //   console.log(video.timesOfDay == timeOfDay.trim(), video.timesOfDay, timeOfDay)
        video.timesOfDay === timeOfDay.trim() && video.length === time
    );
    // console.log(`...video`, ...video);
    setVideo(...video);
    // console.log(`video`, video); //
  };
  useEffect(() => {
    getOneVideo();
  }, [time]);
  //========================================
  return (
    <AppContext.Provider
      value={{
        times,
        time,
        setTime,
        videos,
        video,
        timeOfDay,
        //functionalities:
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
