DROP DATABASE IF EXISTS employer_tracker;
CREATE DATABASE employer_tracker;

USE employer_tracker;

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id INT NOT NULL auto_increment;
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT NOT NULL auto_increment;
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS employee_role;
CREATE TABLE employee_role (
    id INT NOT NULL auto_increment,
    title VARCHAR(30),
    salary decimal (8,2),
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);


