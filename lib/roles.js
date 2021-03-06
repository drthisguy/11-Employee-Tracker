                    const SQL = require("./sql"),
                    UI = require("./ui"),
                    cTable = require("console.table"),
ui = new UI(),
sql = new SQL();

module.exports = class Role {
        constructor() {
          this.home;
        }

  manager(homeMenu) {

    //maintains the scope of the home menu from wherever this function is called.
    this.home = arguments.length > 0 ? homeMenu : this.home;

    ui.roleOpts()
      .then(async ({ option }) => {
        switch (option) {
          case "View all job titles":
            console.clear();
            sql.viewRoles();
            this.manager();
            break;

          case "Create a new position":
            ui.newRole()
              .then(async role => {
                await sql.addRole(role);
                this.manager();
              })
              .catch(err => console.log(err));
            break;

          case "Change a role's title":
            const { id } = await ui.getRoleId();
            const role = await sql.lookUpRoleByID(id);
            ui.getNewRoleName()
              .then(({ name }) => {
                role.title = name;
                sql.updateRoleName(role);
                console.table(role);
                this.manager();
              })
              .catch(err => console.log(err));
            break;

          case "Remove an existing role":
            ui.getRoleId().then(async ({ id }) => {
              const role = await sql.lookUpRoleByID(id);
              ui.rmRole(role)
                .then(async({ confirm }) => {
                  if (confirm) {
                    await sql.rmRole(role);
                    this.manager();
                  } else {
                    this.manager();
                  }
                })
                .catch(err => console.log(err));
            });
            break;

          case "Look up all employess by title":
            ui.getRoleId()
              .then(({ id }) => {
                sql.joinByRoles(id);
                this.manager();
              })
              .catch(err => console.log(err));
            break;

          case "Calculate payroll budgets by job title":
            ui.getRoleId()
              .then(async ({ id }) => {
                await sql.joinEmploysToRoles(id);
                this.manager();
              })
              .catch(err => console.log(err));
            break;
          default:
            //returns to the home screen
            this.home();
        }
      })
      .catch(err => console.log(err));
  } 
}
