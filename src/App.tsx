import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import Feed from "./Pages/Feed";
import View from "./Pages/View";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={props => <Home {...props} />} />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route exact path="/feed" render={props => <Feed {...props} />} />
        <Route exact path="/view:id" render={props => <View {...props} />} />
        <Route
          exact
          path="/register"
          render={props => <Register {...props} />}
        />
        <Route
          exact
          path="/forgotpassword"
          render={props => <ForgotPassword {...props} />}
        />
      </Router>
    </div>
  );
};

export default App;
