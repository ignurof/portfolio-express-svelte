const express = require("express");
const router = express.Router();

const aboutcontent = require("./aboutcontent.js");
const quotegenerator = require("./quotegenerator.js");

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Ran the Showcase router @ Time: ', Date.now());
    console.log(req.ip);
    next();
});

// define the projects page route
router.get('/', (req, res) => {
    res.render("about", {
        // Props here
        coolQuote: quotegenerator.TheQuote(),
        about: aboutcontent.GetAboutText(),
    });
});

module.exports = router;