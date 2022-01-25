import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
//Authentification (1)
import AuthService from "./Services/AuthService";
import moon from "./assets/images/icon-moon.svg";
import sun from "./assets/images/icon-sun.svg";
// import logout from "../assets/images/logout_white_18dp.svg";
import logout from "./assets/images/logout_white_24dp.svg";

//VI (V services/AuthService.js; VII -> App.js )
const AppContext = React.createContext();
//-----------------------------
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
  let history = useHistory();
  // console.log(`history.length: ${history.length}`);

  //State:
  //exercises length:
  // eslint-disable-next-line
  const [times, setTimes] = useState([2, 3, 5, 10, 20, "pranayama", "meditation"]);
  const [time, setTime] = useState(null);
  //
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState();
  const [title, setTitle] = useState("");
  //time of the day:
  const [timeOfDay, setTimeOfDay] = useState("");
  const [wish, setWish] = useState("");
  //user
  // const [user, setUser] = useState("Ted");
  //--------------------------
  //Authentification (2)
  //'user'===user that is logged in
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState("");
  // eslint-disable-next-line
  const [username, setUsername] = useState("");
  //isAuthenticated===if this user is authenticated or not
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //isLoaded is boolean value to see if the app is loaded
  //once we get the data => isLoaded===true
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState("");
  //'useRef' creates an istance var because of using
  //setTimeout method
  let timerID = useRef(null);
  //-------------------------
  //THEME (2)
  const [mood, setMood] = useState(getStorageTheme());
  // console.log(mood);
  //THEME (3):
  const switchMood = () => {
    setMood(mood === "dark" ? "light" : "dark");
    // console.log(mood);
  };
  //THEME (4):
  //run every time 'mood' changes
  useEffect(() => {
    //access HTML document & 'class' and set mood
    document.documentElement.className = mood;
    //every time 'mood' changes value => set
    //localStorage to this value.
    localStorage.setItem("mood", mood);
    // console.log(mood);
  }, [mood]);

  //=================================
  //Authentification (3)
  //to persist authentication === сохранить аутентификацию
  //once user is logged in we set a 'state' to let App
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
        // console.log(`isAuthenticated data.user: ${data.user}`);
        //-----------------------
        // (BE 4b 'routes'->login)//if user is logged in
        //isAuthenticated() added by Passport by default
        //returns boolean (true/false)
        //isAuthenticated: true because the user is successfully logged in
        // {isAuthenticated: true,
        ////send back user with username and role
        //   user: { username, role },}------------------------
        setIsAuthenticated(data.isAuthenticated);
        // console.log(isAuthenticated);
        //after getting data
        setIsLoaded(false);
      });
  }, []);
  //-------------------
  //Authentification (4)
  const logoutHandler = () => {
    // console.log("Logout!");
    // console.log(user);
    if (!user.username) {
      history.push("/");
    }

    //use 'AuthService' func 'logout' (1c)
    AuthService.logout().then((data) => {
      if (!data.success) {
        history.push("/");
      }
      //if successfully logged out or not
      if (data.success) {
        //set 'user'(username, parrsord, role) to empty string ("")
        setUser(data.user);
        //set isAuthenticated to false
        setIsAuthenticated(false);
        history.push("/");
      }
    });
  };
  //Authentification (5)
  //Form
  const changeForm = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const resetForm = () => {
    setUser({
      username: "",
      password: "",
      role: "",
    });
    // console.log(user.username, user.password);
  };
  const submitLoginForm = (e) => {
    e.preventDefault();
    setUser({ ...user, username: user.username.toLowerCase() });
    // console.log(user);
    // console.log(user.username);
    // console.log(user.username.toLowerCase());
    // console.log(user.username.toUpperCase());

    if (user.username && user.password) {
      // user.username.toLowerCase();
      // console.log(user.username); //
      // setUser({ ...user, username: user.username.toLowerCase() });

      //fetch ('/login') with user from form
      AuthService.login(user).then((data) => {
        // console.log(data);
        //pull {stuff} from response parsed data
        // eslint-disable-next-line
        const { isAuthenticated, user, message } = data;
        //from BE username + role
        // console.log(user);
        //if isAuthenticated===true
        if (isAuthenticated) {
          //update global state of user => (updated user)
          setUser(user);
          setUsername(user.username);
          // console.log(`context submitLoginForm username: ${user.username}`);
          //update the isAuthenticated state => isAuthenticated(true)
          setIsAuthenticated(isAuthenticated);
          // console.log(isAuthenticated);
          getTimeOfDay(user.username);

          // console.log(user.role);
          //get all videos:
          getVideos();

          user.role === "admin" && history.push("/");
          user.role === "user" && history.push("/menu");
          // history.push("/");
        } else {
          //if isAuthenticated===false =>display error message from server
          setMessage({ msgBody: "Incorrect username or password, please try again.", msgError: true });
          // // console.log(user);
          timerID = setTimeout(() => {
            setMessage({ msgBody: "", msgError: false });
            // clean form
            resetForm();
          }, 4000);
          // console.log(user);
        }
      });
    } else {
      setMessage({ msgBody: "Please enter your username and password!", msgError: true });
      timerID = setTimeout(() => {
        setMessage({ msgBody: "", msgError: false });
      }, 4000);
    }
  };
  //cleans up the setTimeout
  useEffect(() => {
    //===component did unmout
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const changeRegisterForm = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value, role: "user" });
  };
  const submitRegisterForm = (e) => {
    e.preventDefault();
    // console.log(user.username);
    if (user.username && user.password) {
      // console.log(user);

      //fetch ('/login') with user from form
      AuthService.register(user).then((data) => {
        //pull {stuff} from response parsed data
        const { message } = data;
        // console.log(message);

        //update message from useState
        setMessage(message);

        //clean form
        resetForm();
        //if there is no error because user successfully
        //created account => navigate user to Login page
        if (!message.msgError) {
          //set timer to show to user success message for 2 sec
          timerID = setTimeout(() => {
            //navigate user to Login page
            history.push("/login");
            // clean form
            resetForm();
            setMessage({ msgBody: "", msgError: false });
          }, 2000);
        } else {
          //if error =>display error message from server
          setMessage({ msgBody: message.msgBody, msgError: true });
          // setMessage({ msgBody: "Incorrect username or password, please try again.", msgError: true });
          // console.log(message);
          timerID = setTimeout(() => {
            setMessage({ msgBody: "", msgError: false });
          }, 4000);
        }
      });
    } else {
      setMessage({ msgBody: "Please enter your username and password!", msgError: true });
      timerID = setTimeout(() => {
        setMessage({ msgBody: "", msgError: false });
      }, 4000);
    }
  };
  const getTimeOfDay = (username) => {
    let hour = new Date().getHours();
    const timeOfDay = `${
      (hour >= 5 && hour < 12 && "Morning") || (hour >= 12 && hour < 19 && "Afternoon") || (hour >= 19 && "Evening")
    }`;
    setTimeOfDay(timeOfDay);
    const wish = username ? `Good ${timeOfDay}, ${username.toUpperCase()}!` : `Good ${timeOfDay}, Guest`;

    setWish(wish);
    // console.log(timeOfDay);
  };

  // useEffect(() => {
  //   getTimeOfDay();
  // }, [submitLoginForm, submitRegisterForm]);
  //----------------------------------------------------------------
  //get All videos
  const getVideos = async () => {
    const res = await axios.get("/all");
    const videos = await res.data.videos;
    setVideos(videos);
    // console.log(`Initial videos`, videos); //All videos [Array(9)]
  };
  useEffect(() => {
    getVideos();
  }, []);
  //-----------------------------------------------------------------
  //How much time do you have?
  const chooseTimeInterval = (time) => {
    setTime(time);
    getOneVideo(time);
  };
  const chooseVideo = (video) => {
    setVideo(video);
    // getMentalVideo(video);
  };
  // const getMentalVideo = (video) => {
  //   console.log(`Context 'getOneVideo' All videos`, videos); //Array(0)
  //   let filteredVideo = videos.filter(
  //     // let video = videos.filter(
  //     (video) =>
  //       //Works:
  //       // video.timesOfDay === timeOfDay.trim() && video.length === time
  //       //!!!!????
  //       video.timesOfDay === timeOfDay.trim() && video.length === time
  //     // setTitle(video.title)
  //     // || video.type === ("pranayama" || "meditation")
  //   );
  //   console.log(`Context 'getOneVideo' filteredVideos`, { filteredVideo });
  //   // console.log(`Context 'getOneVideo'...video`, ...video); //estj konkretnoe video
  //   setVideo(...filteredVideo);
  //   setTitle(filteredVideo[0].title);

  //   // // let { title } = video;
  //   console.log(`Context 'getOneVideo' title:`, title);
  //   // // setTitle(...video, { title: video.title });
  //   // // console.log(`Context 'getOneVideo' video title`, title.title);
  //   // // console.log(`Context 'getOneVideo' video title`, { title });

  //   // console.log(`Context 'getOneVideo' video[0]title`, video[0].title); //[Array(0)]
  //   // console.log(`Context 'getOneVideo' video.title`, video.title); //[Array(0)]
  //   // console.log(`Context 'getOneVideo' video[0].title`, video[0].title); //[Array(0)]
  // };

  //-----------------------------------------------------------------
  //Get One Video:
  const getOneVideo = (time) => {
    // console.log(`Context 'getOneVideo' All videos`, videos); //Array(0)
    // console.log(`Context 'getOneVideo' time`, time); //20
    // console.log(`Context 'getOneVideo' timeOfDay`, timeOfDay);
    let filteredVideo = videos.filter(
      // let video = videos.filter(
      (video) =>
        //Works:
        // video.timesOfDay === timeOfDay.trim() && video.length === time
        //!!!!????
        video.timesOfDay === timeOfDay.trim() && video.length === time
      // setTitle(video.title)
      // || video.type === ("pranayama" || "meditation")
    );
    // console.log(`Context 'getOneVideo' filteredVideos`, { filteredVideo });
    // console.log(`Context 'getOneVideo'...video`, ...video); //estj konkretnoe video
    setVideo(...filteredVideo);
    setTitle(filteredVideo[0].title);

    // // let { title } = video;
    // console.log(`Context 'getOneVideo' title:`, title);
    // // setTitle(...video, { title: video.title });
    // // console.log(`Context 'getOneVideo' video title`, title.title);
    // // console.log(`Context 'getOneVideo' video title`, { title });

    // console.log(`Context 'getOneVideo' video[0]title`, video[0].title); //[Array(0)]
    // console.log(`Context 'getOneVideo' video.title`, video.title); //[Array(0)]
    // console.log(`Context 'getOneVideo' video[0].title`, video[0].title); //[Array(0)]
  };
  //onClick "Menu" Component
  // useEffect(() => {
  //   getOneVideo();
  // }, [time]);
  //========================================
  return (
    <div>
      {isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <AppContext.Provider
          /*provide 'global state' to children===components*/
          value={{
            history,
            times,
            time,
            setTime,
            videos,
            video,
            title,
            setVideo,
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
            resetForm,
            submitLoginForm,
            changeRegisterForm,
            submitRegisterForm,
            message,
            setMessage,
            //-------------
            mood,
            switchMood,
            moon,
            sun,
            //--------------------
            chooseTimeInterval,
            getVideos,
            getOneVideo,
            chooseVideo,
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
