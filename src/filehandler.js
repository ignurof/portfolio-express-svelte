const fs = require("fs").promises;

const InitFile = async(fileName) => {
    // Set the filename path
    fileName = "admindb/" + fileName + ".json";

    let data = [{"test": "data"}];

    // Try-Catch best practice for async (wait for code to complete, aka promises)
    try {
        await fs.stat(fileName);
        // Due to the "await" keyword, we *await* the promise to resolve first
        // myOtherFunction();
    } catch (err) {
        /* Important to keep in mind is that errors inside of
        * the myOtherFunction function also get cought here,
            which is why you might want to put it outside of
            the try/catch block. */
        if (err.code === "ENOENT") await fs.writeFile(fileName, JSON.stringify(data));
        console.log("FILE CREATED: " + fileName);
    }
}


const ReadFile = async(fileName) => {
    // Set the filename path
    fileName = "admindb/" + fileName + ".json";

    try{
        let data = await fs.readFile(fileName);
        return JSON.parse(data);
    } catch(e){
        console.error("READ ERROR: " + e);
        return [{"test": "data"}];
    }
}

// Creates or overwrites
const GenerateFile = (fileName, jsonObj) => {
    // Set the filename path
    fileName = "admindb/" + fileName + ".json";

    // Create a new file or overwrite existing one
    fs.writeFile(fileName, JSON.stringify(jsonObj), (err) => {
        if(err) { return console.error(`Generate Error ${fileName}`); }

        console.log(`Generated ${fileName}`);
    });
}

module.exports = {
    GenerateFile,
    ReadFile,
    InitFile
};