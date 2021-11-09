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
const admin = require("./admin.js");
const project = require("./project.js");
const about = require("./about.js");

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
app.listen(config.port, async() => {
    console.log("Server started on port http://localhost:" + config.port);

    // Init files if they dont exist
    filehandler.InitFile("about");
    filehandler.InitFile("projectlist");

    // Read files after they have been init
    // The reason I have to await ReadFile and not Init is because ReadFile should return something, aka a Promise
    let aboutResult = await filehandler.ReadFile("about");
    aboutcontent.UpdateAboutText(aboutResult);

    let projectsResult = await filehandler.ReadFile("projectlist");
    projectlist.UpdateProjectList(projectsResult);
});