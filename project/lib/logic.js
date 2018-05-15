'use strict'

const filesJS = require('./files.js');
const searchDirectory = require('./searchDirectory');

var mutantNo = 0;
var fileSelectedNo = 0;

function logic(directoryPath) {

    if (!searchDirectory.isPathValid(directoryPath)) {
        console.log("Invalid path! The app folder must be inside the path of the directory given!")
        return -1;
    }

    if (!mutantValidation(directoryPath))
        return 0;

    while (true) {
        if (!createMutation(directoryPath))
            break;
    }

}

function createMutation(directoryPath) {
    filesJS.copyDirectory(directoryPath, ++mutantNo);

    let lastFolder = directoryPath.substr(directoryPath.lastIndexOf('\\') + 1);
    let newDirectory = 'D:\\Estrada\\MIEIC\\Tese\\MutationTool\\project\\output\\' + lastFolder + '\\mutant' + mutantNo;

    let selectedFiles = searchDirectory.selectFiles(newDirectory, 'background');

    console.log(selectedFiles[fileSelectedNo]);
    filesJS.insertMutant(selectedFiles[fileSelectedNo], searchDirectory.BACKGROUND_EXPRESSION, searchDirectory.BACKGROUND_EXPRESSION + searchDirectory.BACKGROUND_MUTANT);

    if (selectedFiles.length === ++fileSelectedNo) {
        fileSelectedNo = 0;
        return false;
    } else
        return true;
}


function mutantValidation(directoryPath) {
    let selectedFiles = searchDirectory.selectFiles(directoryPath, 'background');

    if (selectedFiles.length > 0) {
        filesJS.copyDirectory(directoryPath, filesJS.ORIGINAL);
        return true;
    } else {
        console.log('Not possible to insert mutant');
        return false;
    }
}

module.exports.logic = logic;