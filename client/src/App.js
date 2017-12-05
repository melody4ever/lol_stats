import React, { Component } from 'react';
import Timestamp from 'react-timestamp';
import SearchBar from 'react-search-bar';
import logo from './logo.svg';
import './App.css';
var moment = require('moment');

class App extends Component {
  state = {matches:[], metadata:{}, suggestions:[]}
  
  handleSearch(input) {
    this.setState({"matches":[],metadata:{}})
    fetch('/matches/account/'+input+'/0')
      .then(res => res.json())
      .then(data => this.setState({matches:data.matches, metadata:data.metadata}))
      .catch(error => console.error(error));
  }

  handleClear() {}
  handleChange() {}

  handleMatchDetail(gameId){
    fetch('/matches/game/'+ gameId)
      .then(res => res.json())
      .then(data => {
        var matches = this.state.matches;
        var match = matches.filter(m => m.gameId === gameId)[0];
        var idx = matches.indexOf(match);
        var details = data.match;
        // retrieve player information from match details.
        var accountId = this.state.metadata.accountId
        var participantIdentity = details.participantIdentities.filter(pi=>pi.player.accountId === accountId)[0]
        var participant = details.participants.filter(p=>p.participantId === participantIdentity.participantId)[0]
        var teamId = participant.teamId
        details["accountId"] = accountId;
        details["participant"] = participant;
        details["teamId"] = teamId;
        match["details"] = details;

        matches[idx] = match;
        this.setState({matches});
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">League of Legends Stats Search</h1>
        </header>
        <SearchBar
          autoFocus
          renderSearchButton
          placeholder="input name or id"
          onChange={input => this.handleChange(input)}
          onClear={() => this.handleClear()}
          suggestions={this.state.suggestions}
          onSearch={e => this.handleSearch(e)}
        />
        {this.state.matches.length > 0 &&
          <h1>Matches</h1>
        }
        {this.state.matches.map(match=>
          <div key={match.gameId}>
            <button onClick={() => this.handleMatchDetail(match.gameId)}>Game ID:{match.gameId}, Champion ID:{match.champion}, Date: <Timestamp time={match.timestamp/1000} format='full' includeDay /></button>
            {match.details &&
              <div align="center">Match Details
              <table>
                <tbody>
                <tr>
                  <th>Duration</th>
                  <td>{moment.utc(match.details.gameDuration*1000).format("HH:mm:ss")}</td>
                  <th>Result</th>
                  <td>{match.details.participant.stats.win?'WIN':'LOSE'}</td>
                  <th>KDA</th>
                  <td>{match.details.participant.stats.kills} | {match.details.participant.stats.deaths} | {match.details.participant.stats.assists}</td>
                </tr>
                <tr>
                  <th>Level</th>
                  <td>{match.details.participant.stats.champLevel}</td>
                  <th>Rune #1</th>
                  <td>{match.details.participant.spell1Id}</td>
                  <th>Rune #2</th>
                  <td>{match.details.participant.spell2Id}</td>
                </tr>
                <tr>
                  <th>Items</th>
                  <td>{match.details.participant.stats.item0}</td>
                  <td>{match.details.participant.stats.item1}</td>
                  <td>{match.details.participant.stats.item2}</td>
                  <td>{match.details.participant.stats.item3}</td>
                  <td>{match.details.participant.stats.item4}</td>
                  <td>{match.details.participant.stats.item5}</td>
                  <td>{match.details.participant.stats.item6}</td>
                </tr>
                <tr>
                  <th>Team 1</th>
                  {match.details.participantIdentities.filter(
                    pi=>match.details.participants.filter(
                      p=>p.participantId === pi.participantId)[0].teamId === 100)
                  .map(pi=>
                    <td key={pi.participantId}>{pi.player.summonerName}</td>
                  )}
                  <td></td>
                  <td>{match.details.teamId === 100?'*':' '}</td>
                </tr>
                <tr>
                  <th>Team 2</th>
                  {match.details.participantIdentities.filter(
                    pi=>match.details.participants.filter(
                      p=>p.participantId == pi.participantId)[0].teamId === 200)
                  .map(pi=>
                    <td key={pi.participantId}>{pi.player.summonerName}</td>
                  )}
                  <td></td>
                  <td>{match.details.teamId === 200?'*':' '}</td>
                </tr>
                </tbody>
              </table>
              </div>
            }
          </div>
        )}
      </div>
    );
  }
}

export default App;
