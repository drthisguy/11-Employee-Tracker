        const UI = require('./lib/ui'),
           Dept = require('./lib/depts'),
           Employ = require('./lib/employees'),

  ui = new UI,
  dept = new Dept,
  emp = new Employ;

(function start() {

  const scope = () => start();

  ui.start()
    .then(({ catagory }) => {
      switch (catagory) {
        case "Employees":
          emp.manager(scope);
          break;

        case "Departments":
          dept.manager(scope);
          break;

        case "Job Titles":
          roleManager(scope);
          break;

        default:
          // Quit program
          sql.end();
          console.log("Have a great day!");
          process.exit([0]);
      }
    })
    .catch(err => console.log(err));
})();
