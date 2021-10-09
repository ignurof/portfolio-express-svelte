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
    console.log(aboutText);
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
    let aboutJSON = {
        "content": "hello, world!"
    };

    // Convert JSON object into JSON string
    let data = JSON.stringify(aboutJSON);

    // Seems like fs check from root so the filepath needs to be like this
    fs.writeFile("assets/about.json", data, (err) => {
        if(err) { return console.error("Write file error occured"); }

        // Debug logging
        console.log(data);
    });
}

const ReadAboutJSON = () => {
    fs.readFile("assets/about.json", (err, data) => {
        if(err) { return console.error("Read file not working"); }
        // Parse the JSON string back into an JSON object
        data = JSON.parse(data);

        // { content: "hello, world!" }
        aboutText = data.content;
    });
}

module.exports = {
    InitAboutContent,
    GetAboutText,
    EditAboutContent
};