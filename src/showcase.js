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
    res.render("showcase", {
        // Props here
        coolQuote: quotegenerator.TheQuote(),
        projectList: projectlist.GetProjectList(),
    });
});

// Detailed project page
router.get("/project/:index", (req, res) => {
    // Grab correct project based on index value
    let specProject = projectlist.GetSpecificProject(req.params.index);
    // Render the page
    res.render("project", {
        title: specProject.title,
        content: specProject.content,
        tags: specProject.tags,
        images: specProject.images,
    });
});

  
module.exports = router;