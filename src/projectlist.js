const filehandler = require("./filehandler.js");

// Projectlist strucutre
let projectList = [];

const GetSpecificProject = (index) => {
    return projectList[index];
}

const GetProjectList = () => {
    return projectList;
}

// Since this just replaces the old list with the new one, I dont need to specify anything
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
    // Reverse to fit frontends version, map it and reverse back to normal
    let reverseList = projectList.reverse();

    reverseList.map((updatedProject, i) => {
        // If index is not true means it doesnt exist, so early return out
        if(index != i) return;

        updatedProject.title = title;
        updatedProject.content = content;
        updatedProject.tags = tags;
        updatedProject.images = images;
        updatedProject.links = links;

        projectList = reverseList.reverse();
        // Update projectlist.json using the filehandler
        filehandler.GenerateFile("projectlist", projectList);
    });
}

const DeleteProject = (index) => {
    // Reverse to fit frontends version, map it and reverse back to normal
    let reverseList = projectList.reverse();

    // Create a list list array with the specified index removed if it exists
    // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
    if (index > -1) {
        reverseList.splice(index, 1);
    }

    projectList = reverseList.reverse();
    // Update projectlist.json using the filehandler
    filehandler.GenerateFile("projectlist", projectList);
}

module.exports = {
    UpdateProjectList,
    AddProject,
    GetProjectList,
    EditProject,
    GetSpecificProject,
    DeleteProject
};