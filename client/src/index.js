import React from "react";
import ReactDOM from "react-dom";
//React Router------------
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
//Context Provider from Context.js------
import { AppProvider } from "./context";

ReactDOM.render(
  // <Router>
  //   <App />,
  // </Router>,

  //wrap whole app into AppProvider
  <Router>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>,
  //in that scenario 'useHistory' won't work:
  // <AppProvider>
  //   <Router>
  //     <App />
  //   </Router>
  // </AppProvider>,
  document.getElementById("root")
);
