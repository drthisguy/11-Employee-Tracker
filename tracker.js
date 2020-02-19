        const UI = require('./lib/Prompts'),
         SQL = require('./lib/sql'),
         cTable = require('console.table'),

  ui = new UI,
  sql = new SQL;

(function start() { 
    ui.start().then(({ catagory }) => {

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
        sql.end();
        console.log('Have a great day!');
        process.exit([0]);
    }
}).catch( err => console.log(err));
})();

function employeeManager() {

ui.employeeOpts().then(async ({ option }) => {
    
    switch (option) {
        case 'View all employees':
            console.clear();
            sql.viewEmployees();
            employeeManager();
            break;

        case 'Update an employee':
            const { id } = await ui.getId();
            let employee = await findEmployeeById(id, 'arg');
            ui.update().then(({ edit }) => {
                employeeEditor(employee, edit)
                .then( employee => {
                console.table(employee);
                employeeManager();
             }
            )}).catch( err => console.log(err));
            break;

        case 'Add a new employee':
            ui.newEmployee().then( answers => {
                sql.addEmployee(answers);
                employeeManager();
            }).catch( err => console.log(err));
            break;

        case 'Find employees by their manager':
            ui.getManager().then(async ({ id }) => {
                await sql.lookUpByManager(id);
                employeeManager();
                
            }).catch( err => console.log(err));
            break;

        case 'Look up employee by name':
            ui.getName().then(async ({ name }) => {
                await sql.lookUpByName(name);
                employeeManager();
                
            }).catch( err => console.log(err));
            break;

        case 'Look up employee by ID':
            ui.getId().then(({ id }) => {
                findEmployeeById(id);

            }).catch( err => console.log(err));
            break;

        case 'Terminate an employee':
            ui.getId().then(({ id }) => {
                findEmployeeById(id, 'arg')
                .then((employee) => {
                ui.confirm(employee).then(({ confirm }) => {
                if(confirm) {
                    sql.terminate(employee);
                    employeeManager();    
                } else {
                    employeeManager();
                }
                })})
            }).catch( err => console.log(err));
            break;
        default:
            start();
    }
  }).catch( err => console.log(err));
}

function employeeEditor(employee, editType) {
return new Promise((resolve, reject) => {

   try { 
    switch (editType) {
        case 'First Name':
            ui.getNewFirst().then( ({ name }) => {
                employee.first_name = name;
                sql.updateFirstName(employee);
                resolve(employee);
            }).catch(err => {if (err) throw err});
            break;

        case 'Last Name':
            ui.getNewLast().then( ({ name }) => {
                employee.last_name = name;
                sql.updateLastName(employee);
                resolve(employee);
            }).catch(err => {if (err) throw err});
            break;

        case 'Role':
            ui.getNewRole().then( ({ role }) => {
                employee.role_id = role;
                sql.setNewRole(employee);
                resolve(employee);
            }).catch(err => {if (err) throw err});
            break;

        case 'Manager':
            ui.getNewManager().then( ({ manager }) => {
                employee.manager_id = manager;
            }).catch(err => {if (err) throw err});
            resolve(employee);
            return employee;
        default:
            employeeOpts();
    }
    }  catch(err) {reject(console.log((err)))};
 })
}

function findEmployeeById(id, ...args) {
    return new Promise(async resolve => {

        const args = Array.from(arguments),
            res = await sql.lookUpByID(id);

        if (!res) {
            console.log('\nEmployee not found\n');
            employeeManager();

        } else if (args.length > 1) {
            const [ employee ] = res;
            console.clear();
            console.log('\n');
            console.log(`${console.table(`You have selected:`, res)}`);
            resolve(employee);

        } else {
            console.log('\n');
            console.log(`${console.table(`Employee with ID: ${id}`, res)}`);
            employeeManager();
        }
 });
}