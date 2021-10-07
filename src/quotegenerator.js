// Fetches all public scrapped quotes from Kanye using https://api.kanye.rest/ { quote: "text" }

// Asyncronous method constant
const GetQuote = async() => {
    // Make the fetch call and await the request response
    let request = await fetch("https://api.kanye.rest");

    // If fetch request gets OK status
    if(request.ok){
        let response = request.json();
        console.log(response);
        return response.quote;
    }

    // Successfull early returns means we should not end up here
    console.error("Something went wrong with the coolQuote request");
    return "error coolQuote";
}

module.exports = GetQuote;