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


function copyDirectory(directoryPath, mutantNo) {

    if (mutantNo === ORIGINAL) mutantNo = 'original';
    else mutantNo = 'mutant' + mutantNo;


    let _appFolderNames = directoryPath.split('\\');
    let appFolderName = _appFolderNames[_appFolderNames.length - 4];


    let _destination = 'D:\\Estrada\\MIEIC\\Tese\\MutationTool\\project\\output\\' + appFolderName;

    let destination = 'D:\\Estrada\\MIEIC\\Tese\\MutationTool\\project\\output\\' + appFolderName + '\\' + mutantNo;


    if (!fs.existsSync(_destination)) {
        fs.mkdirSync(_destination);
    }

    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
    }


    fs.copySync(directoryPath, destination);
}

function insertMutant(file, expression, mutant) {

    const data = fs.readFileSync(file).toString();
    const result = data.replace(expression, mutant);

    fs.writeFileSync(file, result);

}

function searchInFile(file, expression) {
    const data = fs.readFileSync(file).toString();

    if (data.indexOf(expression) >= 0) {
        return true;
    } else return false;

}

function searchInFileRegex(file, regex) {
    const data = fs.readFileSync(file).toString();

    let match = regex.exec(data);
    if (match !== null) {
        return true;
    }
    return false;
}

function searchDeclarationInFile(file, regex) {
    const data = fs.readFileSync(file).toString();

    let match = regex.exec(data);
    if (match !== null) {
        return match;
    }
    return false;
}




module.exports.ORIGINAL = ORIGINAL;

module.exports.copyDirectory = copyDirectory;
module.exports.getCurrentDirectoryBase = getCurrentDirectoryBase;
module.exports.directoryExists = directoryExists;
module.exports.searchInFile = searchInFile;
module.exports.searchInFileRegex = searchInFileRegex;
module.exports.insertMutant = insertMutant;
module.exports.searchDeclarationInFile = searchDeclarationInFile;