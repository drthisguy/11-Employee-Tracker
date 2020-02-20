const  mysql = require('mysql'),
        

 connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password:"YourRootPassword",
    database: "tracker_DB"
}); 

connection.connect( err => {
    if (err) {console.log('Error:' + err.message);}
    
    console.log('\nConnected to the database server.');
});


module.exports = class SQL {

        constructor() {

        }

end() {
    connection.end( err => {
        if (err) {console.log('Error:' + err.message)};
    });
    console.log('Closing connection to database...\n');
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

viewDepts() {
    connection.query("SELECT * FROM departments", 
    (err, res) => {
    if (err) throw err;

    console.log('\n');
    console.table('All depatments:', res);
    });
}

viewRoles() {
    connection.query("SELECT * FROM roles", 
    (err, res) => {
    if (err) console.log(err);;

    console.log('\n');
    console.table('All Company Roles:', res);
    });
}

roleChoices(){
return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM roles", 
    (err, res) => {
    if (err) {reject(console.log(err));}
    
     resolve(res);
  });
 }); 
}

lookUpByID(id){
return new Promise((resolve, reject) => {

    connection.query("SELECT * FROM employees WHERE ?",
    { id: id },
    (err, res) => {
    if (err) {reject(console.log(err));}
    
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

lookUpByManager(id) {
return new Promise((resolve, reject) => {

    connection.query(`SELECT * FROM employees WHERE ?`,
    { manager_id: id },
    (err, res) => {
    if (err) {reject(Error(err));}
    
    if (res.length == 0) {

        resolve('\nNo employees found with that manager\n');
        
    } else {
        const [{ manager_id }] = res;
        resolve(console.table(`\nAll employees working under manger: ${manager_id}`, res));
    }});
 }); 
}

lookUpDeptByID(id){
    return new Promise((resolve, reject) => {
    
        connection.query("SELECT * FROM departments WHERE ?",
        { id: id },
        (err, res) => {
        if (err) {reject(console.log(err));}
        
         resolve(res.length == 0 ? false : res)
      });
     }); 
}
    
lookUpRoleByID(id){
return new Promise((resolve, reject) => {

    connection.query("SELECT * FROM roles WHERE ?",
    { id: id },
    (err, res) => {
    if (err) {reject(console.log(err));}
    
        resolve(res.length == 0 ? false : res)
    });
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

addDept(department) {
    connection.query("INSERT INTO departments SET ?", 
    {  department: department },

    err => {if (err) throw err})
    console.log(`\nThe new department ${department} has been added sucessfully!\n`);
}

addRole(role) {
    connection.query("INSERT INTO roles SET ?", 
    {  
        title: role.name,
        dept_id: role.dept 
    },

    err => {if (err) console.log(err)})
    console.log(`\nThe new job title ${role.name} has been added sucessfully!\n`);
}

creatDept(answer) {
    connection.query("INSERT INTO departments SET ?", 
    { name: answer},

    err => { if (err) throw err;
    console.log(`\nNew department ${answer} created sucessfully!`);
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
    console.log(`\nNew role ${answers.title} created sucessfully!`);
    })
    }

updateFirstName(update) {
    connection.query(`UPDATE employees SET ? WHERE ?`,

    [{ first_name: update.first_name }, { id: update.id }],

    err => { if (err) throw err })
    console.log(`\nEmployee: ${update.first_name} ${update.last_name} has been updated sucessfully!\n`);
    
}

updateLastName(update) {
    connection.query(`UPDATE employees SET ? WHERE ?`,

    [{ last_name: update.last_name }, { id: update.id }],
    
    err => { if (err) throw err})
    console.log(`\nEmployee: ${update.first_name} ${update.last_name} has been updated sucessfully!\n`);
}

updateDeptName(update) {
    connection.query(`UPDATE departments SET ? WHERE ?`,

    [{ department: update.name }, { id: update.id }],
    
    err => { if (err) throw err})
    console.log(`\nDepartment # ${update.id} has been changed to: "${update.name}" sucessfully!\n`);
}

updateRoleName(update) {
    connection.query(`UPDATE roles SET ? WHERE ?`,

    [{ title: update.title }, { id: update.id }],
    
    err => { if (err) console.log(err)})
    console.log(`\nRole # ${update.id} has been changed to: "${update.title}" sucessfully!\n`);
}

setNewDept(update) {
    connection.query(`UPDATE departments SET ? WHERE ?`,

    [{ dept_id: update.dept_id }, { id: update.id }],
    
    err => { if (err) throw err})
    console.log(`\nEmployee: ${update.first_name} ${update.last_name} has been updated sucessfully!\n`);
}

setNewRole(update) {
    connection.query(`UPDATE employees SET ? WHERE ?`,

    [{ role_id: update.role_id }, { id: update.id }],
    
    err => { if (err) throw err})
    console.log(`\nEmployee: ${update.first_name} ${update.last_name} has been updated sucessfully!\n`);
}

setNewManger(update) {
    connection.query(`UPDATE employees SET ? WHERE ?`,

    [{ manager_id: update.manager_id }, { id: update.id }],
    
    err => { if (err) throw err})
    console.log(`\nEmployee: ${update.first_name} ${update.last_name} has been updated sucessfully!\n`);
}

terminate(remove) {
    connection.query("DELETE FROM employees WHERE ?",

    [{ id: remove.id }],

    err => { if (err) throw err})
    console.log(`\n${remove.first_name} ${remove.last_name} has been removed from the company database.`);
}

rmDept(remove) {
    connection.query("DELETE FROM departments WHERE ?",

    [{ id: remove.id }],

    console.log(`\nThe department ${remove.department} has been removed from the company database.`),
    err => { if (err) throw err});
}

rmRole(remove) {
    connection.query("DELETE FROM roles WHERE ?",

    [{ id: remove.id }],

    console.log(`\nThe position ${remove.title} has been removed from the company database.`),
    err => { if (err) throw err});
}

joinByDepts(dept) {
    connection.query(`SELECT * FROM employees INNER JOIN departments ON (employees.dept_id = ? AND departments.id = ?)`,
    [dept, dept],

    (err, res) => {
        if (err) console.log(err);

        console.clear();
        const [{ department }] = res;
        console.log(console.table(`All employees from ${department}`, res));
    }
  )
}

joinByRoles(role) {
    connection.query(`SELECT * FROM employees INNER JOIN roles ON (employees.role_id = ? AND roles.id = ?)`,
    [role, role],

    (err, res) => {
        if (err) console.log(err);

        console.clear();
        const [{ title }] = res;
        console.log(console.table(`All employees from ${title}`, res));
    }
  )
}

joinRolesToDepts(dept) {
    connection.query("SELECT * FROM roles INNER JOIN departments ON (roles.dept_id = ? AND departments.id = ?)",
    [dept, dept],

    (err, res) => {
        if (err) console.log(err);
        
        console.clear();

        //get dept budget
        const budget = res.map(x => x.salary).reduce((a, b) => a + b, 0),
        
        [{ department }] = res;
        
        console.log(`${console.table(`${department} Department:`, res)}`);
        console.log(`\nThe payroll budget for ${department} is: ${budget}`);
    }
  )
}

joinEmploysToRoles(role) {
    connection.query("SELECT * FROM roles INNER JOIN employees ON (roles.id = ? AND employees.role_id = ?)",
    [role, role],

    (err, res) => {
        if (err) console.log(err);
        
        console.clear();

        //get job title budget
        const budget = res.map(x => x.salary).reduce((a, b) => a + b, 0),
        
        [{ title }] = res;
        
        console.log(`${console.table(`${title} Department:`, res)}`);
        console.log(`\nThe payroll budget for ${title} is: ${budget}`);
    }
  )
}
}