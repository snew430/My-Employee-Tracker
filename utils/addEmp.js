
inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is your emplyee's first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is your emplyee's last name?",
    },
    {
      type: "list",
      name: "role_id",
      message: "What is your emplyee's role?",
      choices: roles,
    },
  ]);