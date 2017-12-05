const queryString = require('query-string');
const axios = require('axios')

class Matchlist {
  constructor(accountId, beginIndex=0) {
    this.accountId = accountId
    this.metadata = {}
    this.matchlist = []
    this.beginIndex = beginIndex
  }

  async load(cb) {
    var isnum = /^\d+$/.test(this.accountId);
    if (!isnum){
        //get accountId by name if necessary
        const url = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${this.accountId}`
        const query = queryString.stringify({
            api_key: process.env.RIOT_API_KEY
        })
        console.log(`${url}?${query}`);
        let { data: {accountId} } = await axios.get(`${url}?${query}`)
        console.log('accountId',accountId);
        this.accountId = accountId;
    }
    const url = `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${this.accountId}/recent`
    const query = queryString.stringify({
        beginIndex: this.beginIndex,
        api_key: process.env.RIOT_API_KEY,
    })
    console.log(`${url}?${query}`);

    let { data: { matches = [], startIndex, endIndex, totalGames } } = await axios.get(`${url}?${query}`)
    this.metadata = {startIndex, endIndex, totalGames, accountId:this.accountId}
    this.matchlist = matches

    //console.log('A',matches)
    //console.log('B',totalGames)

    cb({matches:matches, metadata: this.metadata})
  } 
}

module.exports = Matchlist;