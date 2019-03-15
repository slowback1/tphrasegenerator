var Twitter = require('twitter');
var express = require('express');
var config = require('./config.js');
var processWords = require('./process.js');
const port = process.env.PORT || (8080);
var client = new Twitter({
    consumer_key: config.api_key,
    consumer_secret: config.api_secret,
    access_token_key: config.access_token,
    access_token_secret: config.access_secret
});
let response = [];
const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.options("/", (req, res) => {
    res.send("allowed");
});
app.post("/", (req,res) => {
    console.log(req.query.user);
    let user = req.query.user;
    client.get('statuses/user_timeline', {screen_name: user, count: 200, include_rts: false}).then(function(tweet) {
        let tweetArr = [];
        tweet.map((t) => {
          tweetArr.push(t.text);
        });
        let wordObj = {};
        tweetArr.map((twe) => {
            let sArr = twe.split(" ");
            sArr.map((woord) => {
                word = woord.toLowerCase();
                if(!word.startsWith("http") && !word.startsWith('https')) {
                    if(word in wordObj) {
                        wordObj[word] += 1;
                    }  else {
                        wordObj[word] = 1;
                    }
                }
            });
        });
        result = processWords(wordObj);
        res.send({text: result});
    }).catch(function(error) {
        res.send({text: "Could not find user, check your spelling"});
        throw error;
    });
    });
app.listen(port, function() {
    console.log('server is running on port' + port);
});