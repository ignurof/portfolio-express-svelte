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

// Router
const adminpanel = require("./adminpanel.js");
const showcase = require("./showcase.js");

// Server and View Engine declarations
let app = express();
let engine = svelteViewEngine(config.svelteViewEngine);
let { dir, type, buildDir } = config.svelteViewEngine;

// View Engine setup
app.engine(type, engine.render);
app.set("view engine", type);
app.set("views", dir);

// CORS SETUP
let corsOptions = {
    "origin": 'http://ignurof.xyz',
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

    res.render("index", {
        coolQuote: quotegenerator.TheQuote(),
        about: aboutcontent.GetAboutText(),
    });
});

// I just assume this should go below in the order, figure this out in the future bruv
// Routes requests to http://localhost:3000/admin
app.use("/admin", adminpanel);

// Projects page
app.use("/showcase", showcase);

// Listen to requests
app.listen(config.port, () => {
    console.log("Server started on port http://localhost:" + config.port);

    // Run the quotegenerator
    quotegenerator.GetQuote();

    // Init files
    filehandler.InitFile("about", aboutcontent.GetAboutText());
    filehandler.InitFile("projectlist", projectlist.GetProjectList());

    // debug project
    projectlist.AddProject(
        "Jetpack Doggo 1",
        "Text about the game",
        ["C#", "Unity"],
        ["jp1/1.jpg", "jp1/2.jpg", "jp1/3.jpg", "jp1/4.jpg"]
    );
    projectlist.AddProject(
        "Jetpack Doggo 2",
        "Text about the game",
        ["C#", "Unity"],
        ["jp2/1.jpg", "jp2/2.jpg", "jp2/3.jpg", "jp2/4.jpg"]
    );

    // test editproject - TODO: THIS WORKS, ADD TO ADMIN ENDPOINT FUNCTIONALITY
    //projectlist.EditProject(0, "new", "new", ["new","new2"], ["testimg.jpg"]);

    //add default aboutText
    aboutcontent.UpdateAboutText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    
});