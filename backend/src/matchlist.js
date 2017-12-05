const queryString = require('query-string');
const axios = require('axios')

class Matchlist {
  constructor(summonerId, beginIndex=0) {
    this.summonerId = summonerId
    this.metadata = {}
    this.matchlist = []
    this.beginIndex = beginIndex
  }

  async load(cb) {
    const url = `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${this.summonerId}/recent`
    const query = queryString.stringify({
        beginIndex: this.beginIndex,
        api_key: process.env.RIOT_API_KEY,
    })
    console.log(`${url}?${query}`);

    let { data: { matches = [], startIndex, endIndex, totalGames } } = await axios.get(`${url}?${query}`)
    this.metadata = {startIndex, endIndex, totalGames}
    this.matchlist = matches

    //console.log('A',matches)
    //console.log('B',totalGames)

    cb({matches:matches, metadata: this.metadata})
  } 
}

module.exports = Matchlist;