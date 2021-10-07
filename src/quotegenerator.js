const request = require('request');

// Fetches all public scrapped quotes from Kanye using https://api.kanye.rest/ { quote: "text" }

// Asyncronous method constant
const GetQuote = async() => {
    request('https://api.kanye.rest/', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body.url);
        console.log(body.explanation);
    });
}

module.exports = GetQuote;