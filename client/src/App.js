import React, { Component } from 'react';
import Timestamp from 'react-timestamp';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {matches:[], metadata:{}}
  
  componentDidMount() {
    fetch('/matches/31649572/0')
      .then(res => res.json())
      .then(data => this.setState({matches:data.matches, metadata:data.metadata}))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Matches</h1>
        {this.state.matches.map(match=>
          <div key={match.gameId}>Champion ID:{match.champion} Lane: {match.lane} Date: <Timestamp time={match.timestamp/1000} format='full' includeDay /></div>
        )}
      </div>
    );
  }
}

export default App;
