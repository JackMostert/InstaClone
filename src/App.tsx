import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import Feed from "./Pages/Feed";
import View from "./Pages/View";
import Profile from "./Pages/Profile";
import { withCookies } from "react-cookie";
import Cookies from "universal-cookie";
import Unauth from "./Pages/Unauth";
const cookies: any = new Cookies();

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Route
          exact
          path="/"
          render={props => <Home {...props} cookie={cookies} />}
        />
        <Route
          exact
          path="/Unauth"
          render={props => <Unauth {...props} cookie={cookies} />}
        />
        <Route
          exact
          path="/login"
          render={props => <Login {...props} cookie={cookies} />}
        />
        <Route
          exact
          path="/feed"
          render={props => <Feed {...props} cookie={cookies} />}
        />
        <Route
          exact
          path="/view:id"
          render={props => <View {...props} cookie={cookies} />}
        />
        <Route
          exact
          path="/profile"
          render={props => <Profile {...props} cookie={cookies} />}
        />
        <Route
          exact
          path="/register"
          render={props => <Register {...props} cookie={cookies} />}
        />
        <Route
          exact
          path="/forgotpassword"
          render={props => <ForgotPassword {...props} cookie={cookies} />}
        />
      </Router>
    </div>
  );
};

export default withCookies(App);
