const inquirer = require("inquirer");

const updateRole = async (employees, roles) => {
  employees = employees.map((x) => `${x.first_name} ${x.last_name}`);
  employees.push("None");
  roles = roles.map((x) => x.title);
  return inquirer.prompt([
    {
      type: "list",
      name: "whichEmp",
      message: "Which employee would you like to update?",
      choices: employees,
    },
    {
      type: "list",
      name: "whichRole",
      message: "Which new role will they have?",
      choices: roles,
    },
    {
      type: "list",
      name: "whichManager",
      message: "Who will their new manager be?",
      choices: employees,
      validate: (whichManager) => {
        if (whichManager === { whichEmp }) {
          return false;
        } else {
          return true;
        }
      },
    },
  ]);
};

module.exports = updateRole;
