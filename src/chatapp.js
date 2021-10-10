const express = require("express");
const router = express.Router();

const app = express();

// Socket IO - Realtime chat
var http = require('http').Server(app);
var io = require('socket.io')(http);

const chathistory = require("./chathistory.js");

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Ran the Chatapp @ Time: ', Date.now());
    next();
});

// Realtime chat
io.on("connection", () => {
    console.log("User has connected to live chat");
});

router.get("/", (req, res, next) => {
    // Send the active chatLog back to the client
    res.send(chathistory.GetChatLog());
});

// Watch for incoming POST requests on this router
router.post("/:message", (req, res, next) => {
    // Get the param
    console.log(req.params.message);
    // TODO: Sanitize data
    
    // Update some array that will be used to store previous messages on server and render it on the page on og route
    chathistory.UpdateChatHistory(req.params.message);
    // Use socket.io to send realtime message
    io.emit("message", chathistory.GetChatLog())
    res.sendStatus(200);
});

module.exports = router;