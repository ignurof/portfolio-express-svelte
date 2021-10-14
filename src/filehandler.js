const fs = require("fs");
const aboutcontent = require("./aboutcontent.js");
const projectlist = require("./projectlist.js");

// Hardcoded whitelisted filenames
let fileNames = ["about", "projectlist", "messages"];

const InitFiles = () => {
    // Iterate over the requested fileNames
    for(let i = 0; i < fileNames.length; i++){
        // Get a specific fileName to create individual files
        let fileName = fileNames[x];
        fileName = "assets/" + fileName + ".json";
        // Check file availability first
        fs.stat(fileName, (err) => {
            if(err == null){
                // File exist
                console.log(`Reading ${fileName}.json`);
                // Read files and update server vars
                // Also verify which file should be created
                if(fileName === "about"){
                    aboutcontent.UpdateAboutText(ReadFile(fileName));
                } else if(fileName === "projectlist"){
                    projectlist.UpdateProjectList(ReadFile(fileName));
                } else if(fileName === "messages"){
                    // TODO: Add this
                } else{
                    console.error("InitFiles Error, did not specific whitelisted fileNames");
                }
            } else if(err.code === "ENOENT"){
                // File didnt exist
                console.error(`Generating ${fileName}.json`); 
                // Create file
                // Also verify which file should be created
                if(fileName === "about"){
                    GenerateFile(fileName, aboutcontent.GetAboutText());
                } else if(fileName === "projectlist"){
                    GenerateFile(fileName, projectlist.GetProjectList());
                } else if(fileName === "messages"){
                    // TODO: Add this
                } else{
                    console.error("InitFiles Error, did not specific whitelisted fileNames");
                }
            } else {
                throw err;
            }
        });
    } 
}

// Happens on startup
const ReadFile = (fileName) => {
    fileName = "assets/" + fileName + ".json";
    // Read the file
    fs.readFile(fileName, (err, data) => {
        if(err) { return console.error(`Read Error ${fileName}.json`); }

        // Parse the JSON String back into a regular JSON Object
        // return it so it can be used externally
        return JSON.parse(data);
    });
}

// Creates or overwrites
const GenerateFile = (fileName, jsonObj) => {
    // Parse JSON object to string
    let data = JSON.stringify(jsonObj);

    fileName = "assets/" + fileName + ".json";

    // Create a new file or overwrite existing one
    fs.writeFile(fileName, data, (err) => {
        if(err) { return console.error(`Generate Error ${fileName}.json`); }
    });
}

module.exports = {
    InitFiles,
    GenerateFile
};