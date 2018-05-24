'use strict'

const filesJS = require('./files.js');
const searchDirectory = require('./searchDirectory');
const constants = require('./constants');

var mutantNo = 0;
var fileSelectedNo = 0;

function logic(directoryPath) {

    if (!searchDirectory.isPathValid(directoryPath)) {
        console.log("Invalid path! The app folder must be inside the path of the directory given!")
        return -1;
    }

    if (mutantValidation(directoryPath, 'background_outState')) {
        console.log("\nbackground_outState mutants");
        while (true) {
            if (!createMutation(directoryPath, 'background_outState'))
                break;
        }
    }

    if (mutantValidation(directoryPath, 'background_editText')) {
        console.log("\nbackground_editText mutants");

        while (true) {
            if (!createMutation(directoryPath, 'background_editText'))
                break;
        }
    }

    if (mutantValidation(directoryPath, 'background_spinner')) {
        console.log("\nbackground_spinner mutants");

        while (true) {
            if (!createMutation(directoryPath, 'background_spinner'))
                break;
        }
    }


    if (mutantValidation(directoryPath, 'background_onPause')) {
        console.log("\nbackground_onPause mutants");

        while (true) {
            if (!createMutation(directoryPath, 'background_onPause'))
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

    console.log("Mutant " + mutantNo);
    console.log(selectedFiles[fileSelectedNo]);

    let match = [];
    let finalMutant = '';


    switch (mutant) {
        case 'background_outState':
            filesJS.insertMutant(selectedFiles[fileSelectedNo], constants.BACKGROUND_OUTSTATE_EXPRESSION, constants.BACKGROUND_OUTSTATE_EXPRESSION + constants.BACKGROUND_OUTSTATE_MUTANT);
            break;
        case 'background_editText':
            match = filesJS.searchDeclarationInFile(selectedFiles[fileSelectedNo], constants.BACKGROUND_EDITTEXT_REGEX);
            finalMutant = match[0] + ' \n ' + match[2] + constants.BACKGROUND_WIDGET_MUTANT;

            filesJS.insertMutant(selectedFiles[fileSelectedNo], match[0], finalMutant);
            break;
        case 'background_spinner':
            match = filesJS.searchDeclarationInFile(selectedFiles[fileSelectedNo], constants.BACKGROUND_SPINNER_REGEX);
            finalMutant = match[0] + ' \n ' + match[2] + constants.BACKGROUND_WIDGET_MUTANT;

            filesJS.insertMutant(selectedFiles[fileSelectedNo], match[0], finalMutant);
            break;
        case 'background_onPause':
            let newFileNumber = fileSelectedNo != 0 ? 0 : 1;
            let _appFolderNames = selectedFiles[fileSelectedNo].split('\\');
            let activityName = _appFolderNames[_appFolderNames.length - 1].split('.')[0];

            if (filesJS.searchInFile(selectedFiles[fileSelectedNo], constants.BACKGROUND_ONPAUSE)) {
                finalMutant = constants.BACKGROUND_SUPER_ONPAUSE + ' \n ' + constants.BACKGROUND_INTENT_CREATOR + activityName + '.class); \n ' + constants.BACKGROUND_START_ACTIVITY;
                filesJS.insertMutant(selectedFiles[fileSelectedNo], constants.BACKGROUND_SUPER_ONPAUSE, finalMutant);
            } else {
                finalMutant = constants.BACKGROUND_ONPAUSE_OVERRIDE + constants.BACKGROUND_INTENT_CREATOR + activityName + '.class); \n ' + constants.BACKGROUND_START_ACTIVITY + '\n } \n }';
                filesJS.insertMutant(selectedFiles[fileSelectedNo], constants.END_OF_FILE_REGEX, finalMutant);
            }
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


    if ((selectedFiles.length > 0 && mutant !== 'background_onPause') || (selectedFiles.length > 1 && mutant === 'background_onPause')) {
        filesJS.copyDirectory(directoryPath, filesJS.ORIGINAL);
        return true;
    } else {
        console.log('Not possible to insert ' + mutant + ' mutants');
        return false;
    }
}

module.exports.logic = logic;