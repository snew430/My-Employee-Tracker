const inquirer = require("inquirer");

const mainPrompts = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "main",
      choices: [
        "View All Employees",
        "Add A New Employee",
        "View All Roles",
        "Add A New Role",
        "View All Departments",
        "Add A New Department",
        "Update Employee Role",
        "Quit",
      ],
    },
  ]);
};

module.exports = mainPrompts;
