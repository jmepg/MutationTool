'use strict'

const fs = require('fs-extra');
const path = require('path');
const ncp = require('ncp').ncp;
const findInFiles = require('find-in-files');
const shell = require('shelljs/global');
ncp.limite = 16;

const ORIGINAL = 0;

function getCurrentDirectoryBase() {
    return path.basename(process.cwd());
}

function directoryExists(filePath) {
    try {
        return fs.statSync(filePath).isDirectory();
    } catch (err) {
        return false;
    }
}


function copyDirectory(source, mutantNo) {

    if (mutantNo === ORIGINAL) mutantNo = 'original';
    else mutantNo = 'mutant' + mutantNo;


    let lastFolder = source.substr(source.lastIndexOf('\\') + 1);

    let destinationTemp = 'D:\\Estrada\\MIEIC\\Tese\\MutationTool\\project\\output\\' + lastFolder;

    let destination = 'D:\\Estrada\\MIEIC\\Tese\\MutationTool\\project\\output\\' + lastFolder + '\\' + mutantNo;


    if (!fs.existsSync(destinationTemp)) {
        fs.mkdirSync(destinationTemp);
    }

    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
    }

    fs.copySync(source, destination);
}

function insertMutant(file, expression, mutant) {

    const data = fs.readFileSync(file).toString();
    const result = data.replace(expression.toString(), mutant);

    fs.writeFileSync(file, result);

}

function searchInFile(file, expression) {
    const data = fs.readFileSync(file).toString();

    if (data.indexOf(expression) >= 0) {
        return true;
    } else return false;

}

module.exports.ORIGINAL = ORIGINAL;

module.exports.copyDirectory = copyDirectory;
module.exports.getCurrentDirectoryBase = getCurrentDirectoryBase;
module.exports.directoryExists = directoryExists;
module.exports.searchInFile = searchInFile;
module.exports.insertMutant = insertMutant;