const express = require("express");
const router = express.Router();

const aboutcontent = require("./aboutcontent.js");

// define the projects page route
router.get('/', (req, res) => {
    res.render("about", {
        // Props here
        about: aboutcontent.GetAboutText(),
    });
});

module.exports = router;