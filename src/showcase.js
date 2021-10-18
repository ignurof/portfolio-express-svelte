const express = require("express");
const router = express.Router();

const projectlist = require("./projectlist.js");

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Ran the Showcase router @ Time: ', Date.now());
    next();
});

// define the projects page route
router.get('/', function (req, res) {
    res.render("showcase", {
        // Props here
        projectList: projectlist.GetProjectList(),
    });
});

  
module.exports = router;