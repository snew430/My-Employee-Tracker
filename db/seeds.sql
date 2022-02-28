INSERT INTO department (name)
VALUES
  ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Account Manager', 160000, 3),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Clint', 'Eastwood', 3, NULL),
('Indiana', 'Jones', 1, NULL),
('Amanda', 'Nunes', 5, NULL),
('Leia', 'Organa', 7, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Bob', 'Builder', 6, 3),
('Robert', 'DeNiro', 4, 1),
('Billie', 'Jean-King', 8, 4),
('Connor', 'McGregor', 2, 2);


