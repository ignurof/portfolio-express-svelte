const express = require("express");
const router = express.Router();

const projectlist = require("./projectlist.js");
const quotegenerator = require("./quotegenerator.js");

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Ran the Showcase router @ Time: ', Date.now());
    console.log(req.ip);
    next();
});

// define the projects page route
router.get('/', (req, res) => {
    res.send("Nothing here!");
});

// Detailed project page
router.get("/:index", (req, res) => {
    // Grab correct project based on index value
    let specProject = projectlist.GetSpecificProject(req.params.index);
    // Convert string to int so it can be used
    let indexValue = parseInt(req.params.index);
    //TODO: Make an actual 404 page
    if(specProject == undefined) {
        //res.send("Error 404 - Project does not exist!");
        res.redirect("/");
    }
    // Render the page
    res.render("project", {
        coolQuote: quotegenerator.TheQuote(),
        index: indexValue,
        title: specProject.title,
        content: specProject.content,
        tags: specProject.tags,
        images: specProject.images,
        links: specProject.links,
    });
});

  
module.exports = router;