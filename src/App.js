import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";
import "./App.css";

class App extends Component {
  // global app state
  state = {
    users: [],
    loading: false,
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

  render() {
    // destructure state
    const { users, loading } = this.state;

    return (
      <div className='App'>
        <Navbar />
        <div>
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
