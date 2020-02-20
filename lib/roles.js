const SQL = require("./sql"),
  UI = require("./ui"),
  cTable = require("console.table"),
  ui = new UI(),
  sql = new SQL();

module.exports = class Deptartment {
  manager(homeMenu) {

    ui.deptOpts()
      .then(async ({ option }) => {

        switch (option) {
          case "View all job titles":
            console.clear();
            sql.viewRoles();
            this.manager();
            break;
            
         case "Add a new role":
            ui.newRole()
            .then(name => {
                sql.addDept(name);
                this.manager();
            })
            .catch(err => console.log(err));
            break;

          case "Change a role\'s title":
            const { id } = await ui.getRoletId();
            const role = await this.findRoleById(id);
            ui.getNewRoleName()
              .then(({ name }) => {
                role.role = name;
                sql.updateRoleName(role);
                console.table(role);
                this.manager();
              })
              .catch(err => console.log(err));
            break;


          case "Remove an existing role":
            ui.getDeptId().then(async ({ id }) => {
              const dept = await this.findDeptById(id);
              ui.rmDept(dept)
                .then(({ confirm }) => {
                  if (confirm) {
                    sql.rmDept(dept);
                    this.manager();
                  } else {
                    this.manager();
                  }
                })
                .catch(err => console.log(err));
            });
            break;

          case "Look up all employess by title":
            ui.getDeptId()
              .then(({ id }) => {
                sql.joinByDepts(id);
                this.manager();
              })
              .catch(err => console.log(err));
            break;

          case "Calculate payroll budgets by job title":
            ui.getDeptId()
              .then(async ({ id }) => {
                await sql.joinRolesToDepts(id);
                this.manager();
              })
              .catch(err => console.log(err));
            break;
          default:
            //returns to the home screen
            homeMenu();
        }
      })
      .catch(err => console.log(err));
  }

  findRoleById(id) {
    return new Promise(async resolve => {
      const res = await sql.lookUpDeptByID(id);

      if (!res) {
        console.log("\nNo such job title found\n");
        this.manager();
      } else {
        console.clear();

        const [role] = res;
        console.log(`${console.table(`You have selected:`, res)}`);

        resolve(role);
      }
    });
  }
};
