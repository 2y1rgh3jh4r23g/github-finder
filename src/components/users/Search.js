import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: "",
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
  };

  // no need to bind this because we're using arrow functions
  onSubmit = (e) => {
    e.preventDefault();
    this.props.searchUsers(this.state.text);
    this.setState({ text: "" });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={this.state.text}
            onChange={this.onChange}
          />
          <input type='submit' value='Search' />
        </form>
      </div>
    );
  }
}

export default Search;
