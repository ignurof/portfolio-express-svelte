const filehandler = require("./filehandler.js");

// The value we will reference in the Index page that has been exported from frontend about.svelte
// since this is what is referenced by the server and rendered to the frontend, this is where I can put default value
let aboutText;

const GetAboutText = () => {
    return aboutText;
}

const UpdateAboutText = (inputObj) => {
    aboutText = inputObj[0].aboutText;
    
    let about = [{
        aboutText
    }];

    // Update file
    filehandler.GenerateFile("about", about);
}

module.exports = {
    GetAboutText,
    UpdateAboutText
};