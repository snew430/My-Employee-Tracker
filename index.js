const mainPrompts = require("./utils/mainPrompts");
const {
  getRoles,
  insertDpt,
  viewDpt,
  viewEmp,
  viewRole,
} = require("./utils/sqlRoutes");
const addDpt = require("./utils/addDpt");

const promptStart = () => {
  mainPrompts().then((answer) => {
    switch (answer.main) {
      case "View All Employees":
        viewEmp().then(promptStart);
        break;
      case "Add A New Employee":
        break;
      case "View All Roles":
        viewRole().then(promptStart);
        break;
      case "Add A New Role":
        break;
      case "View All Departments":
        viewDpt().then(promptStart);
        break;
      case "Add A New Department":
        addDpt().then((department) => {
          insertDpt(department.dpt).then(promptStart);
        });
        break;
      case "Make Changes":
        break;
      case "Quit":
        console.log("Goodbye!");
        break;
    }
  });
};

promptStart();
