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

    if (mutantValidation(directoryPath, 'background_editText')) {
        while (true) {
            if (!createMutation(directoryPath, 'background_editText'))
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


    switch (mutant) {
        case 'background_outstate':
            filesJS.insertMutant(selectedFiles[fileSelectedNo], searchDirectory.BACKGROUND_OUTSTATE_EXPRESSION, searchDirectory.BACKGROUND_OUTSTATE_EXPRESSION + searchDirectory.BACKGROUND_OUTSTATE_MUTANT);
            break;
        case 'background_editText':
            let match = filesJS.searchDeclarationInFile(selectedFiles[fileSelectedNo], searchDirectory.BACKGROUND_EDITTEXT_REGEX);
            let finalMutant = match[0] + ' \n ' + match[2] + searchDirectory.BACKGROUND_EDITTEXT_MUTANT;

            filesJS.insertMutant(selectedFiles[fileSelectedNo], match[0], finalMutant);
            break;

        default:
            break;


    }

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
        console.log('Not possible to insert ' + mutant + ' mutants');
        return false;
    }
}

module.exports.logic = logic;