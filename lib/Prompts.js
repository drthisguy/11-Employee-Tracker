const inquirer = require('inquirer'),
    line = new inquirer.Separator()


module.exports = class UI {
    
start()   {
    console.clear();
    return inquirer.prompt(
        {
        type: "rawlist",
        name: "catagory",
        prefix: '*',
        message: `Welcome to HR Express. \n${line}\n Choose a catagory would you like to manage.`,
        choices: ["Employees", "Departments", "Job Titles", "Quit"]
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
        choices: ["View all employees",  "Update an employee",  "Add a new employee",  "Find employees by their manager",  "Look up employee by name",  "Look up employee by ID", "Terminate an employee", "Return home"]
        }
    )
}

deptOpts()   {
    return inquirer.prompt(
        {
        type: "rawlist",
        name: "option",
        prefix: '*',
        message: `Department Options:   \n${line}\n`,
        choices: ["View all departments", "Add a new department", "Change a department\'s name",  "Remove a department", "Look up all employess by department",  "Calculate department bugets", "Return home"]
        }
    )
}

newEmployee() {
    console.clear();
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
        },
    ])
}

newDept() {
    console.clear();
    return inquirer.prompt([
        {
        type: "input",
        name: "name",
        message: "Enter the name for your new department:"
        },
    ])
}

confirm(employee) {
    return inquirer.prompt(
        {
        type: "confirm",
        name: "confirm",
        message: `Are you sure you'd like to remove ${employee.first_name} ${employee.last_name}`
        }
    )
  }

getId() {
    console.clear();
    return inquirer.prompt(
        {
        type: "number",
        name: "id",
        message: "Enter their employee id number:"
        }
    )
  }

getDeptId() {
    console.clear();
    return inquirer.prompt(
        {
        type: "number",
        name: "id",
        message: "Enter the department's id number:"
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
    console.clear();
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
        message: `Employee Editor:   \n${line}\n Choose the property would you like to update.`,
        choices: ["First Name", "Last Name", "Role", "Manager", "Quit editor"]
        }
    )
}

  getNewFirst() {
    console.clear();
    return inquirer.prompt(
        {
        type: "input",
        name: "name",
        message: "Enter a new first name: "
        }
    )
  }

  getNewLast() {
    console.clear();
    return inquirer.prompt(
        {
        type: "input",
        name: "name",
        message: "Enter a new last name: "
        }
    )
  }

  getNewDeptName() {
    return inquirer.prompt(
        {
        type: "input",
        name: "name",
        message: "Enter a new department name: "
        }
    )
  }

  getNewRole() {
    console.clear();
    return inquirer.prompt(
        {
        type: "number",
        name: "role",
        message: "Enter a new role id number:"
        }
    )
  }

}
