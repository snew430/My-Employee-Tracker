const inquirer = require("inquirer");

const addEmp = async (roles) => {
  roles = roles.map((x) => x.title);
  return inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the first name of your new employee?",
      validate: (firstName) => {
        if (firstName) {
          return true;
        } else {
          console.log("Please enter a first name");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the last name of your new employee?",
      validate: (lastName) => {
        if (lastName) {
          return true;
        } else {
          console.log("Please enter a first name");
          return false;
        }
      },
    },
    {
      type: "list",
      name: "whichRole",
      message: "Which role will they have?",
      choices: roles,
    },
  ]);
};

module.exports = addEmp;
