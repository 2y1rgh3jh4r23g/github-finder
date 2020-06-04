import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

import "./App.css";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                {/* Route for home page */}
                <Route
                  exact
                  path='/'
                  render={(props) => {
                    return (
                      <Fragment>
                        <Search />
                        <Users />
                      </Fragment>
                    );
                  }}
                />
                {/* Route for about page */}
                <Route exact path='/about' component={About} />
                {/* Route for user page */}
                <Route exact path='/user/:login' component={User} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  );
};

export default App;
