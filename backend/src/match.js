const queryString = require('query-string');
const axios = require('axios')

class Match {
  constructor(matchId) {
    this.matchId = matchId
    this.matchData = {}
  }

  async load(cb) {
    const url = `https://na1.api.riotgames.com/lol/match/v3/matches/${this.matchId}`
    const query = queryString.stringify({
        api_key: process.env.RIOT_API_KEY,
    })
    console.log(`${url}?${query}`);
    axios.get(`${url}?${query}`).then(resp => cb(resp.data));
  }
}

module.exports = Match;