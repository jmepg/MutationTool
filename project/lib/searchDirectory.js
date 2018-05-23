const Finder = require('fs-finder');
const filesJS = require('./files');


const BACKGROUND_OUTSTATE_EXPRESSION = 'super.onSaveInstanceState(outState);';
const BACKGROUND_OUTSTATE_MUTANT = '\n outState.clear();';

const BACKGROUND_EDITTEXT_REGEX = /(EditText)?\s*([A-Za-z\d]+)\s*=\s*\(EditText\)findViewById\(([A-Za-z\d.]+)\);/;
const BACKGROUND_WIDGET_MUTANT = '.setSaveEnable(false); \n'

const BACKGROUND_SPINNER_REGEX = /(Spinner)?\s*([A-Za-z\d]+)\s*=\s*\(Spinner\)findViewById\(([A-Za-z\d.]+)\);/;



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
            result = filesJS.searchInFile(file, BACKGROUND_OUTSTATE_EXPRESSION);
            if (result) {
                return true;
            } else {
                return false;
            }
            break;
        case 'background_editText':
            result = filesJS.searchInFileRegex(file, BACKGROUND_EDITTEXT_REGEX);
            if (result) {
                return true;
            } else {
                return false;
            }
            break;

        case 'background_spinner':
            result = filesJS.searchInFileRegex(file, BACKGROUND_SPINNER_REGEX);
            if (result) {
                return true;
            } else {
                return false;
            }
            break;
        case 'background_onPause':
            /*result = filesJS.searchInFile(file, BACKGROUND_OUTSTATE_EXPRESSION);
            if (result) {
                return true;
            } else {
                return false;
            }*/
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


module.exports.BACKGROUND_OUTSTATE_EXPRESSION = BACKGROUND_OUTSTATE_EXPRESSION;
module.exports.BACKGROUND_OUTSTATE_MUTANT = BACKGROUND_OUTSTATE_MUTANT;
module.exports.BACKGROUND_EDITTEXT_REGEX = BACKGROUND_EDITTEXT_REGEX;
module.exports.BACKGROUND_WIDGET_MUTANT = BACKGROUND_WIDGET_MUTANT;
module.exports.BACKGROUND_SPINNER_REGEX = BACKGROUND_SPINNER_REGEX;

module.exports.searchDirectory = searchDirectory;
module.exports.selectFiles = selectFiles;
module.exports.findAllFiles = findAllFiles;
module.exports.isPathValid = isPathValid;

// D:\Estrada\MIEIC\Tese\Apps\and-bible\and-bible\app\src\main