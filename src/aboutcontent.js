const filehandler = require("./filehandler.js");

// The value we will reference in the Index page
let aboutText = "default string here";

const GetAboutText = () => {
    return aboutText;
}

const UpdateAboutText = (inputText) => {
    // Sanitize input

    // Update values
    aboutText = inputText;

    // Update file
    filehandler.GenerateFile("about", aboutText);
}

module.exports = {
    GetAboutText,
    UpdateAboutText
};