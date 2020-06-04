import React, { Fragment, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";

import GithubState from "./context/github/GithubState";

import "./App.css";

const App = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Get user's repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  // Clear users

  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({
      msg,
      type,
    });

    // make the alert disappear after 5 seconds
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              {/* Route for home page */}
              <Route
                exact
                path='/'
                render={(props) => {
                  return (
                    <Fragment>
                      <Search setAlert={showAlert} />
                      <Users />
                    </Fragment>
                  );
                }}
              />
              {/* Route for about page */}
              <Route exact path='/about' component={About} />
              {/* Route for user page */}
              <Route
                exact
                path='/user/:login'
                render={(props) => {
                  return (
                    <User
                      {...props}
                      getUserRepos={getUserRepos}
                      repos={repos}
                    />
                  );
                }}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </GithubState>
  );
};

export default App;
