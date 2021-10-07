const fs = require("fs");

// The value we will reference in the Index page
let aboutText = "default string here";

const InitAboutContent = () => {
    // Check if file exist
    fs.stat("assets/about.json", (err, stat) => {
        if(err == null){
            // If file exist return early
            return;
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

module.exports = InitAboutContent;