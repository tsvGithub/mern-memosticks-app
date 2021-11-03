import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Dashboard from "./components/Dashboard";

import { AppProvider } from "./context";
import "./App.css";

function App() {
  return (
    //wrap whole app into AppProvider
    <AppProvider>
      <Router>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/">
            <Menu />
          </Route>
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
