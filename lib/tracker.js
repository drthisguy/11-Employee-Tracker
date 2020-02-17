        const Prompt = require('./Prompts');
         SQL = require('./sql'),
         cTable = require('console.table'),

prompt = new Prompt,
  sql = new SQL;

class Tracker {
    constructor() {
 this.start =  function start() {
   
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
    };
}
  employeeManager() {
    prompt.employeeOpts().then(async ({ option }) => {
      
        switch (option) {
            case 'View all employees':
                sql.viewEmployees();
                break;

            case 'Update an employee':
                const { id } = await prompt.getId();
                let employee = await sql.findEmployeeById(id, option);
                prompt.update().then(({ edit }) => {
                    employeeEditor(employee, edit).then( employee => {
                    console.table(employee);
                    employeeManager();
                    }
                )}).catch( err => console.log(err));
                break;

            case 'Add a new employee':
                prompt.newEmployee().then( answers => {
                    sql.idaddEmployee(answers);
                }).catch( err => console.log(err));
                break;

            case 'Find employees by their manager':
                viewEmployees();
                break;

            case 'Look up employee by name':
                prompt.getName().then(({ name }) => {
                    sql.findEmployeeByName(name);
                }).catch( err => console.log(err));
                break;

            case 'Look up employee by ID':
                prompt.getId().then(({ id }) => {
                    sql.findEmployeeById(id);
                }).catch( err => console.log(err));
                break;
            default:
              start();
        }
    }).catch( err => console.log(err));
 }


 employeeEditor(employee, editType) {
   return new Promise((resolve, reject) => {
    
    try { 
        switch (editType) {
            case 'First Name':
                prompt.getNewFirst().then( ({ name }) => {
                    employee.first_name = name;
                    sql.updateFirstName(employee);
                    resolve(employee);
                }).catch(err => {if (err) throw err});
                break;

            case 'Last Name':
                prompt.getNewLast().then( ({ name }) => {
                    employee.last_name = name;
                    sql.updateLastName(employee);
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
     }  catch(err) {reject(console.log("Something weird went down!"))};
    })
 }
}
module.exports = Tracker;