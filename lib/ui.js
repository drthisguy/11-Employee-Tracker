const inquirer = require('inquirer'),
            SQL = require("./sql"),

sql = new SQL,
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
        choices: ["Employees", "Departments", "Job Titles", "Quit HR Express"]
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
        choices: ["View all employees",  "Update an employee",  "Add a new employee",  "Find employees by their manager",  "Look up employee by name",  "Look up employee by ID", "Terminate an employee", "Return home", `${line}`]
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
        choices: ["View all departments", "Add a new department", "Change a department\'s name",  "Remove a department", "Look up all employess by department",  "Calculate a department's payroll budgets", "Return home", `${line}`]
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
        choices: ["View all job titles", "Add a new role", "Change a role\'s title",  "Remove an existing role", "Look up all employess by title",  "Calculate payroll budgets by job title", "Return home", `${line}`]
        }
    )
}

async newEmployee() {
    console.clear();

        //generate ui choices from db
        const roleRes = await sql.roleChoices(),
            roleChoices = roleRes.map(x => x.title),
            manRes = await sql.managerChoices(),
            manChoices = manRes.map(x => x.manager),


    input =  await inquirer.prompt([
        {
        type: "input",
        name: "first",
        message: "Enter their first name: "
        },
        {
        type: "input",
        name: "last",
        message: "Enter their last name: "
        },
        {
        type: "rawlist",
        name: "role",
        message: "Select his/her position: ",
        choices: roleChoices
        },
        {
        type: "rawlist",
        name: "manager",
        message: "Select his/her manger: ",
        choices: manChoices
        }
    ]);
        console.log(input);
      const [ role ] = roleRes.filter(a => a.title === input.role),
      [ manager ] = manRes.filter(a => a.manager === input.manager);
    console.log(role);
      input.role = role.id;
      input.manager = manager.id;
    
      return input;

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
        message: "Enter a name for your new Job title:"
        },
        {
        type: "number",
        name: "dept",
        message: "Enter the department ID# for this new position:"
        },
        {
        type: "number",
        name: "salary",
        message: "Enter the annual salary for this  position:"
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
        message: `Are you sure you'd like to remove the ${department.department} department?`
        }
    )
  }

rmRole(role) {
    return inquirer.prompt(
        {
        type: "confirm",
        name: "confirm",
        message: `Are you sure you'd like to remove the ${role.title} position?`
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

getRoleId() {
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


async getNewRole() {
    console.clear();

        //generate ui choices from db
        const response = await sql.roleChoices(),
            options = response.map(x => x.title),
        
      choice =  await inquirer.prompt(
        {
            type: "rawlist",
            name: "role",
            message: "Select a new role:",
            choices: options
        }
    ),
    [ role ] = response.filter(a => a.title === choice.role);
    return role.id;
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

getNewRoleName() {
    return inquirer.prompt(
        {
            type: "input",
            name: "name",
            message: "Enter a name for your new role: "
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