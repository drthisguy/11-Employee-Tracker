        const   SQL = require('./sql'),
                 UI = require('./ui'),
                cTable = require('console.table'),

ui = new UI,
sql = new SQL;

module.exports = class Deptartment {

    constructor() {
        this.home = {};
    }

manager(homeMenu) {

    const args = Array.from(arguments)
    this.home = args.length > 0 ? homeMenu : this.home;

  ui.deptOpts().then(async ({ option }) => {
    
    switch (option) {
        case 'View all departments':
            console.clear();
            sql.viewDepts();
            this.manager();
            break;

        case 'Add a new department':
            ui.newDept().then( ({ name }) => {
                sql.addDept(name);
                this.manager();

            }).catch( err => console.log(err));
            break;

        case 'Change a department\'s name':
            const { id } = await ui.getDeptId();
            const dept = await this.findDeptById(id);
            ui.getNewDeptName().then(({ name }) => {
                dept.department = name;
                sql.updateDeptName(dept)
                console.table(dept);
                this.manager();
                
            }).catch( err => console.log(err));
            break;

        case 'Remove a department':
            ui.getDeptId().then(async ({ id }) => {
                const dept = await this.findDeptById(id);
                ui.rmDept(dept).then(({ confirm }) => {
                    if(confirm) {
                        sql.rmDept(dept);
                        this.manager();
                    } else {
                        this.manager();
                    }
                }).catch( err => console.log(err));
            })
            break;

        case 'Look up all employess by department':
            ui.getDeptId().then( ({ id }) => {
                sql.joinByDepts(id);
                this.manager();
                
            }).catch( err => console.log(err));
            break;

        case 'Calculate a department\'s payroll budgets':
            ui.getDeptId().then(async ({ id }) => {
                await sql.joinRolesToDepts(id);
                this.manager();

            }).catch( err => console.log(err));
            break;
        default:
            //returns to the home screen
            this.home();
    }
    }).catch( err => console.log(err));
  }

 findDeptById(id) {
  return new Promise(async resolve => {

        const res = await sql.lookUpDeptByID(id);

    if (!res) {
        console.log('\nDepartment not found\n');
        this.manager();

    } else {
        console.clear();
        
        const [ dept ] = res;
        console.log(`${console.table(`You have selected:`, res)}`);
        
        resolve(dept);
    } 
 });
}

}
