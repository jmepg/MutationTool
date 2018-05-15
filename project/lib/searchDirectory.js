const Finder = require('fs-finder');
const filesJS = require('./files');


const BACKGROUND_EXPRESSION = 'super.onSaveInstanceState(outState);';
const BACKGROUND_MUTANT = '\n outState.clear();';

function selectFiles(dir, mutant) {
    //Diferent file selection given diferent mutant
    //let dirFiles = searchDirectory(dir);
    let allFiles = findAllFiles(dir);
    let found = searchValidFiles(allFiles, mutant);
    return found;

}

function findAllFiles(dir) {
    var paths = Finder.from(dir).findFiles();
    return paths;
}

function searchDirectory(dir) {
    let files = Finder.in(dir).findFiles();
    let directories = Finder.in(dir).findDirectories();
    return { dir: directories.toString().split(','), files: files.toString().split(',') };
};


function searchValidFiles(files, mutant) {

    let validFiles = [];
    for (let i = 0; i < files.length; i++) {
        switch (mutant) {
            case 'background':
                if (searchBackgroundValidFiles(files[i])) {
                    validFiles.push(files[i]);
                }
                break;

            default:
                break;
        }

    }

    return validFiles;

}

function searchBackgroundValidFiles(file) {
    let extension = file.substr(file.lastIndexOf('.') + 1);
    if (extension !== "java") {
        return false;
    }

    const result = filesJS.searchInFile(file, BACKGROUND_EXPRESSION);
    if (result) {
        return true;
    } else {
        return false;
    }


    return false;

}

function isPathValid() {};


module.exports.BACKGROUND_EXPRESSION = BACKGROUND_EXPRESSION;
module.exports.BACKGROUND_MUTANT = BACKGROUND_MUTANT;

module.exports.searchDirectory = searchDirectory;
module.exports.selectFiles = selectFiles;
module.exports.findAllFiles = findAllFiles;

// D:\Estrada\MIEIC\Tese\test