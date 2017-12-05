const express = require('express');
const app = express();
const Matchlist = require('./matchlist');

const https = require('https');

app.get('/recent_matches/:summonerId/:beginIndex', function(req, res) {
    const summonerId = parseInt(req.params.summonerId)
    const beginIndex = parseInt(req.params.beginIndex)

    try {

        const matchlist = new Matchlist(summonerId, beginIndex)
        matchlist.load(function(data){
            console.log('C',data.matchlist);
            console.log('E',data.metadata);
            res.send(JSON.stringify({
                matchlist: data.matchlist,
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






app.get('/wines/:id', function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
});

app.get('/wines', function(req, res) {
    const url = `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/31649572/recent?beginIndex=0&api_key=RGAPI-b9875241-d565-40bf-80f3-240d67f96e09`
    https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
     
        resp.on('end', () => {
            console.log(JSON.parse(data).explanation);
            res.send(JSON.parse(data));
        });
     
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

app.listen(3000);
console.log('Listening on port 3000...');