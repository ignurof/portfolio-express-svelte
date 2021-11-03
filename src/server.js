// Webserver and Frontend
const express = require("express");
const cors = require("cors");
const svelteViewEngine = require("svelte-view-engine");
const config = require("../config");

// Site content
const filehandler = require("./filehandler.js");
const quotegenerator = require("./quotegenerator.js");
const aboutcontent = require("./aboutcontent.js");
const projectlist = require("./projectlist.js");
const fs = require("fs");

// Router
const admin = require("./admin.js");
const project = require("./project.js");
const about = require("./about.js");

// Server and View Engine declarations
let app = express();
let engine = svelteViewEngine(config.svelteViewEngine);
let { env, dir, type, buildDir } = config.svelteViewEngine;

// View Engine setup
app.engine(type, engine.render);
app.set("view engine", type);
app.set("views", dir);

// Verify runtime environment
if(env === "dev"){
    console.log("-- DEV --")
}

if (env === "prod"){
    console.log("-- PROD --")

    // Force HTTPS on Production
    app.use((req, res, next) => {
        if (!req.secure) {
            return response.redirect("https://" + req.headers.host + req.url);
        }
        next();
    });
}

// CORS SETUP
let corsOptions = {
    "origin": 'ignurof.xyz',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

// Preflight request using corsOptions object, for all routes
app.use(cors(corsOptions))

// Change this to fit your static content (Images, etc.)
app.use("/assets", express.static(buildDir));

// Render the response with props before responding
app.get("/", (req, res, next) => {
    /**
     * Props can be whatever you want and since
     * props can be fetched upon request, they'll
     * be SSR'd on the fly!
     */

    // Projects page should be default
    res.render("projects", {
        // Props here
        coolQuote: quotegenerator.TheQuote(),
        projectList: projectlist.GetProjectList(),
    });
});

// Admin endpoint
app.use("/admin", admin);

// About page
app.use("/about", about);

// Projects page
app.use("/project", project);

// Listen to requests
app.listen(config.port, () => {
    console.log("Server started on port http://localhost:" + config.port);

    // Run the quotegenerator FIXME: Disabled the kanye quotes as they are inappropriate but I want to keep the code for reference unti later
    //quotegenerator.GetQuote();

    // Init files (create if not exist, read if they do)
    filehandler.InitFile("about", aboutcontent.GetAboutText());
    filehandler.InitFile("projectlist", projectlist.GetProjectList());

    // debug project
    projectlist.AddProject(
        "Jetpack Doggo 1",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        ["C#", "Unity"],
        ["jp1/1.jpg", "jp1/2.jpg", "jp1/3.jpg", "jp1/4.jpg"],
        [ // Array with JSON Objects
            { href: "https://github.com/ignurof/jetpackdoggo", text: "Source Code"},
            { href: "https://ignurof.itch.io/jetpack-doggo", text: "Download"} 
        ]
    );
    projectlist.AddProject(
        "Jetpack Doggo 2",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        ["C#", "Unity"],
        ["jp2/1.jpg", "jp2/2.jpg", "jp2/3.jpg", "jp2/4.jpg"],
        [ // Array with JSON Objects
            { href: "https://github.com/ignurof/jetpackdoggo2", text: "Source Code"},
            { href: "https://ignurof.itch.io/jetpack-doggo-2", text: "Download"} 
        ]
    );

    // test editproject - TODO: THIS WORKS, ADD TO ADMIN ENDPOINT FUNCTIONALITY
    //projectlist.EditProject(0, "new", "new", ["new","new2"], ["testimg.jpg"]);

    //add default aboutText DEBUG
    aboutcontent.UpdateAboutText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
});