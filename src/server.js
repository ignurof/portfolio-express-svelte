// Webserver and Frontend
const express = require("express");
const svelteViewEngine = require("svelte-view-engine");
const config = require("../config");

// Site content
const filehandler = require("./filehandler.js");
const quotegenerator = require("./quotegenerator.js");
const aboutcontent = require("./aboutcontent.js");
const projectlist = require("./projectlist.js");

// Router
const adminpanel = require("./adminpanel.js");

// Server and View Engine declarations
let app = express();
let engine = svelteViewEngine(config.svelteViewEngine);
let { dir, type, buildDir } = config.svelteViewEngine;

// View Engine setup
app.engine(type, engine.render);
app.set("view engine", type);
app.set("views", dir);

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
        projectList: projectlist.GetProjectList(),
    });
});

// I just assume this should go below in the order, figure this out in the future bruv
// Routes requests to http://localhost:3000/admin
app.use("/admin", adminpanel);

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
        ["jp1.jpg", "jp2.jpg", "jp3.jpg", "jp4.jpg"]
    );
    projectlist.AddProject(
        "Jetpack Doggo 2",
        "Text about the game",
        ["C#", "Unity"],
        ["jp1.jpg", "jp2.jpg", "jp3.jpg", "jp4.jpg"]
    );
    projectlist.AddProject(
        "Jetpack Doggo 3",
        "Text about the game",
        ["C#", "Unity"],
        ["jp1.jpg", "jp2.jpg", "jp3.jpg", "jp4.jpg"]
    );
    // test editproject
    projectlist.EditProject(0, "new", "new", ["new","new2"], ["testimg.jpg"]);
    
});