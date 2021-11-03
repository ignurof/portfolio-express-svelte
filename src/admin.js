const express = require("express");
const cors = require("cors");
const router = express.Router();

const bcrypt = require("bcrypt");
const md5 = require("blueimp-md5");
const cookieParser = require('cookie-parser');

const aboutcontent = require("./aboutcontent.js");

// TODO: STORE THIS SOMEWHERE REASONABLE YO!
let secureHash = "firstlogin";
let authWhitelist = []; // FIXME: This whitelist currently gets reset on server shutdown/crash

// CORS SETUP - This router acts as a new app so to speak, so the CORS here is independent from CORS in main server.js
let corsOptions = {
    "origin": 'http://admin.ignurof.xyz',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

// Parse cookies
router.use(cookieParser());

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
// This means I dont have to JSON.parse in this router. Also that didnt work, I had to use this Express alternative
// Now I can do res.json(JSONOBJHERE)
router.use(express.json());

// Preflight request using corsOptions object, for all routes
router.use(cors(corsOptions))

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Ran the Adminpanel router @ Time: ', Date.now());
    next();
});

// define the admin page route
router.get('/', (req, res) => {
    // Generate new admin password on first visit to admin route
    if(secureHash === "firstlogin") GenerateAdminPassword();

    res.render("private/admin", {
    // Props here
        
    });
});

router.post("/login", (req, res) => {
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
        responseObj.status = "OK";
        responseObj.canAdmin = GenerateTimeStamp();
        console.log("Successfull login attempt! :)");
        res.cookie("auth", responseObj.canAdmin);
        res.json(responseObj);
    });
});

router.get("/home", (req, res) => {
    if(!VerifyUserAuth(req.cookies.auth)){
        // False
        console.error("Failed admin/home GET route attempt");
        return res.redirect("/admin");
    }

    // TODO: Get the cookies from client and verify that auth token is correct like above, but with cookie

    console.log("Admin/Home route used");
    res.render("private/home", {
        myVar: "Hej",
    });
});

router.get('/about/', (req, res) => {
    if(!VerifyUserAuth(req.cookies.auth)){
        // False
        console.error("Failed admin/about route attempt");
        return res.redirect("/admin");
    }

    //console.log(req.params.content);
    //aboutcontent.UpdateAboutText(req.params.content);
    // Send it back so frontend can do something with it
    res.redirect("/");
});

// Generate md5 hash from hardcore password and then encrypt and store on servervar
const GenerateAdminPassword = () => {
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
}

// Generates a auth timestamp that can be used to verify access to admin routes
const GenerateTimeStamp = () => {
    // Get current time
    let dateTime = Date.now();
    dateTime = md5(dateTime);
    authWhitelist.push(dateTime);
    return dateTime;
}

// Used to lock admin routes behind auth
const VerifyUserAuth = (uAuth) => {
    let userIsAdmin = false;

    for(let x = 0; x < authWhitelist.length; x++){
        if(uAuth === authWhitelist[x]){
            userIsAdmin = true;
            // Early return if true
            return userIsAdmin;
        }
    }

    // Returns false if the early return didnt happen
    return userIsAdmin;
}
  
module.exports = router;