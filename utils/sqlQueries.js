const cTable = require("console.table");
const db = require("../db/connections");

const insertDpt = async (newDpt) => {
  await db
    .promise()
    .query(`INSERT INTO department (name) VALUES (?)`, newDpt)
    .then(console.log(`Added new department, ${newDpt}`));
};

const insertRole = async ({ role, salary, whichDpt }) => {
  await db
    .promise()
    .query(
      `INSERT INTO role (title, salary, department_id)
      SELECT '${role}', ${salary}, id
      FROM department
      WHERE name = '${whichDpt}'`
    )
    .then(console.log(`Added new role, ${role}`));
};

const insertEmp = async (employee) => {
  console.log(employee);
  await db
    .promise()
    .query(
      `SELECT id FROM role
      WHERE title = '${employee.whichRole}'`
    )
    .then((roleId) => {
      db.promise()
        .query(
          `SELECT id FROM employee
        WHERE first_name = '${employee.manager.split(" ")[0]}'`
        )
        .then((managerId) => {
          managerId = managerId[0][0];
          if (managerId === undefined) {
            managerId = { id: "NULL" };
          }
          db.promise()
            .query(
              `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employee.firstName}','${employee.lastName}',${roleId[0][0].id},${managerId.id})`
            )
            .then(
              console.log(
                `Added new employee ${employee.firstName} ${employee.lastName}`
              )
            );
        });
    });
};

const viewDpt = async () => {
  let departments;
  await db
    .promise()
    .query(`SELECT * FROM department`)
    .then((result) => {
      departments = result[0];
    });
  return departments;
};

const viewEmp = async () => {
  let employees;
  await db
    .promise()
    .query(
      `SELECT employee.*, role.title
      AS role_id
      FROM employee
      LEFT JOIN role
      ON employee.role_id = role.id
      ORDER BY last_name`
    )
    .then((result) => {
      employees = result[0];
    });
  return employees;
};

const viewRole = async () => {
  let roles;
  await db
    .promise()
    .query(
      `SELECT role.*, department.name
      AS department_id
      FROM role
      LEFT JOIN department
      ON role.department_id = department.id
      ORDER BY title`
    )
    .then((result) => {
      roles = result[0];
    });
  return roles;
};

const changeEmp = async ({ whichEmp, whichRole, whichManager }) => {
  whichEmp = whichEmp.split(" ");
  const first = whichEmp[0];
  const last = whichEmp[1];
  let managerId;
  if (whichManager === "None") {
    managerId = null;
  } else {
    whichManager = whichManager.split(" ");
    whichManager = whichManager[0];
    managerId = await db
      .promise()
      .query(`SELECT id FROM employee WHERE first_name = '${whichManager}'`);
    managerId = managerId[0][0].id;
  }

  await db
    .promise()
    .query(
      `SELECT id FROM role
      WHERE title = '${whichRole}'`
    )
    .then((roleId) => {
      db.promise()
        .query(
          `UPDATE employee SET role_id = '${roleId[0][0].id}', manager_id = '${managerId}'
      WHERE first_name = '${first}'`
        )
        .then(
          console.log(`Changed ${first} ${last}'s job role to ${whichRole}`)
        );
    });
};

module.exports = {
  insertDpt,
  insertRole,
  insertEmp,
  viewDpt,
  viewEmp,
  viewRole,
  changeEmp,
};
