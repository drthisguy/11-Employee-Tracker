const  mysql = require('mysql'),
colors = require("console-colors-2"),
        

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
            this.deleteRoles = 'DELETE FROM roles WHERE ?';
        }

end() {
    connection.end( err => {
        if (err) {console.log('Error:' + err.message)};
    });
    console.log('Closing connection to database...\n');
}

viewEmployees() {
    connection.query("SELECT * FROM employees INNER JOIN departments ON employees.dept_id = departments.id INNER JOIN roles ON departments.id = roles.dept_id",
    (err, res) => {
    if (err) throw err;

    console.log('\n');
    console.table(`${colors.fg.blue}All Employees:${colors.sp.reset}`, res);
    });
}

viewDepts() {
    connection.query(this.allDepts, 
    (err, res) => {
    if (err) throw err;

    console.log('\n');
    console.table(`${colors.fg.blue}All Departments:${colors.sp.reset}`, res);
    });
}

viewRoles() {
    connection.query(this.allRoles, 
    (err, res) => {
    if (err) console.log(err);;

    console.log('\n');
    console.table(`${colors.fg.blue}All Roles:${colors.sp.reset}`, res);
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

lookUpEmpByID(id){
return new Promise((resolve, reject) => {

    connection.query(this.allEmpsWhere,
    { id: id },
    (err, res) => {
    if (err) {reject(console.log(err));}
    
    if (res.length == 0){
    console.log(`\n${colors.fg.red}Employee not found\n${colors.sp.reset}`);
    resolve(false);

    } else {
    const [ employee ] = res;
    console.table(`\n${colors.fg.blue}You have selected:${colors.sp.reset}`, res);
    
    resolve(employee);
    }
  });
 }); 
}

lookUpDeptByID(id){
return new Promise((resolve, reject) => {

    connection.query(this.allDeptsWhere,
        { id: id },
        (err, res) => {
        if (err) {reject(console.log(err));}
        
        if (res.length == 0){
        console.log(`\n${colors.fg.red}Department not found\n${colors.sp.reset}`);
        resolve(false);
    
        } else {
        const [ dept ] = res;
        console.table(`\n${colors.fg.blue}You have selected:${colors.sp.reset}`, res);
        
        resolve(dept);
        }
     });
  })
}

lookUpRoleByID(id){
return new Promise((resolve, reject) => {

    connection.query(this.allRolesWhere,
        { id: id },
        (err, res) => {
        if (err) {reject(console.log(err));}
        
        if (res.length == 0){
        console.log(`\P${colors.fg.red}osition not found${colors.sp.reset}\n`);
        resolve(false);
    
        } else {
        const [ role ] = res;
        console.table(`\n${colors.fg.blue}You have selected:${colors.sp.reset}`, res);
        
        resolve(role);
        }
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

        resolve(`\n${colors.fg.red}Employee not found${colors.sp.reset}\n`);
        
    } else {
        const [{ last_name }] = res;
        resolve(console.table(`\n${colors.fg.blue}Emploee(s) with the name: ${last_name}${colors.sp.reset}`, res));
    }});
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
    console.log(`\nNew employee ${colors.fg.green}${employee.first} ${employee.last} ${colors.sp.reset}added sucessfully!\n`);
}

addDept(department) {
    connection.query(this.insertDepts, 
    {  department: department },

    err => {if (err) throw err})
    console.log(`\nThe new department ${colors.fg.green}"${department}"${colors.sp.reset} has been created sucessfully!\n`);
}

addRole(role) {
    return new Promise((resolve, reject) => {
    connection.query(this.insertRoles, 
    {
        title: role.name,
        salary: role.salary,
        dept_id: role.dept
    },
    err => { if (err) reject(console.log(err));

    console.log(`\nNew role: ${colors.fg.green}"${role.name}" ${colors.sp.reset}has been created sucessfully!\n`);
    resolve();
    })
    })
}
updateFirstName(update) {
    connection.query(this.updtEmps,

    [{ first_name: update.first_name }, { id: update.id }],

    err => { if (err) throw err })
    console.log(`\nEmployee:${colors.fg.green} ${update.first_name} ${update.last_name} ${colors.sp.reset}has been updated sucessfully!\n`);
    
}

updateLastName(update) {
    connection.query(this.updtEmps,

    [{ last_name: update.last_name }, { id: update.id }],
    
    err => { if (err) throw err})
    console.log(`\nEmployee: ${colors.fg.green}${update.first_name} ${update.last_name} ${colors.sp.reset}has been updated sucessfully!\n`);
}

updateDeptName(update) {
    connection.query(this.updtDepts,

    [{ department: update.department }, { id: update.id }],
    
    err => { if (err) throw err})
    console.log(`\nDepartment # ${colors.fg.green}${update.id} ${colors.sp.reset}has been changed to: "${colors.fg.green}${update.department} ${colors.sp.reset}" sucessfully!\n`);
}

updateRoleName(update) {
    connection.query(this.updtRoles,

    [{ title: update.title }, { id: update.id }],
    
    err => { if (err) console.log(err)})
    console.log(`\Role # ${colors.fg.green}${update.id} ${colors.sp.reset}has been changed to: "${colors.fg.green}${update.department}" ${colors.sp.reset}sucessfully!\n`);
}

setNewDept(update) {
    connection.query(this.updtEmps,

    [{ dept_id: update.dept_id }, { id: update.id }],
    
    err => { if (err) throw err})
    console.log(`\nEmployee: ${colors.fg.green}${update.first_name} ${update.last_name} ${colors.sp.reset}has been updated sucessfully!\n`);
}

setNewRole(update) {
    connection.query(this.updtEmps,

    [{ role_id: update.role_id }, { id: update.id }],
    
    err => { if (err) throw err})
    console.log(`\nEmployee: ${colors.fg.green}${update.first_name} ${update.last_name} ${colors.sp.reset}has been updated sucessfully!\n`);
}

terminate(remove) {
    connection.query(this.deleteEmps,

    [{ id: remove.id }],

    err => { if (err) throw err})
    console.log(`\n${colors.fg.red}${remove.first_name} ${remove.last_name} ${colors.sp.reset}has been removed from the company database.`);
}

rmDept(remove) {
    connection.query(this.deleteDepts,

    [{ id: remove.id }],

    console.log(`\nThe department "${colors.fg.red}${remove.department}" ${colors.sp.reset}has been removed from the company database.\n`),
    err => { if (err) throw err});
}

rmRole(remove) { 
    return new Promise((resolve, reject) => {
    connection.query(this.deleteRoles,
    [{ id: remove.id }],

    err => { 
        if (!err) {
        console.log(`\nThe position "${colors.fg.red}${remove.title}${colors.sp.reset}" has been removed from the company database.\n`);
        }
        else if (err.errno === 1451) 
        {console.log(`\n${colors.fg.red}You currently have employees assigned to this position.  Please remove them before removal${colors.sp.reset}\n`);
        
        } else {reject(console.log(err))}},
    ); 
    resolve();
  })
}

joinByManagers(manager) {
    connection.query(`SELECT * FROM employees INNER JOIN departments ON (employees.dept_id = ? AND departments.id = ?)`,
    [manager, manager],

    (err, res) => {
        if (err) console.log(err);

        console.clear();
        const [{ manager }] = res;

        console.table(`All employees working under: ${colors.fg.blue}${manager}${colors.sp.reset}`, res);
    }
  )
}

joinByDepts(dept) {
    connection.query(`SELECT * FROM employees INNER JOIN departments ON (employees.dept_id = ? AND departments.id = ?)`,
    [dept, dept],

    (err, res) => {
        if (err) console.log(err);

        console.clear();
        const [{ department }] = res;

        console.table(`All employees from ${colors.fg.blue}${department}${colors.sp.reset}`, res);
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

        console.table(`All ${colors.fg.blue}${title}${colors.sp.reset}s${colors.sp.reset}`, res);
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
        console.log(`\nThe payroll budget for ${colors.fg.blue}${department}${colors.sp.reset} is: ${colors.fg.green}${budget}.00${colors.sp.reset}`);
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
        
        console.log(`${console.table(`${title} Position:`, res)}`);
        console.log(`\nThe payroll budget for ${colors.fg.blue}${title}s${colors.sp.reset} is: ${colors.fg.green}${budget}.00${colors.sp.reset}`);
    }
  )
}
}