/*Seeds for SQL tables*/
USE tracker_DB;

INSERT INTO employees (first_name, last_name, manager_id)
VALUES ('John', 'Doe', 12), ('Jane', 'Doe', 10), ('Doctor', 'Who', 8);

INSERT INTO departments (name)
VALUES ('Engineering'), ('Puchassing'), ('Production');

INSERT INTO roles (title, salary)
VALUES ('Technician', 41000.00), ('Receptionist', 35000.00), ('Engineer', 77400.00);

