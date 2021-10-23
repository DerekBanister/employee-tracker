use employer_tracker;

INSERT INTO department (department_name)
VALUES ("Sales"), 
("Programming"), 
("Legal"), 
("Marketing"), 
("Finance");

-- filler data

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Programmer", 120000, 02), 
("Lead Programmer", 120000, 02), 
("Sales Lead", 60000, 01),
("Salesperson", 50000, 01), 
("Lawyer", 160000, 03), 
("Lawyer", 160000, 03), 
("Chief Marketing Officer", 200000, 04), 
("Chief Financial Officer", 210000, 05);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Farley", "Chicken", 1, 8), 
("C9", "Perkz", 3, 1), 
("Daenerys", "Targaryen", 1, 8), 
("Tony", "Stark", 5, 3), 
("Mace", "Windu", 3, 8), 
("Jerome", "luvsCats", 2, 5), 
("Cheng", "Tang", 2, 8), 
("John", "Wick", 4, 1);