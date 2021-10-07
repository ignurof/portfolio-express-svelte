const axios = require('axios');

// Fetches all public scrapped quotes from Kanye using https://api.kanye.rest/ { quote: "text" }

const GetQuote = () => {
    axios.get("https://api.kanye.rest/").then((response) => {
        console.log(response);
    }).catch((error) => {
        console.error(error);
    }).then(() => {
        // The last .then always happens regardsless of outcome
        console.log("Fetch completed or not, who knows");
    });
}

module.exports = GetQuote;