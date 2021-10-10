const fs = require("fs");

// FIXME: First of all, add costum command for new colored thing
// This is where GLOBAL CHAT HISTORY lives on the server
let chatJSON = {
    "chatHistory": [""]
}
// The chatLog is a string composed of all the indexes in the chatHistory array
let chatLog = "";

// Returns the chatLog string, used in server.js to render the values onto page
const GetChatLog = () => {
    return chatLog;
}

const UpdateChatLog = () => {
    // Reset chatlog on update so it doesnt just keep adding onto it
    chatLog = "";

    // Iterate over each item in history and add that to the chatLog string
    chatJSON.chatHistory.forEach(element => {
        chatLog += element + "<br />";
    });
}

const UpdateChatHistory = (newChatLog) => {
    // Append to list
    chatJSON.chatHistory.push(newChatLog);
    // Then make sure to update the chatLog string that gets read by server
    UpdateChatLog();

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
        // Need to make sure the chatLog string is updated when server is booted or file is read
        UpdateChatLog();
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
    GetChatLog,
    InitChatJSON
};