// TODO: Till på morgonen, gör en adminsida så man kan skapa, redigera och ta bort projekt från listan, listan ska uppdateras dynamiskt av det
// Kontaktformulär och en adminsida som läser in alla meddelanden
// TODO: Kom på ett sätt att skapa typ filehandler.js som tar hand om fs.stat, writefile och readfile sakerna, med params som avgör vilken fil det blir
const filehandler = require("./filehandler.js");

// Projectlist strucutre
// { projectList: [] }
let projectList = [];

const GetProjectList = () => {
    return projectList;
}

const UpdateProjectList = (newList) => {
    projectList = newList;
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
    projectList.push(projectTemplate);

    // Update projectlist.json using the filehandler
    filehandler.GenerateFile("projectlist", projectList);
}

const EditProject = (index, title, content, tags, images) => {
    projectList.map((updatedProject, i) => {
        if(index == i){
            updatedProject.title = title;
            updatedProject.content = content;
            updatedProject.tags = tags;
            updatedProject.images = images;
        }
    });

    console.log("edited project?");
}

module.exports = {
    UpdateProjectList,
    AddProject,
    GetProjectList,
    EditProject
};