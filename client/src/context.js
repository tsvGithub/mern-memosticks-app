import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
//Authentification (1)
import AuthService from "./Services/AuthService";
import moon from "./assets/images/icon-moon.svg";
import sun from "./assets/images/icon-sun.svg";
// import logout from "../assets/images/logout_white_18dp.svg";
import logout from "./assets/images/logout_white_24dp.svg";

//VI (V services/AuthService.js; VII -> App.js )
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
  // console.log(mood);
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
  // const [user, setUser] = useState("Ted");
  //--------------------------
  //Authentification (2)
  //'user'===user that is logged in
  const [user, setUser] = useState(null);
  //isAuthenticated===if this user is authenticated or not
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //isLoaded is boolean value to see if the app is loaded
  //once we get the data => isLoaded===true
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState("");

  //-------------------------
  //THEME (2)
  const [mood, setMood] = useState(getStorageTheme());
  // console.log(mood);
  //---------------
  //THEME (3):
  const switchMood = () => {
    setMood(mood === "dark" ? "light" : "dark");
    console.log(mood);
  };
  //=================================
  //Authentification (3)
  //to persist authentication === сохранить аутентификацию
  //once user is logeed in we set a 'state' to let App
  //know that user has been authenticated.
  //When you close React app that state is gone.
  //So isAuthenticated syncs BE & FE together and
  //when 'user' visits site again => stays logged in
  useEffect(() => {
    //use Services/AuthService.js func(1d) 'isAuthenticated'
    AuthService.isAuthenticated()
      //get back data
      .then((data) => {
        setIsLoaded(true);
        // if authentication fails, Passport will respond with a 401 Unauthorized status,
        //and any additional route handlers will not be invoked.
        //If authentication succeeds, the 'req.user' property
        //will be set to the authenticated user.
        //Set 'user' state
        setUser(data.user);
        //-----------------------
        // (BE 4b 'routes'->login)//if user is logged in
        //isAuthenticated() added by Passport by default
        //returns boolean (true/false)
        //isAuthenticated: true because the user is successfully logged in
        // {isAuthenticated: true,
        ////send back user with username and role
        //   user: { username, role },}------------------------
        setIsAuthenticated(data.isAuthenticated);
        //after getting data
        setIsLoaded(false);
      });
  }, []);
  //-------------------
  //Authentification (4)
  const logoutHandler = () => {
    //use 'AuthService' func 'logout' (1c)
    AuthService.logout().then((data) => {
      //if successfully logged out or not
      if (data.success) {
        //set 'user'(username, parrsord, role) to empty string ("")
        setUser(data.user);
        //set isAuthenticated to false
        setIsAuthenticated(false);
      }
    });
  };
  //Authentification (5)
  //Form
  const changeForm = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    //fetch ('/login') with user from form
    AuthService.login(user).then((data) => {
      console.log(data);
      //pull {stuff} from response parsed data
      const { isAuthenticated, user, message } = data;
      //if isAuthenticated===true
      if (isAuthenticated) {
        //update global state of user => (updated user)
        setUser(user);
        //update the isAuthenticated state => isAuthenticated(true)
        setIsAuthenticated(isAuthenticated);
        //navigate user to 'videos' page
        //!!!
        // props.history.push("/todos");
      } else {
        //if isAuthenticated===false =>display error message from server
        setMessage(message);
      }
    });
  };
  //================================
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
    <div>
      {isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <AppContext.Provider
          /*provide 'global state' to children===components*/
          value={{
            times,
            time,
            setTime,
            videos,
            video,
            timeOfDay,
            wish,
            //Authentification ()-----
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            logoutHandler,
            logout,
            changeForm,
            submitForm,
            message,
            setMessage,
            //-------------
            mood,
            switchMood,
            moon,
            sun,
            switchMood,
            //--------------------
            chooseTimeInterval,
            getVideos,
            getOneVideo,
          }}
        >
          {children}
        </AppContext.Provider>
      )}
    </div>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
