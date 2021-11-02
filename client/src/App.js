import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

// import List from "./components/List";
// import Form from "./components/Form";
import Menu from "./components/Menu";
import Dashboard from "./components/Dashboard";
import List from "./components/List";

import { AppProvider } from "./context";
import "./App.css";

function App() {
  return (
    //wrap whole app into AppProvider
    <AppProvider>
      <Router>
        <Switch>
          {/* <Route exact path="/all">
          <List />
        </Route>
        <Route exact path="/new">
          <Form />
        </Route> */}
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/">
            <Menu />
          </Route>
          <Route exact path="/:id">
            <List />
          </Route>
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
