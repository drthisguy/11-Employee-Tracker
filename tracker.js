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

connection.connect( err => {
    if (err) throw err;
});
start();
function start() {
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
}

function employeeManager() {
    
    prompt.employeeOpts().then( ({ option }) => {
      
        switch (option) {
            case 'View all employees':
                viewEmployees();
                break;

            case 'Update an employee':
                viewEmployees();
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

 function findEmployeeById(id) {
    connection.query("SELECT * FROM employees WHERE ?",
    { id: id },
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

function updateEmployee(employee) {
  connection.query("UPDATE employees SET ?", 
  {
    first_name: employee.first,
    last_name: employee.last,
    role_id: employee.role,
    manager_id: employee.manager
  },
    `WHERE ID = ${employee.id}`,
    err => { if (err) throw err;
    console.log(`Employee: ${employee.first} ${employee.last} has been updated sucessfully!`);
  })
}

 
