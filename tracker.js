const Prompt = require('./lib/Prompts'), 
    mysql = require('mysql'),
    cTable = require('console.table'),

 prompt = new Prompt,
 connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password:"YourRootPassword",
    database: "tracker_DB"
}); 
console.log('test');
connection.connect( err => {
    if (err) {console.log(err);}
    
    console.log('\nConnected to the MySQL server.');
});

(start = () => {
prompt.start().then(({ catagory }) => {

    switch (catagory) {
        case 'Employees':
            employeeManager();
            break;

        case 'Departments':
            deptsManager();
            break;

        case 'Job Titles':
            roleManager();
            break;
        default:
           console.log('Have a great day!');
           process.exit([0]);
    }
}).catch( err => console.log(err));
})();

 function employeeManager() {
    prompt.employeeOpts().then(async ({ option }) => {
      
        switch (option) {
            case 'View all employees':
                viewEmployees();
                break;

            case 'Update an employee':
                const { id } = await prompt.getId();
                let employee = await findEmployeeById(id, option);
                prompt.update().then(({ edit }) => {
                    employeeEditor(employee, edit).then( employee => {
                    console.table(employee);
                    employeeManager();
                    }
                )}).catch( err => console.log(err));
                break;

            case 'Add a new employee':
                prompt.newEmployee().then( answers => {
                    addEmployee(answers);
                }).catch( err => console.log(err));
                break;

            case 'Find employees by their manager':
                viewEmployees();
                break;

            case 'Look up employee by name':
                prompt.getName().then(({ name }) => {
                    findEmployeeByName(name);
                }).catch( err => console.log(err));
                break;

            case 'Look up employee by ID':
                prompt.getId().then(({ id }) => {
                    findEmployeeById(id);
                }).catch( err => console.log(err));
                break;
            default:
              start();
        }
    }).catch( err => console.log(err));
 }

function viewDepartments() {
    connection.query("SELECT * FROM departments", (err, res) => {
      if (err) throw err;
  
      console.table(res);
    });
  }

 function viewEmployees() {
    connection.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;

    console.log('\n');
    console.table(res);
    employeeManager();
 });
}

 function findEmployeeById(id, ...args) {
    return new Promise((resolve, reject) => {

        let args = Array.from(arguments);
        connection.query("SELECT * FROM employees WHERE ?",
        { id: id },
        (err, res) => {
        if (err) {console.log(err);}
        if (res.length == 0) {
        console.log('\nEmployee not found\n');
        employeeManager();

        } else if(args.length > 1) {
            console.log(res);
            resolve(res[0]);
        } else {
        console.log('\n');
        console.table(res);
        employeeManager();
  }});
     
   
     }
    )
}

 function findEmployeeByName(name) {
    connection.query(`SELECT * FROM employees WHERE ?`,
    { last_name: name },
    (err, res) => {
    if (err) {console.log(err);}
    
    if (res.length == 0) {
      console.log('\nEmployee not found\n');
      employeeManager();
    } else {
    console.log('\n');
    console.table(res);
    employeeManager();
  }});
}

 function viewRoles() {
    connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;

    console.table(res);
 });
}

function addEmployee(employee) {
  connection.query("INSERT INTO employees SET ?", 
    {
        first_name: employee.first,
        last_name: employee.last,
        role_id: employee.role,
        manager_id: employee.manager
    },
    err => {if (err) throw err})
    console.log(`New employee ${employee.first} ${employee.last} added sucessfully!`);
    employeeManager();
}

function creatDept(answer) {
  connection.query("INSERT INTO departments SET ?", 
    {
        name: answer
    },
    err => { if (err) throw err;
    console.log(`New department ${answer} created sucessfully!`);
  })
 }

function creatNewRole(answers) {
  connection.query("INSERT INTO departments SET ?", 
    {
        title: answers.title,
        salary: answers.salary,
        dapartment_id: answers.dept
    },
    err => { if (err) throw err;
    console.log(`New role ${answers.title} created sucessfully!`);
  })
 }

function updateFirstName(update) {
  connection.query(`UPDATE employees SET ? WHERE ?`,

  [{ first_name: update.first_name }, { id: update.id }],

    err => { if (err) throw err })
    console.log(`\nEmployee: ${update.first_name} ${update.last_name} has been updated sucessfully!`);
  
}

function updateLastName(update) {
  connection.query(`UPDATE employees SET ? WHERE ?`,

  [{ last_name: update.last_name }, { id: update.id }],
  
    err => { if (err) throw err})
    console.log(`\nEmployee: ${update.first_name} ${update.last_name} has been updated sucessfully!`);
}

function employeeEditor(employee, editType) {
   return new Promise((resolve, reject) => {
    
    try { 
        switch (editType) {
            case 'First Name':
                prompt.getNewFirst().then( ({ name }) => {
                    employee.first_name = name;
                    updateFirstName(employee);
                    resolve(employee);
                }).catch(err => {if (err) throw err});
                break;

            case 'Last Name':
                prompt.getNewLast().then( ({ name }) => {
                    employee.last_name = name;
                    updateLastName(employee);
                    resolve(employee);
                }).catch(err => {if (err) throw err});
                break;

            case 'Role':
                prompt.getNewRole().then( ({ role }) => {
                    employee.role_id = role;
                }).catch(err => {if (err) throw err});
                resolve(employee);
                return employee;

            case 'Manager':
                prompt.getNewManager().then( ({ manager }) => {
                    employee.manager_id = manager;
                }).catch(err => {if (err) throw err});
                resolve(employee);
                return employee;
            default:
              employeeOpts();
        }
     }  catch(err) {reject(console.log("Something strange went down!"))};
    })
}
