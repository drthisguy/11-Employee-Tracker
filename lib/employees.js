           const SQL = require('./sql'),
                UI = require('./ui'),
                cTable = require('console.table'),


ui = new UI,
sql = new SQL;                

module.exports = class Employee {
    constructor() {
        this.home = {};
    }

manager(homeMenu) {
    const args = Array.from(arguments);
     this.home = args.length > 0 ? homeMenu : this.home;

ui.employeeOpts().then(async ({ option }) => {

switch (option) {
    case 'View all employees':
        console.clear();
        sql.viewEmployees();
        this.manager();
        break;

    case 'Update an employee':
        const { id } = await ui.getId();
        let employee = await this.findEmployeeById(id, 'arg');
        ui.update().then(({ edit }) => {
            this.editor(employee, edit)
            .then( employee => {
            console.table(employee);
            this.manager();
            }
        )}).catch( err => console.log(err));
        break;

    case 'Add a new employee':
        ui.newEmployee().then( answers => {
            sql.addEmployee(answers);
            this.manager();
        }).catch( err => console.log(err));
        break;

    case 'Find employees by their manager':
        ui.getManager().then(async ({ id }) => {
            await sql.lookUpByManager(id);
            this.manager();
            
        }).catch( err => console.log(err));
        break;

    case 'Look up employee by name':
        ui.getName().then(async ({ name }) => {
            await sql.lookUpByName(name);
            this.manager();
            
        }).catch( err => console.log(err));
        break;

    case 'Look up employee by ID':
        ui.getId().then(({ id }) => {
            this.findEmployeeById(id);
            this.manager();
        }).catch( err => console.log(err));
        break;

    case 'Terminate an employee':
        ui.getId().then(async ({ id }) => {
            const employee = await this.findEmployeeById(id, 'arg')
            ui.confirm(employee).then(({ confirm }) => {
                if(confirm) {
                    sql.terminate(employee);
                    this.manager();    
                } else {
                    this.manager();
                }
                }).catch( err => console.log(err));
            })
            break;
    default:
        //returns to the home screen
        this.home();
}
}).catch( err => console.log(err));
}
    
editor(employee, editType) {
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

        case 'Department':
            ui.getNewDeptId().then( ({ dept }) => {
                employee.dept_id = dept;
                sql.setNewDept(employee);
                resolve(employee);
            }).catch(err => {if (err) throw err});
            break;

        case 'Role':
            ui.getNewRole().then( role => {
                employee.role_id = role;
                sql.setNewRole(employee);
                resolve(employee);
            }).catch(err => {if (err) throw err});
            break;

        case 'Manager':
            ui.getNewManager().then( ({ manager }) => {
                employee.manager_id = manager;
                sql.setNewManger(employee);
                resolve(employee);
            }).catch(err => {if (err) throw err});
            return employee;
        default:
            this.manager();
    }
    }  catch(err) {reject(console.log((err)))};
    })
}
    
findEmployeeById(id) {
    return new Promise(async resolve => {

        const res = await sql.lookUpByID(id);

        if (!res) {
            console.log('\nEmployee not found\n');
            this.manager();

         } else {
        console.clear();
        
        const [ employee ] = res;
        console.table(`You have selected:`, res);
        
        resolve(employee);
        } 
    });
}
}