const UI = require('./lib/Prompts'),
SQL = require('./lib/sql'),
cTable = require('console.table'),

ui = new UI,
sql = new SQL;

function deptManager() {

    ui.deptOpts().then(async ({ option }) => {
        
        switch (option) {
            case 'View all departments':
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
    