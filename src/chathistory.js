let chatHistory = [];

const GetChatHistory = () => {
    return chatHistory;
}

const UpdateChatHistory = (newChatLog) => {
    // Append to list
    chatHistory.push(newChatLog);
}

module.exports = {
    UpdateChatHistory,
    GetChatHistory
};