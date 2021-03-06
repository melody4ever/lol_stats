var express = require('express');
var router = express.Router();
var Match = require('../src/match');
var Matchlist = require('../src/matchlist');

router.get('/game/:gameId', function(req, res, next){
    const gameId = parseInt(req.params.gameId)
    try {
        const match = new Match(gameId)
        match.load(function(data){
            console.log('matchData:', data);
            res.send(JSON.stringify({
                match: data,
                status: { success: true },
            }))
        });

    } catch (err) {
        console.log(err)
        res.send(JSON.stringify({
            status: { success: false },
        }))
    }
});

router.get('/account/:accountId/:beginIndex', function(req, res, next){

    var accountId = req.params.accountId
    var beginIndex = req.params.beginIndex

    try {
        const matchlist = new Matchlist(accountId, beginIndex)
        matchlist.load(function(data){
            //console.log('C',data.matchlist);
            //console.log('E',data.metadata);
            res.send(JSON.stringify({
                matches: data.matches,
                metadata: data.metadata,
                status: { success: true },
            }))
        });

    } catch (err) {
        console.log(err)
        res.send(JSON.stringify({
            status: { success: false },
        }))
    }
});

module.exports = router;