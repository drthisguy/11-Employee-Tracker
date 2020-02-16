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
                viewEmployees();
                break;

            case 'Find employees by their manager':
                viewEmployees();
                break;

            case 'Look up employee by name':
                viewEmployees();
                break;

            case 'Look up employee by ID':
                viewEmployees();
                break;
            default:
              start();
        }
    })
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

 function viewRoles() {
    connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;

    console.table(res);
 });
}

function addEmployee(answers) {
  connection.query("INSERT INTO employees SET ?", 
    {
        first_name: answers.first,
        last_name: answers.last,
        role_id: answers.role,
        manager_id: answers.manager
    },
    err => { if (err) throw err;
    console.log(`New employee ${answers.first} ${answers.last} added sucessfully!`);})
 }

function creatDept(answer) {
  connection.query("INSERT INTO departments SET ?", 
    {
        name: answer
    },
    err => { if (err) throw err;
    console.log(`New department ${answer} created sucessfully!`);})
 }

function creatRole(answers) {
  connection.query("INSERT INTO departments SET ?", 
    {
        title: answers.title,
        salary: answers.salary,
        dapartment_id: answers.dept
    },
    err => { if (err) throw err;
    console.log(`New role ${answers.title} created sucessfully!`);})
 }

function updateRole(title) {
  connection.query("UPDATE employees SET ?", 
    {
        title: title
    },
    err => { if (err) throw err;
    console.log(`New role ${title} changed sucessfully!`);})
 }

 
