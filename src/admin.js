const express = require("express");
const cors = require("cors");
const router = express.Router();

const bcrypt = require("bcrypt");
const md5 = require("blueimp-md5");

const aboutcontent = require("./aboutcontent.js");

// TODO: STORE THIS SOMEWHERE REASONABLE YO!
let secureHash;

// CORS SETUP - This router acts as a new app so to speak, so the CORS here is independent from CORS in main server.js
let corsOptions = {
    "origin": 'http://admin.ignurof.xyz',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
// This means I dont have to JSON.parse in this router. Also that didnt work, I had to use this Express alternative
// Now I can do res.json(JSONOBJHERE)
router.use(express.json());

// Preflight request using corsOptions object, for all routes
router.use(cors(corsOptions))

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Ran the Adminpanel router @ Time: ', Date.now());
    next();
});

// define the home page route
// TODO: Detta borde vara en login sida av något slag
router.get('/', (req, res) => {
    res.render("private/admin", {
    // Props here
        
    });
});

// Edit the about content text using POST request
// Here I can grab :content like a regular param, very nice
router.post('/about/:content', (req, res) => {
    console.log(req.params.content);
    aboutcontent.UpdateAboutText(req.params.content);
    // Send it back so frontend can do something with it
    res.send(req.params.content);
});

router.post("/login", (req, res) => {
    console.log(req.body);

    let responseObj = {
        "status": "",
        "canAdmin": "NO"
    };

    // Hardcore admin username
    if(req.body.userName != "troll"){
        responseObj.status = "invaliduser";
        // Early return if username is not correct
        return res.json(responseObj);
    }

    // Compare the client password with the secure hash to see if password is correct
    bcrypt.compare(req.body.ePassWord, secureHash, (err, result) => {
        if(err) return console.error("ERROR! There is no secureHash.");

        if(!result){
            // Early return from the method if error
            responseObj.status = "invalidpw";
            console.error("Invalid login attempt!");
            return res.json(responseObj);
        }

        // We only end up here if successfull login
        responseObj.status = "okloginpw";
        responseObj.canAdmin = GenerateTimeStamp();
        console.log("Successfull login attempt! :)");
        res.json(responseObj);
    });
});

// Used to dev purposes only and will be removed. FIXME: REMOVE THIS BRUV
router.get("/newadmin", (req, res) => {
    let myPw = "volSheb";
    // Encrypt with md5 to match client
    myPw = md5(myPw);

    // Test encrypt - Take password and encrypt it, then use this hash to compare to regular password if its correct
    // Can also compare two hashes against eachother to see if they were created with the same password ( FIXME:I THINK ? TODO: Tested, it works )
    bcrypt.hash(myPw, 10, (err, hash) => {
        // Store the hash somewhere
        console.log(hash);
        secureHash = hash;
    });
});

// Generates a auth timestamp that can be used to verify access to admin routes
const GenerateTimeStamp = () => {
    // Get current time
    let dateTime = Date.now();
    dateTime = md5(dateTime);
    return dateTime;
}
  
module.exports = router;