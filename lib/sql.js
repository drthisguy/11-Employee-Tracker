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
    
    console.log(`\nConnected to the database server as ID: ${connection.threadId}.`);
});


module.exports = class SQL {

        constructor() {
            this.allEmps = 'SELECT * FROM employees',
            this.allDepts = 'SELECT * FROM departments',
            this.allRoles = 'SELECT * FROM roles',
            this.allEmpsWhere = 'SELECT * FROM employees WHERE ?',
            this.allDeptsWhere = 'SELECT * FROM departments WHERE ?',
            this.allRolesWhere = 'SELECT * FROM roles WHERE ?',
            this.insertEmps = 'INSERT INTO employees SET ?',
            this.insertDepts = 'INSERT INTO departments SET ?',
            this.insertRoles = 'INSERT INTO roles SET ?',
            this.updtEmps = 'UPDATE employees SET ? WHERE ?',
            this.updtDepts = 'UPDATE departments SET ? WHERE ?',
            this.updtRoles = 'UPDATE roles SET ? WHERE ?',
            this.deleteEmps = 'DELETE FROM employees WHERE ?',
            this.deleteDepts = 'DELETE FROM departments WHERE ?',
            this.deleteRoles = 'DELETE FROM roles WHERE ?'
        }

end() {
    connection.end( err => {
        if (err) {console.log('Error:' + err.message)};
    });
    console.log('Closing connection to database...\n');
}

viewEmployees() {
    connection.query(this.allEmps, 
    (err, res) => {
    if (err) throw err;

    console.log('\n');
    console.table('All Employees:', res);
    });
}

viewDepts() {
    connection.query(this.allDepts, 
    (err, res) => {
    if (err) throw err;

    console.log('\n');
    console.table('All depatments:', res);
    });
}

viewRoles() {
    connection.query(this.allRoles, 
    (err, res) => {
    if (err) console.log(err);;

    console.log('\n');
    console.table('All Company Roles:', res);
    });
}

deptChoices(){
return new Promise((resolve, reject) => {
    connection.query(this.allDepts, 
    (err, res) => {
    if (err) {reject(console.log(err));}
    
     resolve(res);
  });
 }); 
}

roleChoices(){
return new Promise((resolve, reject) => {
    connection.query(this.allRoles, 
    (err, res) => {
    if (err) {reject(console.log(err));}
    
     resolve(res);
  });
 }); 
}

deptChoices(){
return new Promise((resolve, reject) => {
    connection.query(this.allDepts,
    (err, res) => {
    if (err) {reject(console.log(err));}
    
     resolve(res);
  });
 }); 
}

lookUpByID(id){
return new Promise((resolve, reject) => {

    connection.query(this.allEmpsWhere,
    { id: id },
    (err, res) => {
    if (err) {reject(console.log(err));}
    
     resolve(res.length == 0 ? false : res)
  });
 }); 
}

lookUpByName(name) {
return new Promise((resolve, reject) => {

    connection.query(this.allEmpsWhere,
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

joinByManagers(manager) {
    connection.query(`SELECT * FROM employees INNER JOIN departments ON (employees.dept_id = ? AND departments.id = ?)`,
    [manager, manager],

    (err, res) => {
        if (err) console.log(err);

        console.log(res);
        console.clear();
        const [{ manager }] = res;
        console.log(console.table(`All employees working under: ${manager}`, res));
    }
  )
}

lookUpByManager(id) {
return new Promise((resolve, reject) => {

    connection.query(this.allEmpsWhere,
    { manager_id: id },
    (err, res) => {
    if (err) {reject(console.log(err));}
    
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
    
        connection.query(this.allDeptsWhere,
        { id: id },
        (err, res) => {
        if (err) {reject(console.log(err));}
        
         resolve(res.length == 0 ? false : res)
      });
     }); 
}
    
lookUpRoleByID(id){
return new Promise((resolve, reject) => {

    connection.query(this.allRolesWhere,
    { id: id },
    (err, res) => {
    if (err) {reject(console.log(err));}
    
        resolve(res.length == 0 ? false : res)
    });
   }); 
}

addEmployee(employee) {
    connection.query(this.insertEmps, 
    {
        first_name: employee.first,
        last_name: employee.last,
        dept_id: employee.dept,
        role_id: employee.role
        
    },
    err => {if (err) throw err})
    console.log(`\nNew employee ${employee.first} ${employee.last} added sucessfully!\n`);
}

addDept(department) {
    connection.query(this.insertDepts, 
    {  department: department },

    err => {if (err) throw err})
    console.log(`\nThe new department ${department} has been created sucessfully!\n`);
}

addRole(role) {
    connection.query(this.insertRoles, 
    {
        title: role.title,
        salary: role.salary,
        dapartment_id: role.dept
    },
    err => { if (err) throw err;
    console.log(`\nNew role ${role.title} has been created sucessfully!`);
    })
    }

updateFirstName(update) {
    connection.query(this.updtEmps,

    [{ first_name: update.first_name }, { id: update.id }],

    err => { if (err) throw err })
    console.log(`\nEmployee: ${update.first_name} ${update.last_name} has been updated sucessfully!\n`);
    
}

updateLastName(update) {
    connection.query(this.updtEmps,

    [{ last_name: update.last_name }, { id: update.id }],
    
    err => { if (err) throw err})
    console.log(`\nEmployee: ${update.first_name} ${update.last_name} has been updated sucessfully!\n`);
}

updateDeptName(update) {
    connection.query(this.updtDepts,

    [{ department: update.name }, { id: update.id }],
    
    err => { if (err) throw err})
    console.log(`\nDepartment # ${update.id} has been changed to: "${update.name}" sucessfully!\n`);
}

updateRoleName(update) {
    connection.query(this.updtRoles,

    [{ title: update.title }, { id: update.id }],
    
    err => { if (err) console.log(err)})
    console.log(`\nRole # ${update.id} has been changed to: "${update.title}" sucessfully!\n`);
}

setNewDept(update) {
    connection.query(this.updtEmps,

    [{ dept_id: update.dept_id }, { id: update.id }],
    
    err => { if (err) throw err})
    console.log(`\Employee: ${update.first_name} ${update.last_name} has been updated sucessfully!\n`);
}

setNewRole(update) {
    connection.query(this.updtEmps,

    [{ role_id: update.role_id }, { id: update.id }],
    
    err => { if (err) throw err})
    console.log(`\nEmployee: ${update.first_name} ${update.last_name} has been updated sucessfully!\n`);
}

setNewManger(update) {
    connection.query(this.updtEmps,

    [{ manager_id: update.manager_id }, { id: update.id }],
    
    err => { if (err) throw err})
    console.log(`\nEmployee: ${update.first_name} ${update.last_name} has been updated sucessfully!\n`);
}

terminate(remove) {
    connection.query(this.deleteEmps,

    [{ id: remove.id }],

    err => { if (err) throw err})
    console.log(`\n${remove.first_name} ${remove.last_name} has been removed from the company database.`);
}

rmDept(remove) {
    connection.query(this.deleteDepts,

    [{ id: remove.id }],

    console.log(`\nThe department ${remove.department} has been removed from the company database.`),
    err => { if (err) throw err});
}

rmRole(remove) {
    connection.query(this.deleteRoles,

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