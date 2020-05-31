import React, { Component } from "react";

class Search extends Component {
  state = {
    text: "",
  };

  // no need to bind this because we're using arrow functions
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.text);
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
