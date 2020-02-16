const inquirer = require('inquirer'),
separator = new inquirer.Separator();


class Prompts {
    
start()   {
    return inquirer.prompt(
        {
        type: "list",
        name: "catagory",
        message: "Welcome to HR Express.  \n Which catagory would you like to manage?",
        choices: ["Employees", separator, "Deparments", separator, "Job Titles", separator, "Quit"]
        }
    )
}

employeeOpts()   {
    return inquirer.prompt(
        {
        type: "list",
        name: "employees",
        message: "Welcome to HR Express.  \n Which catagory would you like to manage?",
        choices: ["View all employees", separator, "Update employee", separator, "Find employees by their manager", separator, "Find employee by name", separator, "Find employee by ID", separator, "Return home"]
        }
    )
}

}
module.exports = Prompts;