import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const AppContext = React.createContext();
//THEME (1)
//localStorage for user preferences
//Application=>localStorage: key-value
const getStorageTheme = () => {
  let mood = "dark";
  //'mood'=>key; if the kye exists
  //set 'value' to the value that was passed
  if (localStorage.getItem("mood")) {
    mood = localStorage.getItem("mood");
  }
  console.log(mood);
  //return default value or value of the key from localStorage.
  return mood;
};

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
  const [wish, setWish] = useState("");
  //user
  const [user, setUser] = useState("Ted");
  //THEME (2)
  const [mood, setMood] = useState(getStorageTheme());
  console.log(mood);
  //---------------
  //THEME (3):
  const switchMood = () => {
    setMood(mood === "dark" ? "light" : "dark");
    console.log(mood);
  };
  //THEME (4):
  //run every time 'mood' changes
  useEffect(() => {
    //access HTML document & 'class' and set mood
    document.documentElement.className = mood;
    //every time 'mood' changes value => set
    //localStorage to this value.
    localStorage.setItem("mood", mood);
    console.log(mood);
  }, [mood]);
  //====================

  const getTimeOfDay = () => {
    let hour = new Date().getHours();
    const timeOfDay = `${
      (hour >= 5 && hour < 12 && "Morning") || (hour >= 12 && hour < 19 && "Afternoon") || (hour >= 19 && "Evening")
    }`;
    setTimeOfDay(timeOfDay);
    const wish = `Good ${timeOfDay}, ${user}!`;
    setWish(wish);
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
        wish,
        user,
        mood,
        //functionalities:
        switchMood,
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
