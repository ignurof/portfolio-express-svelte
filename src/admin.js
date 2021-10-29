const express = require("express");
const cors = require("cors");
const router = express.Router();

const aboutcontent = require("./aboutcontent.js");

// CORS SETUP - This router acts as a new app so to speak, so the CORS here is independent from CORS in main server.js
let corsOptions = {
    "origin": 'http://admin.ignurof.xyz',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

// Preflight request using corsOptions object, for all routes
router.use(cors(corsOptions))

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Ran the Adminpanel router @ Time: ', Date.now());
    next();
});

// define the home page route
// TODO: Detta borde vara en login sida av något slag
router.get('/', function (req, res) {
    res.render("private/admin", {
    // Props here
        
    });
});

// Edit the about content text using POST request
// Here I can grab :content like a regular param, very nice
router.post('/about/:content', function (req, res) {
    console.log(req.params.content);
    aboutcontent.UpdateAboutText(req.params.content);
    // Send it back so frontend can do something with it
    res.send(req.params.content);
});
  
module.exports = router;