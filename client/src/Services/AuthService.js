//'AuthService' contains fetch requests through endpoints that
//created in BE

//V (IV 'routes' BE; VI -> cobtext.js )
//1
export default {
  //----------------------------------
  //Object contains a buch of convenience functions:

  //-------------------------------------------
  //1a REGISTER
  //'user'===username, password, role
  register: (user) => {
    // console.log(user);
    return (
      //endpoint ("/user/register"
      fetch("/user/register", {
        method: "POST",
        //'body' need send as JSON => convert to JSON a 'user'
        body: JSON.stringify(user),
        //'headers' let BE to know what is sending
        headers: {
          "Content-Type": "application/json",
        },
      })
        //promise returns a response
        .then((res) => res.json())
        //get data that parsed
        // .then((data) => console.log(`AuthService response data: ${data}`))
        .then((data) => data)
    );
  },
  //-------------------------------------------
  // 1b LOGIN
  //'user'===username, password, role
  login: (user) => {
    // console.log(user);
    //configuration for fetch:
    return fetch(
      //endpoint
      "/user/login",
      //options
      {
        //post request
        method: "POST",
        //'body' need send as JSON => convert to JSON a 'user'
        body: JSON.stringify(user),
        //'headers' let BE to know what is sending
        headers: {
          "Content-Type": "application/json",
        },
      }
      //promise returns a response
    ).then((res) => {
      //if authorized:
      if (res.status !== 401) {
        //get data that parsed now
        return res.json().then((data) => data);
      }
      //if not authorized
      else {
        //return false & empty strings for 'user'
        return { isAuthenticated: false, user: { username: "", role: "" } };
      }
    });
  },
  //-----------------------------------
  //1c LOGOUT
  logout: () => {
    return (
      fetch("/user/logout")
        //get response back and parse it
        .then((res) => res.json())
        //parsed data
        .then((data) => data)
    );
  },

  //-------------------------------------
  //1d 'user' stays Authenticated
  //to persist authentication === сохранить аутентификацию
  //once user is logeed in we set a 'state' (REACT Component)
  // to let App know that user has been authenticated.
  //When you close React app that state is gone.

  //So isAuthenticated syncs BE & FE together and
  //when user visits site again => stays logged in
  isAuthenticated: () => {
    return (
      fetch("/user/authenticated")
        //get response
        .then((res) => {
          // if authentication fails, Passport will respond with a 401 Unauthorized status,
          //and any additional route handlers will not be invoked.
          //If authentication succeeds, the 'next' handler will be invoked and the
          //'req.user' property will be set to the authenticated user.
          if (res.status !== 401) {
            return res.json().then((data) => data);
          } //if passport is sending 401 status code:
          else {
            //set authentication to false, as user is unauthorized
            //set 'user' object to empty string
            return { isauthenticated: false, user: { username: "", role: "" } };
          }
        })
    );
  },
};
