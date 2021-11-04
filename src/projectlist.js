// TODO: Till på morgonen, gör en adminsida så man kan skapa, redigera och ta bort projekt från listan, listan ska uppdateras dynamiskt av det
// Kontaktformulär och en adminsida som läser in alla meddelanden
// TODO: Kom på ett sätt att skapa typ filehandler.js som tar hand om fs.stat, writefile och readfile sakerna, med params som avgör vilken fil det blir
const filehandler = require("./filehandler.js");

// Projectlist strucutre
// { projectList: [] }
let projectList = [];

const GetSpecificProject = (index) => {
    return projectList[index];
}

const GetProjectList = () => {
    return projectList;
}

const UpdateProjectList = (newList) => {
    projectList = newList;
}

// Adds a new project to the servervar projectList
const AddProject = (title, content, tags, images, links) => {
    // Project structure
    let projectTemplate = {
        title,      // String
        content,    // String
        tags,       // Array
        images,      // Array
        links       // Array
    };

    // Push the new project to projectList servervar
    projectList.push(projectTemplate);

    // Update projectlist.json using the filehandler
    filehandler.GenerateFile("projectlist", projectList);
}

// Maps the specific index of an array to a temporary object so I can easily update its values
const EditProject = (index, title, content, tags, images, links) => {
    projectList.map((updatedProject, i) => {
        // If index is not true means it doesnt exist, so early return out
        if(index != i) return;

        updatedProject.title = title;
        updatedProject.content = content;
        updatedProject.tags = tags;
        updatedProject.images = images;
        updatedProject.links = links;
    });
}

const DeleteProject = (index) => {
    // Create a list list array with the specified index removed if it exists
    let newProjectList = projectList.filter((i) => {
        if(index != i) return;

        i == index;
    });

    UpdateProjectList(newProjectList);
}

module.exports = {
    UpdateProjectList,
    AddProject,
    GetProjectList,
    EditProject,
    GetSpecificProject,
    DeleteProject
};