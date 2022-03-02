const inquirer = require("inquirer");

const addDpt = async () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "dpt",
      message: "What is the name of the new department?",
      validate: (dpt) => {
        if (dpt) {
          return true;
        } else {
          console.log("Please enter a department name");
          return false;
        }
      },
    },
  ]);
};

module.exports = addDpt;
