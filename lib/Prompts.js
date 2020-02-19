const inquirer = require('inquirer'),
    line = new inquirer.Separator()


module.exports = class UI {
    
start()   {
    return inquirer.prompt(
        {
        type: "rawlist",
        name: "catagory",
        message: "Welcome to HR Express.  \n Choose a catagory would you like to manage.",
        choices: ["Employees", "Deparments", "Job Titles", "Quit"]
        }
    )
}

employeeOpts()   {
    return inquirer.prompt(
        {
        type: "rawlist",
        name: "option",
        prefix: '*',
        message: `Employee Options:   \n${line}\n`,
        choices: ["View all employees",  "Update an employee",  "Add a new employee",  "Find employees by their manager",  "Look up employee by name",  "Look up employee by ID",  "Return home"]
        }
    )
}

newEmployee() {
    return inquirer.prompt([
        {
        type: "input",
        name: "first",
        message: "Enter their first name:"
        },
        {
        type: "input",
        name: "last",
        message: "Enter their last name:"
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
        message: "Enter their employee id number:"
        }
    )
  }

getManager() {
    console.clear();
    return inquirer.prompt(
        {
        type: "number",
        name: "id",
        message: "Enter your manager's id number:"
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
        prefix: '*',
        message: `\nEmployee Editor:   \n${line}\n Choose the property would you like to update.`,
        choices: ["First Name", "Last Name", "Role", "Manager", "Quit editor"]
        }
    )
}

  getNewFirst() {
    return inquirer.prompt(
        {
        type: "input",
        name: "name",
        message: "Enter a new first name: "
        }
    )
  }

  getNewLast() {
    return inquirer.prompt(
        {
        type: "input",
        name: "name",
        message: "Enter a new last name: "
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
        message: "Enter a new manager id number: "
        }
    )
  }
}
