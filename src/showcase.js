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
router.get('/', function (req, res) {
    res.render("showcase", {
        // Props here
        coolQuote: quotegenerator.TheQuote(),
        projectList: projectlist.GetProjectList(),
    });
});

  
module.exports = router;