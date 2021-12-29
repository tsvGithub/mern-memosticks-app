import React from "react";
import { Route, Redirect } from "react-router-dom";

//global state
import { useGlobalContext } from "../context";

//to protect Components(Videos & Admin) that user
//need to be logged in for
//-------------------------
//pass in props {stuff: Component, array roles and other rest props}
const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  //pull out from global state
  const { isAuthenticated, user } = useGlobalContext();
  console.log(`isAuthenticated:`, isAuthenticated);
  return (
    // pass as props {spred ...rest} in Route component
    <Route
      {...rest}
      /*dynamic render: */
      render={(props) => {
        // console.log(props);
        //check global state for isAuthenticated
        //------------------------
        //if not authenticated -> Redirect to Login
        //from:props.location => where this user is coming from
        if (!isAuthenticated) {
          console.log("Not authenticated");
          return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
        }
        //-------------------
        //user is authenticated:
        //check if the user has a correct role
        //This role comes from App.js:
        //<PrivateRoute path="/dashboard" roles={["user", "admin"]} component={Dashboard} />
        //<PrivateRoute path="/admin" roles={["admin"]} component={Admin} />
        //if not role='admin' nor "user" => redirect to Home
        //user.role === global state
        // if (!roles.includes(user.role)) {
        // if (!roles.includes("admin" || "user")) {
        if (!user.role) {
          // console.log(roles.includes("admin" || "user"));
          // if (user.role === "") {
          // if (user.role !== "admin" || user.role !== "user") {
          console.log(user.role);
          // roles.map((role) => console.log(role));
          console.log("No permissions granted");

          return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
        }
        //-----------------------------
        //if user is authenticated & has correct role:
        //return Component that was being passed in
        console.log("return Component with ...props");
        // console.log(roles.includes(user.role));
        // console.log(Component);
        // console.log(props);
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
