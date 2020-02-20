const inquirer = require('inquirer'),
    line = new inquirer.Separator();


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
        choices: ["View all departments", "Add a new department", "Change a department\'s name",  "Remove a department", "Look up all employess by department",  "Calculate a department's payroll budgets", "Return home"]
        }
    )
}

roleOpts()   {
    return inquirer.prompt(
        {
        type: "rawlist",
        name: "option",
        prefix: '*',
        message: `JOb Titles:   \n${line}\n`,
        choices: ["View all job titles", "Add a new role", "Change a role\'s title",  "Remove an existing role", "Look up all employess by title",  "Calculate payroll budgets by job title", "Return home"]
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

newRole() {
    console.clear();
    return inquirer.prompt([
        {
        type: "input",
        name: "name",
        message: "Enter the name for your new Job title:"
        },
    ])
}

confirm(employee) {
    return inquirer.prompt(
        {
        type: "confirm",
        name: "confirm",
        message: `Are you sure you'd like to remove ${employee.first_name} ${employee.last_name}?`
        }
    )
  }

rmDept(department) {
    return inquirer.prompt(
        {
        type: "confirm",
        name: "confirm",
        message: `Are you sure you'd like to remove the ${department.name} department?`
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

getRoletId() {
    console.clear();
    return inquirer.prompt(
        {
        type: "number",
        name: "id",
        message: "Enter your role id number:"
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
        message: `Employee Editor:   \n${line}\n Choose the employee property would you like to update.`,
        choices: ["First Name", "Last Name", "Department", "Role", "Manager", "Quit editor"]
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

getNewDeptName() {
    return inquirer.prompt(
        {
            type: "input",
            name: "name",
            message: "Enter a new department name: "
        }
        )
    }

getNewDeptId() {
    console.clear();
    return inquirer.prompt(
        {
        type: "number",
        name: "dept",
        message: "Enter a new department ID number: "
        }
    )
}

getNewManager() {
    console.clear();
    return inquirer.prompt(
        {
        type: "number",
        name: "manager",
        message: "Enter a new manger's ID number: "
        }
    )
}
}