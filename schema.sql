DROP DATABASE IF EXISTS tracker_DB;

CREATE DATABASE tracker_DB;

USE tracker_DB; 


CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(50) NOT NULL,
    manager VARCHAR(50) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
	dept_id INT,
    salary DECIMAL (10,2) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (dept_id) REFERENCES departments(id)
);


CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    dept_id INT NULL,
    role_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (dept_id) REFERENCES departments(id)
);




