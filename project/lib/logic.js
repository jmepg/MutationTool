'use strict'

const filesJS = require('./files.js');
const searchDirectory = require('./searchDirectory');

var mutantNo = 0;

function logic(directoryPath) {

    if (!mutantValidation(directoryPath))
        return 0;

    filesJS.copyDirectory(directoryPath, ++mutantNo);

    let lastFolder = directoryPath.substr(directoryPath.lastIndexOf('\\') + 1);
    let newDirectory = 'D:\\Estrada\\MIEIC\\Tese\\MutationTool\\project\\output\\' + lastFolder + '\\mutant' + mutantNo;

    let selectedFiles = searchDirectory.selectFiles(newDirectory, 'background');

    filesJS.insertMutant(selectedFiles[0], searchDirectory.BACKGROUND_EXPRESSION, searchDirectory.BACKGROUND_EXPRESSION + searchDirectory.BACKGROUND_MUTANT);


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