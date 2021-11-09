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

const authblocklist = require("./authblocklist.js");
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
    console.log('ADMIN page @ Time: ', Date.now());
    next();
});

// define the admin page route
router.get('/', (req, res) => {
    res.redirect("/admin/about");
});

router.post("/login", async(req, res) => {
    let responseObj = {
        "status": "",
        "canAdmin": "NO"
    };

    // Block user from login attempt if they have failed too many times
    try{
        let blockedStatus = await authblocklist.IsUserBlocked(req.body.userName);
    } catch(e){
        // This is what happens when blockedStatus is true, aka UserIsBlocked
        console.error("BLOCKED LOGIN ATTEMPT: " + e);
        // Send the value so frontend can use it
        responseObj.status = "FAIL";
    }

    let matchUsername = false;
    if(req.body.userName === "ignu"){
        matchUsername = true;
    }

    let matchPassword = await bcrypt.compare(req.body.ePassWord, process.env.SECUREHASH);

    // Invalid password check
    if(!matchPassword || !matchUsername){
        // If hacker pass the username check, it should block if pw is incorrect
        authblocklist.AddToBlock(req.body.userName);

        // Early return response to user if failed check
        console.error("Invalid login attempt!");
        return res.json(responseObj);
    }

    // If successful login on blocked username, unblock it
    if(responseObj.status === "FAIL"){
        console.log("USER UNBLOCKED: " + req.body.userName);
        authblocklist.RemoveUserBlock(req.body.userName);
    }

    // We only end up here if successfull login
    // Set new status, overwriting possible failed status
    responseObj.status = "OK";
    // Reset authWhitelist so that this new user is the only allowed auth. TODO: Should be timer based instead but since only one admin account is a thing, this is ok
    authwhitelist.ResetAuthList();
    // Adds the user to authWhitelist
    responseObj.canAdmin = GenerateTimeStamp();
    console.log("Successfull login attempt! :)");
    res.cookie("auth", responseObj.canAdmin);
    res.json(responseObj);
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
// Used for generating the pw hash (password -> md5 -> bcrypt)
// Also used it for username
/*const GenerateAdminPassword = () => {
    let myPw = "ignu";
    // Encrypt with md5 to match client
    myPw = md5(myPw);

    // Test encrypt - Take password and encrypt it, then use this hash to compare to regular password if its correct
    // Can also compare two hashes against eachother to see if they were created with the same password ( FIXME:I THINK ? TODO: Tested, it works )
    bcrypt.hash(myPw, 10, (err, hash) => {
        // Store the hash somewhere
        console.log(hash);
    });
}*/


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