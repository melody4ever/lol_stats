import React, { Component } from 'react';

class MatchDetail extends React.Component {
  state = {matchInfo:{}, matchDetail:{}}
  

  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Search
      </button>
    );
  }
}

export default SearchButton;