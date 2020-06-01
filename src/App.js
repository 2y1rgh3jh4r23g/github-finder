import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import axios from "axios";
import "./App.css";

class App extends Component {
  // global app state
  state = {
    users: [],
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
    const { users, loading, alert } = this.state;

    return (
      <div className='App'>
        <Navbar />
        <div>
          <Alert alert={alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
