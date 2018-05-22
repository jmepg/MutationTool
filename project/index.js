const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const filesJS = require('./lib/files');
const inquirer = require('./lib/inquirer');
const searchDirectory = require('./lib/searchDirectory');
const logic = require('./lib/logic');

clear();
console.log(
    chalk.yellow(
        figlet.textSync('Mutation Tool', { horizontalLayout: 'full' })
    )
);



const run = () => {
    inquirer.askDirectory()
        .then(directoryPath => {
            logic.logic(directoryPath.directory);
        })

}

run();