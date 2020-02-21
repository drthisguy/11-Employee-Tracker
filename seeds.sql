/*Seeds for MySQL tables*/
USE tracker_DB;

INSERT INTO departments (department, manager)
VALUES ('Engineering', 'Ernie'), ('Purchassing', 'Jessica'), ('Production', 'Carrie'), ('Marketing', 'Bart'), ('Quality Control', 'Jared'), ('Tech Support', 'Noah'), ('Sales', 'Samantha'), ('Human Resources', 'Jessica'), ('Owner', NULL), ('Management', NULL);

INSERT INTO roles (title, dept_id, salary)
VALUES ('Owner', 9, 0), ('Manager', 9, 100000.00), ('Engineer I', 1, 77400.00),  ('Engineer II', 1, 83800.00), ('Engineer III', 1, 92900.00), ('Technician I', 6, 41000.00), ('Technician II', 1, 47300.00), ('Graphic Desiner', 4, 49600.00), ('Receptionist', 8, 35000.00), ('Sales Rep', 7, 25800.00), ('Maketing Rep', 4, 45400.00), ('IT Specialist', 6,  46500.00), ('Production Assembler', 2, 31200.00), ('Logistics Specialist', 2, 45200.00), ('Intern', 8, 0);

INSERT INTO employees (first_name, last_name, dept_id, role_id)
VALUES ('John', 'Doe',9, 1), ('Jeff', 'Bezos',8, 4), ('Trisia', 'Harper', 1, 3), ('Penny', 'Warren', 8, 9), ('Keith', 'Brock', 7, 6), ('Alexis', 'Walters', 1, 5), ('Stella', 'Reid', 4, 11), ('David', 'Sommers', 5, 7), ('Ginger', 'Ortiz', 7, 12), ('Madeline', 'Green', 2, 15), ('Julio', 'Carlson' ,1 , 4), ('Ada', 'Flowers', 7, 13), ('Jane', 'Doe', 8, 10), ('Allison', 'Lopez', 4, 8), ('Howard', 'Burke', 3, 14), ('Doctor', 'Who', 3, 14), ('Ernie', 'Bighead', 1, 2), ('Jessica', 'Trumpster', 2, 2),  ('Carrie', 'Fisher', 3, 2), ('Bart', 'Simpson', 4, 2), ('Jared', 'Wiener', 5, 2), ('Noah', 'Goodman', 6, 2), ('Samantha','Fox', 7, 2), ('Elizabeth', 'Warren', 8, 2);

