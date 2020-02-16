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
        name: "option",
        message: "How would like to manage your employees?\n",
        choices: ["View all employees", separator, "Update an employee", separator, "Add a new employee", separator, "Find employees by their manager", separator, "Look up employee by name", separator, "Look up employee by ID", separator, "Return home", separator]
        }
    )
}

newEmployee() {
    return inquirer.prompt([
        {
        type: "input",
        name: "first",
        message: "Enter his/her first name:"
        },
        {
        type: "input",
        name: "last",
        message: "Enter his/her last name:"
        },
        {
        type: "input",
        name: "role",
        message: "Enter their role ID number:"
        },
        {
        type: "input",
        name: "manager",
        message: "Enter their manager's ID number:"
        }
    ])
}
}
module.exports = Prompts;