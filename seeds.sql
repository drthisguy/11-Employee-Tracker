/*Seeds for MySQL tables*/
USE tracker_DB;

INSERT INTO roles (title, salary)
VALUES ('Owner', NULL), ('Manager', 100000.00), ('Engineer I', 77400.00),  ('Engineer II', 83800.00), ('Engineer III', 92900.00), ('Technician I', 41000.00), ('Technician II', 47300.00), ('Graphic Desiner', 49600.00), ('Receptionist', 35000.00), ('Sales Rep', 25800.00), ('Maketing Rep', 45400.00), ('IT Specialist', 46500.00), ('Production Assembler', 31200.00), ('Logistics Specialist', 45200.00),('Intern', 0);

INSERT INTO departments (name)
VALUES ('Engineering'), ('Purchassing'), ('Production'), ('Marketing'), ('Quality Control'), ('Tech Support'), ('Sales'), ('Human Resources'), ('Owner');

INSERT INTO managers (name, dept_id, role_id)
VALUES ('Ernie', 1, 2), ('Jessica', 2, 2),  ('Carrie', 3, 2), ('Bart', 4, 2), ('Jared', 5, 2), ('Noah', 6, 2), ('Samantha', 7, 2), ('Elizabeth', 8, 2);

INSERT INTO employees (first_name, last_name, dept_id, role_id, manager_id)
VALUES ('John', 'Doe',9, 1, 1), ('Jeff', 'Bezos',8, 16, 2), ('Trisia', 'Harper', 1, 3, 1), ('Penny', 'Warren', 8, 9, 8), ('Keith', 'Brock', 7, 6, 1), ('Alexis', 'Walters', 1, 5, 1), ('Stella', 'Reid', 4, 11, 4), ('David', 'Sommers', 5, 7, 6), ('Ginger', 'Ortiz', 7, 12, 4), ('Madeline', 'Green', 2, 15, 2), ('Julio', 'Carlson' ,1 , 4, 1), ('Ada', 'Flowers', 7, 13, 4), ('Jane', 'Doe', 8, 10, 8), ('Allison', 'Lopez', 4, 8, 4), ('Howard', 'Burke', 3, 14, 3), ('Doctor', 'Who', 3, 14, 3);

