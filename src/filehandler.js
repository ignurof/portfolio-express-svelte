const fs = require("fs");

// This returns a servervar JSON object thats been read from file if the file existed on server startup
const InitFile = (fileName, jsonObj) => {
    fs.stat(fileName, (err) => {
        if(err == null){
            // File exist, read it and update server vars
            ReadFile(fileName);
        } else if(err.code === "ENOENT"){
            // File does not exist, create one
            GenerateFile(fileName, jsonObj);
        } else{
            throw err;
        }
    });
}

// Happens on startup
const ReadFile = (fileName) => {
    fileName = "admindb/" + fileName + ".json";
    // Read the file
    fs.readFile(fileName, (err, data) => {
        if(err) { return console.error(`Read Error ${fileName}`); }

        console.log(`Read ${fileName}`);
        // Parse the JSON String back into a regular JSON Object
        // return it so it can be used externally
        return JSON.parse(data);
    });
}

// Creates or overwrites
function GenerateFile(fileName, jsonObj){
    // Parse JSON object to string
    let data = JSON.stringify(jsonObj);

    fileName = "admindb/" + fileName + ".json";

    // Create a new file or overwrite existing one
    fs.writeFile(fileName, data, (err) => {
        if(err) { return console.error(`Generate Error ${fileName}`); }

        console.log(`Generated ${fileName}`);
    });
}

module.exports = {
    InitFile,
    GenerateFile
};