const inquirer = require("inquirer");

const addRole = async (departments) => {
  departments = departments.map((x) => x.name);
  return inquirer.prompt([
    {
      type: "input",
      name: "role",
      message: "What is the name of the new role?",
      validate: (role) => {
        if (role) {
          return true;
        } else {
          console.log("Please enter a department name");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "salary",
      message: "What will their annual salary be",
      validate: (salary) => {
        if (isNaN(salary) === false) {
          return true;
        } else {
          console.log("Please enter a salary");
          return false;
        }
      },
    },
    {
      type: "list",
      name: "whichDpt",
      message: "Which department do they fall under?",
      choices: departments,
    },
  ]);
};

module.exports = addRole;
