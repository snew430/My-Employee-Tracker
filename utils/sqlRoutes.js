const cTable = require("console.table");
const db = require("../db/connections");

const getRoles = async () => {
  let titles;
  await db
    .promise()
    .query(`SELECT title FROM role`)
    .then((result) => {
      titles = result[0].map((x) => x.title);
    });
  return titles;
};

const insertDpt = async (newDpt) => {
  await db
    .promise()
    .query(`INSERT INTO department (name) VALUES (?)`, newDpt)
    .then(console.log(`Added new department, ${newDpt}`));
};

const viewDpt = async () => {
  await db
    .promise()
    .query(`SELECT name FROM department`)
    .then((result) => {
      let departments = result[0].map((x) => [x.name]);
      console.table(["Departments"], departments);
    });
};

const viewEmp = async () => {
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
      console.table(result[0]);
    });
};

const viewRole = async () => {
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
      console.table(result[0]);
    });
};

module.exports = { getRoles, insertDpt, viewDpt, viewEmp, viewRole };
