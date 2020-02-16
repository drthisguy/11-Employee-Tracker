const inquirer = require('inquirer'),
separator = new inquirer.Separator();


class Prompts {
    
start()   {
    return inquirer.prompt(
        {
        type: "list",
        name: "role",
        message: "Welcome to HR Express.  \n Which catagory would you like to manage?",
        choices: ["Employees", separator, "Deparments", separator, "Job Titles"]
        }
    )
}

}
module.exports = Prompts;