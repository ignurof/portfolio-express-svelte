const filehandler = require("./filehandler.js");

// The value we will reference in the Index page that has been exported from frontend about.svelte
// since this is what is referenced by the server and rendered to the frontend, this is where I can put default value
let aboutText = "";

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