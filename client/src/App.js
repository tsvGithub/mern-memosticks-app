import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Dashboard from "./components/Dashboard";
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
        <Route path="/register">
          <Register />
        </Route>

        {/* Private Routes: ------------------------- */}
        {/* prop roles is [array of the roles that are able to acces to Menu, Dashboard (videos) & Admin component] */}
        <PrivateRoute path="/menu" roles={["user, admin"]}>
          <Menu />
        </PrivateRoute>
        <PrivateRoute path="/dashboard" roles={["user, admin"]}>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/admin" roles={["admin"]}>
          <Admin />
        </PrivateRoute>
        {/* Route without except: ------------------------- */}
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
