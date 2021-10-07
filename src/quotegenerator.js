const axios = require('axios');

// Fetches all public scrapped quotes from Kanye using https://api.kanye.rest/ { quote: "text" }

let theQuote;

const GetQuote = () => {
    axios.get("https://api.kanye.rest/").then((response) => {
        // data = Body response aka auto converts to JSON by axios
        theQuote = response.data.quote;
        console.log(theQuote);
    }).catch((error) => {
        console.error(error);
    }).then(() => {
        // The last .then always happens regardsless of outcome
        console.log("GetQuote() completed");
    });
}

const TheQuote = () => {
    return theQuote;
}

module.exports = {
    TheQuote,
    GetQuote
};