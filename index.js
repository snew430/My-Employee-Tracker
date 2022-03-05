const mainPrompts = require("./utils/mainPrompts");
const {
  insertDpt,
  insertRole,
  insertEmp,
  viewDpt,
  viewEmp,
  viewRole,
  changeEmp,
} = require("./utils/sqlQueries");
const addDpt = require("./utils/addDpt");
const addRole = require("./utils/addRole");
const addEmp = require("./utils/addEmp");
const updateRole = require("./utils/updateRole");
const cTable = require("console.table");

const promptStart = () => {
  mainPrompts().then((answer) => {
    switch (answer.main) {
      case "View All Employees":
        viewEmp()
          .then((employees) => {
            console.table(employees);
          })
          .then(promptStart);
        break;
      case "Add A New Employee":
        viewRole().then((roles) => {
          viewEmp().then((employees) => {
            addEmp(roles, employees).then((employee) => {
              insertEmp(employee).then(promptStart);
            });
          });
        });
        break;
      case "View All Roles":
        viewRole()
          .then((roles) => {
            console.table(roles);
          })
          .then(promptStart);
        break;
      case "Add A New Role":
        viewDpt().then((departments) => {
          addRole(departments).then((role) => {
            insertRole(role).then(promptStart);
          });
        });
        break;
      case "View All Departments":
        viewDpt()
          .then((departments) => {
            console.table(departments);
          })
          .then(promptStart);
        break;
      case "Add A New Department":
        addDpt().then((department) => {
          insertDpt(department.dpt).then(promptStart);
        });
        break;
      case "Update Employee Role":
        viewEmp().then((employees) => {
          viewRole().then((roles) => {
            updateRole(employees, roles).then((newEmployeeRole) => {
              changeEmp(newEmployeeRole).then(promptStart);
            });
          });
        });
        break;
      case "Quit":
        console.log("Goodbye!");
        break;
    }
  });
};

promptStart();
