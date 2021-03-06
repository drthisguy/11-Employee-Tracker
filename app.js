        const UI = require('./lib/ui'),
           SQL = require("./lib/sql"),
           Dept = require('./lib/depts'),
           Role = require('./lib/roles'),
           Employ = require('./lib/employees'),
           colors = require("console-colors-2"),
  
  sql = new SQL(),
  emp = new Employ,
  dept = new Dept,
  role = new Role,
  ui = new UI;

(function start() {

  const scope = () => start();

  ui.start()
    .then(({ category }) => {
      switch (category) {
        case "Employees":
          emp.manager(scope);
          break;

        case "Departments":
          dept.manager(scope);
          break;

        case "Job Titles":
          role.manager(scope);
          break;

        default:
          // Quit program
          sql.end();
          console.log(`${colors.fg.blue}Have a great day!${colors.sp.reset}`);
          process.exit([0]);
      }
    })
    .catch(err => console.log(err));
})();
