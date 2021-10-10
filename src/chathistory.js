// FIXME: First of all, add costum command for new colored thing
// This is where GLOBAL CHAT HISTORY lives on the server
let chatHistory = [];
let chatLog;

// Returns the chatLog string, used in server.js to render the values onto page
const GetChatHistory = () => {
    return chatLog;
}

const UpdateChatLog = () => {
    // Reset chatlog on update so it doesnt just keep adding onto it
    chatLog = "";

    // Iterate over each item in history and add that to the chatLog string
    chatHistory.forEach(element => {
        chatLog += element + "<br />";
    });
}

const UpdateChatHistory = (newChatLog) => {
    // Append to list
    chatHistory.push(newChatLog);
    // Then make sure to update the chatLog string that gets read by server
    UpdateChatLog();
}

module.exports = {
    UpdateChatHistory,
    GetChatHistory
};