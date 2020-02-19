        const  SQL = require('./sql'),
            UI = require('./Prompts'),
            cTable = require('console.table'),

ui = new UI,
sql = new SQL;

module.exports = class Deptartment {

deptManager() {

ui.deptOpts().then(async ({ option }) => {
    
    switch (option) {
        case 'View all departments':
            console.clear();
            sql.viewDepts();
            this.deptManager();
            break;

        case 'Change a department\'s name':
            const { id } = await ui.getDeptId();
            let dept = await this.findDeptById(id, 'arg');
            ui.getNewDeptName().then(({ name }) => {
                dept.name = name;
                sql.updateDeptName(dept)
                console.table(dept);
                this.deptManager();
                
            }).catch( err => console.log(err));
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
            //returns to the home screen
            start();
    }
    }).catch( err => console.log(err));
  }

 findDeptById(id) {
  return new Promise(async resolve => {

        const res = await sql.lookUpDeptByID(id);

    if (!res) {
        console.log('\nDepartment not found\n');
        employeeManager();

    } else {
        const [ dept ] = res;
        console.clear();
        console.log('\n');
        console.log(`${console.table(`You have selected:`, res)}`);
        resolve(dept);

    } 
 });
}

}
