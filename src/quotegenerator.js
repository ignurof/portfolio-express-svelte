import { response } from "express";
import fetch from "node-fetch";

// Fetches all public scrapped quotes from Kanye using https://api.kanye.rest/ { quote: "text" }

// Asyncronous method constant
const GetQuote = async() => {
    let response = await fetch("https://api.kanye.rest/");
    let data = await response.json();

    console.log(data);
}

module.exports = GetQuote;