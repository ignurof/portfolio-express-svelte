const fs = require("fs");

// FIXME: First of all, add costum command for new colored thing
// This is where GLOBAL CHAT HISTORY lives on the server
let chatJSON = {
    "chatHistory": [""]
}

// This is a frontend method that im also using here to do the template SSR
const GetChatText = () => {
    let text = "";

    // Iterate over each item in history and add that to the chatLog string
    chatJSON.chatHistory.forEach(element => {
        // Fix for the first empty index that creates a whitespace in the top of chatbox
        // TODO: Gör så att online status kollas ifall jag är aktiv på admin sidan?
        if(element === "") {
            element = "<div style='color: #8c6f51; margin: 0 auto; width: 50%; text-align: center;'>Ignurof is currently <span style='color: red;'>OFFLINE</span></div>"; 
        }

        text += element + "<br />";
    });

    return text;
}

const GetChatHistory = () => {
    return chatJSON.chatHistory;
}

const UpdateChatHistory = (newChatLog) => {
    // Append to list
    chatJSON.chatHistory.push(newChatLog);

    // Overwrite current file and use the server var chatHistory as reference
    OverwriteChatJSON(chatJSON.chatHistory);
}

const OverwriteChatJSON = (inputHistory) => {
    // Take the input param and feed it into the chatHistory by overwriting it
    chatJSON.chatHistory = inputHistory;
    // Convert from JSON Object to JSON string
    let data = JSON.stringify(chatJSON);

    // Overwrites the file with new data
    fs.writeFile("assets/chat.json", data, (err) => {
        if(err) { return console.error("Could not write to chat file"); }

        console.log("Updated chat.json");
    });
}

const CreateChatJSON = () => {
    // Take current chatHistory JSON Object and stringify into data
    let data = JSON.stringify(chatJSON);

    // Create file
    fs.writeFile("assets/chat.json", data, (err) => {
        if(err) { return console.error("Could not write to chat file"); }

        console.log("Created chat.json");
    });
}

const ReadChatJSON = () => {
    fs.readFile("assets/chat.json", (err, data) => {
        if(err) { return console.error("Could not read to chat file"); }

        // Converts back from string into JSON Object
        data = JSON.parse(data);

        // Update chatHistory values with data
        chatJSON.chatHistory = data.chatHistory;
    });
}

const InitChatJSON = () => {
    // Check if file exist
    fs.stat("assets/chat.json", (err, stat) => {
        if(err == null){
            // If file exist we need to read the JSON file
            console.log("Read chat.json");
            ReadChatJSON();
        } else if(err.code === "ENOENT"){
            // If file does not exist init the JSON file
            console.error("Init chat.json");
            // Create the about.json file
            CreateChatJSON();
        } else {
            throw err;
        }
    });
}

module.exports = {
    UpdateChatHistory,
    GetChatHistory,
    InitChatJSON,
    GetChatText
};