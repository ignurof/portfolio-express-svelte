const fs = require("fs");

// Projectlist strucutre
let projectList = {
    "projects": []
};

const GetProjectList = () => {
    return projectList;
}

// Adds a new project to the servervar projectList
const AddProject = (title, content, tags, images) => {
    // Project structure
    let projectTemplate = {
        title,      // String
        content,    // String
        tags,       // Array
        images      // Array
    };

    // Push the new project to projectList servervar
    projectList.projects.push(projectTemplate);

    // Update projectlist.json
    GenerateProjectListJSON();
}

const InitProjectListJSON = () => {
    // Check file availability first
    fs.stat("assets/projectlist.json", (err) => {
        if(err == null){
            // File exist
            console.log("Found projectlist.json");
            // Read file
            ReadProjectListJSON();
        } else if(err === "ENOENT"){
            // File didnt exist
            console.error("projectlist.json does not exist");
            // Create file
            GenerateProjectListJSON();
        } else {
            throw err;
        }
    });
}

// Updates the JSON file
const GenerateProjectListJSON = () => {
    // Convert projectList JSON Object into JSON String
    let data = JSON.stringify(projectList);

    // Create a new file or overwrite existing one
    fs.writeFile("assets/projectlist.json", data, (err) => {
        if(err) { return console.error("Couldnt create projectlist.json"); }

        console.log("Created projectlist.json");
    });
}

// Happens on startup
const ReadProjectListJSON = () => {
    fs.readFile("assets/projectlist.json", (err, data) => {
        if(err) { return console.error("Couldnt read projectlist.json"); }

        console.log("Read projectlist.json");

        // Parse the JSON String back into a regular JSON Object
        // Populate the servervar with fresh list from file
        projectList = JSON.parse(data);
    });
}

module.exports = {
    InitProjectListJSON,
    AddProject,
    GetProjectList
};