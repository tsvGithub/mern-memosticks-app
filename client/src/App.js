import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import Message from "./components/Message";
import Register from "./components/Register";

import { AppProvider } from "./context";
import "./App.css";

//VII (VI context; VIII -> Home.js)
function App({ history }) {
  return (
    <>
      {/* <AppProvider> */}
      {/* <Router> */}
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/menu">
          <Menu />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/message">
          <Message />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      {/* </Router> */}
      {/* </AppProvider> */}
    </>
  );
}

export default App;
