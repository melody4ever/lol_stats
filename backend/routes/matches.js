var express = require('express');
var router = express.Router();
var Matchlist = require('../src/matchlist');

router.get('/:summonerId/:beginIndex', function(req, res, next){
    const summonerId = parseInt(req.params.summonerId)
    const beginIndex = parseInt(req.params.beginIndex)

    try {
        const matchlist = new Matchlist(summonerId, beginIndex)
        matchlist.load(function(data){
            //console.log('C',data.matchlist);
            //console.log('E',data.metadata);
            res.send(JSON.stringify({
                matches: data.matches,
                metadata: Object.assign({}, data.metadata, {summonerId, beginIndex}),
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