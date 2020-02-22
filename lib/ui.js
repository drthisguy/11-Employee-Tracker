const inquirer = require('inquirer'),
    colors = require("console-colors-2"),
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
        message: `${colors.fg.green}Welcome to HR Express.${colors.sp.reset} \n${line}\n Choose a catagory would you like to manage.`,
        choices: ["Employees", "Departments", "Job Titles", `${colors.fg.red}Quit HR Express${colors.sp.reset}`]
        }
    )
}

employeeOpts()   {
    return inquirer.prompt(
        {
        type: "rawlist",
        name: "option",
        prefix: '\n*',
        message: `${colors.fg.green}Employee Options:${colors.sp.reset} \n${line}\n`,
        choices: ["View all employees",  "Update an employee",  "Add a new employee",  "Find employees by their manager",  "Look up employee by name",  "Look up employee by ID", "Terminate an employee", `${colors.fg.blue}Return home${colors.sp.reset}`, `${line}`]
        }
    )
}

deptOpts()   {
    return inquirer.prompt(
        {
        type: "rawlist",
        name: "option",
        prefix: '\n*',
        message: `${colors.fg.green}Department Options:${colors.sp.reset}   \n${line}\n`,
        choices: ["View all departments", "Add a new department", "Change a department\'s name",  "Remove a department", "Look up all employess by department",  "Calculate a department's payroll budgets", `${colors.fg.blue}Return home${colors.sp.reset}`, `${line}`]
        }
    )
}

roleOpts()   {
    return inquirer.prompt(
        {
        type: "rawlist",
        name: "option",
        prefix: '\n*',
        message: `${colors.fg.green}JOb Titles:${colors.sp.reset}   \n${line}\n`,
        choices: ["View all job titles", "Create a new position", "Change a role\'s title",  "Remove an existing role", "Look up all employess by title",  "Calculate payroll budgets by job title", `${colors.fg.blue}Return home${colors.sp.reset}`, `${line}`]
        }
    )
}

async newEmployee() {
    console.clear();

        //generate ui choices from db
        const roleRes = await sql.roleChoices(),
            roleChoices = roleRes.map(x => x.title),
            deptRes = await sql.deptChoices(),
            deptChoices = deptRes.map(x => x.department),


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
        name: "dept",
        message: "Select his/her department: ",
        choices: deptChoices
        },
        {
        type: "rawlist",
        name: "role",
        message: "Select his/her position: ",
        choices: roleChoices
        }
    ]),

      [ role ] = roleRes.filter(a => a.title === input.role),
      [ dept ] = deptRes.filter(a => a.department === input.dept);
    
      input.role = role.id;
      input.dept = dept.id;
    
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

async newRole() {
    console.clear();

        const res = await sql.deptChoices(),
         options =  res.map(x => x.department),

    input = await inquirer.prompt([
        {
        type: "input",
        name: "name",
        message: "Enter a name for your new Job title:"
        },
        {
        type: "rawlist",
        name: "dept",
        message: "Select a department for this position: ",
        choices: options
        },
        {
        type: "number",
        name: "salary",
        message: "Enter the annual salary for this  position:"
        },
    ]),
    [ dept ] = res.filter(a => a.department === input.dept);
    input.dept = dept.id;
    return input;
}

confirm(employee) {
    return inquirer.prompt(
        {
        type: "confirm",
        name: "confirm",
        message: `${colors.fg.red}Are you sure you'd like to remove ${employee.first_name} ${employee.last_name}?${colors.sp.reset}`
        }
    )
  }

rmDept(department) {
    return inquirer.prompt(
        {
        type: "confirm",
        name: "confirm",
        message: `${colors.fg.red}Are you sure you'd like to remove the ${department.department} department?${colors.sp.reset}`
        }
    )
  }

rmRole(role) {
    return inquirer.prompt(
        {
        type: "confirm",
        name: "confirm",
        message: `${colors.fg.red}Are you sure you'd like to remove the ${role.title} position?${colors.sp.reset}`
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

async getDeptId() {
    console.clear();

        const res = await sql.deptChoices(),
          options =  res.map(x => x.department),

    answer =  await inquirer.prompt(
        {
        type: "rawlist",
        name: "dept",
        message: "Select a department: ",
        choices: options
        },
    ),
    [ dept ] = res.filter(a => a.department === answer.dept);
    return dept;
  }

async getRoleId() {
    console.clear();

        const res = await sql.roleChoices(),
          options =  res.map(x => x.title),

    answer =  await inquirer.prompt(
        {
        type: "rawlist",
        name: "role",
        message: "Select a job title: ",
        choices: options
        },
    ),
    [ role ] = res.filter(a => a.title === answer.role);
    return role;
  }

async getManager() {
    console.clear();

    const res = await sql.deptChoices();

    let options = res.map(x => x.manager);
      options = options.filter(x => x !== null);
     
    const answer = await inquirer.prompt(
        {
        type: "rawlist",
        name: "manager",
        message: "Select a manager to search: ",
        choices: options
       }
    ),

    [ manager ] = res.filter(a => a.manager === answer.manager);
    console.log(manager);
    return manager.id;
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
        message: `${colors.fg.green}Employee Editor:${colors.sp.reset}   \n${line}\n Choose the employee property would you like to update.`,
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

async getNewDeptId() {
    console.clear();

       const res = await sql.deptChoices(),
         options =  res.map(x => x.department),

    answer =  await inquirer.prompt(
        {
        type: "rawlist",
        name: "dept",
        message: "Select their new department: ",
        choices: options
        },
    ),
    [ dept ] = res.filter(a => a.department === answer.dept);
    return dept;
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

}