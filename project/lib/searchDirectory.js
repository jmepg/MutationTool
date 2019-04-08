const Finder = require('fs-finder');
const filesJS = require('./files');
const constants = require('./constants');


function selectFiles(dir, mutant) {
    //Diferent file selection given diferent mutant
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

        if (searchBackgroundValidFiles(files[i], mutant)) {
            validFiles.push(files[i]);
        }
    }

    return validFiles;

}

function searchBackgroundValidFiles(file, mutant) {
    let extension = file.substr(file.lastIndexOf('.') + 1);
    if (extension !== "java") {
        return false;
    }
    let result = null;

    switch (mutant) {
        case 'background_outState':
            result = filesJS.searchInFile(file, constants.BACKGROUND_OUTSTATE_EXPRESSION);
            if (result) {
                return true;
            } else {
                return false;
            }
            break;
        case 'background_editText':
            result = filesJS.searchInFileRegex(file, constants.BACKGROUND_EDITTEXT_REGEX);
            if (result) {
                return true;
            } else {
                return false;
            }
            break;

        case 'background_spinner':
            result = filesJS.searchInFileRegex(file, constants.BACKGROUND_SPINNER_REGEX);
            if (result) {
                return true;
            } else {
                return false;
            }
            break;
        case 'background_checkbox':
            result = filesJS.searchInFileRegex(file, constants.BACKGROUND_CHECKBOX_REGEX);
            if (result) {
                return true;
            } else {
                return false;
            }
            break;
        case 'background_onPause':
            result = filesJS.searchInFileRegex(file, constants.BACKGROUND_ACTIVITY_CHECK_REGEX);
            if (result) {
                return true;
            } else {
                return false;
            }
            break;
        default:
            break;
    }

    return false;

}

function isPathValid(path) {
    let filesPath = Finder.in(path).findFiles();
    for (let i = 0; i < filesPath.length; i++) {
        filesName = filesPath[i].split('\\');
        if (filesName[filesName.length - 1] == 'AndroidManifest.xml')
            return true;
    }

    return false;

};


module.exports.searchDirectory = searchDirectory;
module.exports.selectFiles = selectFiles;
module.exports.findAllFiles = findAllFiles;
module.exports.isPathValid = isPathValid;