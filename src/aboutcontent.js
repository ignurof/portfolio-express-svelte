const fs = require("fs");

// The value we will reference in the Index page
let aboutText = "default string here";

const GetAboutText = () => {
    return aboutText;
}

const EditAboutContent = (inputText) => {
    // Sanitize input

    // Update values
    aboutText = inputText;

    UpdateAboutJSON(aboutText);
}

const InitAboutContent = () => {
    // Check if file exist
    fs.stat("assets/about.json", (err, stat) => {
        if(err == null){
            // If file exist return early
            console.log("Found about.json file");
            ReadAboutJSON();
        } else if(err.code === "ENOENT"){
            // If file does not exist
            console.error("There was not about.json file");
            // Create the about.json file
            CreateAboutJSON();
        } else {
            throw err;
        }
    });
}

const CreateAboutJSON = () => {
    // Seems like fs check from root so the filepath needs to be like this
    fs.writeFile("assets/about.json", aboutText, (err) => {
        if(err) { return console.error("Write file error occured"); }

        // Debug logging
        console.log(aboutText);
    });
}

const ReadAboutJSON = () => {
    fs.readFile("assets/about.json", (err, data) => {
        if(err) { return console.error("Read file not working"); }

        // Read back the string
        aboutText = data;
    });
}

const UpdateAboutJSON = (input) => {
    fs.writeFile("assets/about.json", input, (err) => {
        if(err) { return console.error("Write file error on UpdateAboutJSON"); }

        console.log("updated about.json");
    });
}

module.exports = {
    InitAboutContent,
    GetAboutText,
    EditAboutContent
};