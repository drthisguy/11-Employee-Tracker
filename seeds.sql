/*Seeds for MySQL tables*/
USE tracker_DB;

INSERT INTO roles (title, salary)
VALUES ('Owner', NULL), ('Manager', 100000.00), ('Engineer I', 77400.00),  ('Engineer II', 83800.00), ('Engineer III', 92900.00), ('Technician I', 41000.00), ('Technician II', 47300.00), ('Graphic Desiner', 49600.00), ('Receptionist', 35000.00), ('Sales Rep', 25800.00), ('Maketing Rep', 45400.00), ('IT Specialist', 46500.00), ('Production Assembler', 31200.00), ('Logistics Specialist', 45200.00),('Intern', 0);

INSERT INTO departments (name)
VALUES ('Engineering'), ('Purchassing'), ('Production'), ('Marketing'), ('Quality Control'), ('Tech Support'), ('Sales'), ('Human Resources');

INSERT INTO managers (name, dept_id, role_id)
VALUES ('Ernie', 1, 2), ('Jessica', 2, 2),  ('Carrie', 3, 2), ('Bart', 4, 2), ('Jared', 5, 2), ('Noah', 6, 2), ('Samantha', 7, 2), ('Elizabeth', 8, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL), ('Jeff', 'Bezos', 16, 2), ('Trisia', 'Harper', 3, 1), ('Penny', 'Warren', 9, 8), ('Keith', 'Brock', 6, 1), ('Alexis', 'Walters', 5, 1), ('Stella', 'Reid', 11, 4), ('David', 'Sommers', 7, 6), ('Ginger', 'Ortiz', 12, 4), ('Madeline', 'Green', 15, 2), ('Julio', 'Carlson', 4, 1), ('Ada', 'Flowers', 13, 4), ('Jane', 'Doe', 10, 8), ('Allison', 'Lopez', 8, 4), ('Howard', 'Burke',  14, 3), ('Doctor', 'Who', 14, 3);

