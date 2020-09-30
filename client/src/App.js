import React from "react";
import { Link, Switch, Route } from "react-router-dom";

import List from "./components/List";
import Form from "./components/Form";

function App() {
  return (
    <div>
      <h1>My Memosticks</h1>
      <button>
        <Link to="/new">Add Memostick</Link>
      </button>
      <button>
        <Link to="/">All Memosticks</Link>
      </button>

      <Switch>
        <Route exact path="/">
          <List />
        </Route>
        <Route path="/new">
          <Form />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
