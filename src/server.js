const express = require("express");
const svelteViewEngine = require("svelte-view-engine");
const config = require("../config");

// For the site
const quotegenerator = require("./quotegenerator.js");
const aboutcontent = require("./aboutcontent.js");

let app = express();
let engine = svelteViewEngine(config.svelteViewEngine);
let { dir, type, buildDir } = config.svelteViewEngine;

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

    res.render("Index", {
        a: 1,
        b: 2,
        coolQuote: quotegenerator.TheQuote(),
        about: aboutcontent.GetAboutText(),
    });
});

// Listen to requests
app.listen(config.port, () => {
    console.log("Server started on port http://localhost:" + config.port);

    // Run the quotegenerator
    quotegenerator.GetQuote();

    // init about file if needed
    aboutcontent.InitAboutContent();
});