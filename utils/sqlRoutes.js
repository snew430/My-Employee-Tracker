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

const insertEmp = async () => {
  await db
    .promise()
    .query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
    )
    .then(console.log(`Added new employee`));
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

module.exports = {
  insertDpt,
  insertRole,
  insertEmp,
  viewDpt,
  viewEmp,
  viewRole,
};
