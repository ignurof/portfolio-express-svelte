

// Fetches all public scrapped quotes from Kanye using https://api.kanye.rest/ { quote: "text" }

// Asyncronous method constant
const GetQuote = async() => {
    let response = await fetch("https://api.kanye.rest/");
    let data = await response.json();

    console.log(data);

    return "cool quote bro";
}

module.exports = GetQuote;