import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Dashboard from "./components/Dashboard";
import Mental from "./components/Mental";
import Pranayama from "./components/Pranayama";
import Meditation from "./components/Meditation";
import Body from "./components/Body";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";

import PrivateRoute from "./hocs/PrivateRoute";

import "./App.css";

//VII (VI context; VIII -> Home.js)
function App({ history }) {
  return (
    <>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {/* <Route path="/register">
          <Register />
        </Route> */}

        {/* Private Routes: ------------------------- */}
        {/* prop roles is [array of the roles that are able to acces to Menu, Dashboard (videos) & Admin component] */}
        <PrivateRoute path="/menu" roles={["user, admin"]} component={Menu} />
        <PrivateRoute path="/dashboard" roles={["user, admin"]} component={Dashboard} />
        <PrivateRoute path="/mental" roles={["user, admin"]} component={Mental} />
        <PrivateRoute path="/pranayama" roles={["user, admin"]} component={Pranayama} />
        <PrivateRoute path="/meditation" roles={["user, admin"]} component={Meditation} />
        <PrivateRoute path="/body" roles={["user, admin"]} component={Body} />
        <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />
        <PrivateRoute path="/register" roles={["admin"]} component={Register} />
        {/*this doesn't work :-( */}
        {/* <PrivateRoute path="/admin" roles={["admin"]}>
          <Admin />
        </PrivateRoute> */}
        {/* Route without except: ------------------------- */}
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
