const inquirer = require('inquirer');
const files = require('./files');

module.exports = {

    askDirectory: () => {
        const questions = [{
            name: 'directory',
            type: 'input',
            message: 'Enter directory:',
            validate: function(value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter directory';
                }
            }
        }, ];
        return inquirer.prompt(questions);
    }
}