const inquirer = require('inquirer'),
separator = new inquirer.Separator();


class Prompts {
    
start()   {
    return inquirer.prompt(
        {
        type: "list",
        name: "catagory",
        message: "Welcome to HR Express.  \n Which company catagory would you like to manage?",
        choices: ["Employees", separator, "Deparments", separator, "Job Titles", separator, "Quit"]
        }
    )
}

employeeOpts()   {
    return inquirer.prompt(
        {
        type: "rawlist",
        name: "option",
        message: "How would you like to manage your employees?\n",
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

getId() {
    return inquirer.prompt(
        {
        type: "number",
        name: "id",
        message: "Enter his/her employee id number:"
        }
    )
  }

getName() {
    return inquirer.prompt(
        {
        type: "input",
        name: "name",
        message: "Enter your employee's last name:"
        }
    )
  }

  update()   {
    return inquirer.prompt(
        {
        type: "rawlist",
        name: "edit",
        message: "Which property would you like to edit?",
        choices: ["First Name", separator, "Last Name", separator, "Role", separator, "Manager", separator, "Quit editor", separator]
        }
    )
}

  getNewFirst() {
    return inquirer.prompt(
        {
        type: "input",
        name: "name",
        message: "Enter a new first name:"
        }
    )
  }

  getNewLast() {
    return inquirer.prompt(
        {
        type: "input",
        name: "name",
        message: "Enter a new last name:"
        }
    )
  }

  getNewRole() {
    return inquirer.prompt(
        {
        type: "number",
        name: "role",
        message: "Enter a new role id number:"
        }
    )
  }

  getNewManager() {
    return inquirer.prompt(
        {
        type: "number",
        name: "manager",
        message: "Enter a new manager id number:"
        }
    )
  }
}
module.exports = Prompts;