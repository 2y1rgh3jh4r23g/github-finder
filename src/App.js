import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

class App extends Component {
  // global app state
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  };

  // Search GitHub users
  searchUsers = async (text) => {
    // the app is loading
    this.setState({
      loading: true,
    });
    // wait for the response
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // the app has loaded
    this.setState({ users: res.data.items, loading: false });
  };

  // Get single GitHub user
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false });
  };

  // Clear users
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg,
        type,
      },
    });

    // make the alert disappear after 5 seconds
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    // destructure state
    const { users, user, loading, alert } = this.state;

    return (
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <div>
            <Alert alert={alert} />
            <Switch>
              {/* Route for home page */}
              <Route
                exact
                path='/'
                render={(props) => {
                  return (
                    <Fragment>
                      <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={users.length > 0 ? true : false}
                        setAlert={this.setAlert}
                      />
                      <Users loading={loading} users={users} />
                    </Fragment>
                  );
                }}
              />
              {/* Route for about page */}
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => {
                  return <User {...props} getUser={this.getUser} user={user} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
