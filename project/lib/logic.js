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

    if (mutantValidation(directoryPath, 'background_outstate')) {

        while (true) {
            if (!createMutation(directoryPath, 'background_outstate'))
                break;
        }
    }
}

function createMutation(directoryPath, mutant) {
    filesJS.copyDirectory(directoryPath, ++mutantNo);



    let _appFolderNames = directoryPath.split('\\');
    let appFolderName = _appFolderNames[_appFolderNames.length - 4];


    let newDirectory = 'D:\\Estrada\\MIEIC\\Tese\\MutationTool\\project\\output\\' + appFolderName + '\\mutant' + mutantNo;

    let selectedFiles = searchDirectory.selectFiles(newDirectory, mutant);

    console.log(selectedFiles[fileSelectedNo]);
    filesJS.insertMutant(selectedFiles[fileSelectedNo], searchDirectory.BACKGROUND_EXPRESSION, searchDirectory.BACKGROUND_EXPRESSION + searchDirectory.BACKGROUND_MUTANT);

    if (selectedFiles.length === ++fileSelectedNo) {
        fileSelectedNo = 0;
        return false;
    } else
        return true;
}


function mutantValidation(directoryPath, mutant) {
    let selectedFiles = searchDirectory.selectFiles(directoryPath, mutant);

    if (selectedFiles.length > 0) {
        filesJS.copyDirectory(directoryPath, filesJS.ORIGINAL);
        return true;
    } else {
        console.log('Not possible to insert mutant');
        return false;
    }
}

module.exports.logic = logic;