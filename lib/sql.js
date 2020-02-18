const  mysql = require('mysql'),
        

 connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password:"YourRootPassword",
    database: "tracker_DB"
}); 

connection.connect( err => {
    if (err) {console.log(err);}
    
    console.log('\nConnected to the MySQL server.');
});


module.exports = class SQL {
        constructor(){

        }

viewDepartments() {
    connection.query("SELECT * FROM departments", (err, res) => {
        if (err) throw err;
    
        console.table(res);
    });
 }

viewEmployees() {
    connection.query("SELECT * FROM employees", 
    (err, res) => {
    if (err) throw err;

    console.log('\n');
    console.table('All Employees:', res);
    });
}

lookUpByID(id){
return new Promise((resolve, reject) => {

    connection.query("SELECT * FROM employees WHERE ?",
    { id: id },
    (err, res) => {
    if (err) {console.log(err);}
    
     resolve(res.length == 0 ? false : res)
  });
 }); 
}

lookUpByName(name) {
return new Promise((resolve, reject) => {

    connection.query(`SELECT * FROM employees WHERE ?`,
    { last_name: name },
    (err, res) => {
    if (err) {reject(Error(err));}
    
    if (res.length == 0) {

        resolve('\nEmployee not found\n');
        
    } else {
        const [{ last_name }] = res;
        resolve(console.table(`\nEmploee(s) with the name: ${last_name}`, res));
    }});
 }); 
}

viewRoles() {
    connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;

    console.table(res);
    });
}

addEmployee(employee) {
    connection.query("INSERT INTO employees SET ?", 
    {
        first_name: employee.first,
        last_name: employee.last,
        role_id: employee.role,
        manager_id: employee.manager
    },
    err => {if (err) throw err})
    console.log(`\nNew employee ${employee.first} ${employee.last} added sucessfully!\n`);
}

creatDept(answer) {
    connection.query("INSERT INTO departments SET ?", 
    {
        name: answer
    },
    err => { if (err) throw err;
    console.log(`New department ${answer} created sucessfully!`);
    })
    }

creatNewRole(answers) {
    connection.query("INSERT INTO roles SET ?", 
    {
        title: answers.title,
        salary: answers.salary,
        dapartment_id: answers.dept
    },
    err => { if (err) throw err;
    console.log(`New role ${answers.title} created sucessfully!`);
    })
    }

updateFirstName(update) {
    connection.query(`UPDATE employees SET ? WHERE ?`,

    [{ first_name: update.first_name }, { id: update.id }],

    err => { if (err) throw err })
    console.log(`\nEmployee: ${update.first_name} ${update.last_name} has been updated sucessfully!`);
    
}

updateLastName(update) {
    connection.query(`UPDATE employees SET ? WHERE ?`,

    [{ last_name: update.last_name }, { id: update.id }],
    
    err => { if (err) throw err})
    console.log(`\nEmployee: ${update.first_name} ${update.last_name} has been updated sucessfully!`);
}
}