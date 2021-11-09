const dotenvResult = require('dotenv').config(); // Loads dotenv file into server usage: process.env.NAME

if(dotenvResult.error){
    throw dotenvResult.error;
}

// Dependency imports
const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const md5 = require("blueimp-md5");
const cookieParser = require('cookie-parser');

const authwhitelist = require("./authwhitelist.js");
const projectlist = require("./projectlist.js");
const aboutcontent = require("./aboutcontent.js");

// Parse cookies so they can be interacted with
router.use(cookieParser());

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
// This means I dont have to JSON.parse in this router. Also that didnt work, I had to use this Express alternative
// Now I can do res.json(JSONOBJHERE)
router.use(express.json());

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Ran the Adminpanel router @ Time: ', Date.now());
    next();
});

// define the admin page route
router.get('/', (req, res) => {
    res.redirect("/admin/about");
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
    bcrypt.compare(req.body.ePassWord, process.env.SECUREHASH, (err, result) => {
        if(err) return console.error("ERROR! There is no SECUREHASH.");

        if(!result){
            // Early return from the method if error
            responseObj.status = "invalidpw";
            console.error("Invalid login attempt!");
            return res.json(responseObj);
        }

        // We only end up here if successfull login
        responseObj.status = "OK";
        // Reset authWhitelist so that this new user is the only allowed auth. TODO: Should be timer based instead but since only one admin account is a thing, this is ok
        authwhitelist.ResetAuthList();
        // Adds the user to authWhitelist
        responseObj.canAdmin = GenerateTimeStamp();
        console.log("Successfull login attempt! :)");
        res.cookie("auth", responseObj.canAdmin);
        res.json(responseObj);
    });
});

router.get("/about", (req, res) => {
    if(!VerifyUserAuth(req.cookies.auth)){
        // False
        console.error("Failed Admin/About GET route attempt");
        return res.render("private/admin", {
            // Props here
                
            });
    }

    // Success
    console.log("Admin/About route used");
    res.render("private/aboutadmin", {
        aboutContent: aboutcontent.GetAboutText(),
    });
});

router.post("/about/edit", (req, res) => {
    if(!VerifyUserAuth(req.cookies.auth)){
        // False
        console.error("Failed Admin/About POST route attempt");
        return res.render("private/admin", {
            // Props here
                
            });
    }

    // Success
    console.log("Admin/About POST route used");
    aboutcontent.UpdateAboutText(req.body);
});

router.get("/projects", (req, res) => {
    if(!VerifyUserAuth(req.cookies.auth)){
        // False
        console.error("Failed Admin/Projects GET route attempt");
        return res.render("private/admin", {
            // Props here
            
        });
    }

    // Success
    console.log("Admin/Projects route used");
    res.render("private/projectsadmin", {
        projectList: projectlist.GetProjectList(),
    });
});

router.post("/projects/delete/:index", (req, res) => {
    if(!VerifyUserAuth(req.cookies.auth)){
        // False
        console.error("Failed Admin/Projects/Delete POST route attempt");
        return res.render("private/admin", {
            // Props here
            
        });
    }
    //console.log(req.params.index);
    // Success
    projectlist.DeleteProject(req.params.index);

    let responseObj = {
        "status": "OK",
        "projectList": projectlist.GetProjectList()
    };
    // Auto parsed by Express.json middleware
    res.json(responseObj);
});

router.post("/projects/edit/:index", (req, res) => {
    if(!VerifyUserAuth(req.cookies.auth)){
        // False
        console.error("Failed Admin/Projects/Delete POST route attempt");
        return res.render("private/admin", {
            // Props here
            
        });
    }
    //console.log(req.body.title);
    // Success
    projectlist.EditProject(req.params.index, req.body.title, req.body.content, req.body.tags, req.body.images, req.body.links);

    let responseObj = {
        "status": "OK",
        "projectList": projectlist.GetProjectList()
    };
    // Auto parsed by Express.json middleware
    res.json(responseObj);
});

router.post("/projects/add", (req, res) => {
    if(!VerifyUserAuth(req.cookies.auth)){
        // False
        console.error("Failed Admin/Projects/Delete POST route attempt");
        return res.render("private/admin", {
            // Props here
            
        });
    }

    projectlist.AddProject(req.body.title, req.body.content, req.body.tags, req.body.images, req.body.links);

    let responseObj = {
        "status": "OK",
        "projectList": projectlist.GetProjectList()
    };
    // Auto parsed by Express.json middleware
    res.json(responseObj);
})

// Generate md5 hash from hardcore password and then encrypt and store on servervar
/* FIXME: Only used for generating the pw hash (password -> md5 -> bcrypt)
const GenerateAdminPassword = () => {
    let myPw = "";
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
*/

// Generates a auth timestamp that can be used to verify access to admin routes
const GenerateTimeStamp = () => {
    // Get current time
    let dateTime = Date.now();
    dateTime = md5(dateTime);
    authwhitelist.AddToAuth(dateTime);
    return dateTime;
}

// Used to lock admin routes behind auth
const VerifyUserAuth = (uAuth) => {
    let userIsAdmin = false;
    let authWhitelist = authwhitelist.GetAuthList();

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