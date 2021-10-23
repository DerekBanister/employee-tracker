use employer_tracker;

INSERT INTO department (department_name)
VALUES ("Sales"), ("Programming"), ("Legal"), ("Marketing"), ("Finance")

-- filler data

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Senior Programmer", 120000, 2), ("Senior Programmer", 120000, 2), ("Sales Lead", 60000, 1),
("Salesperson", 50000, 1), ("Lawyer", 160000, 3), ("Lawyer", 160000, 3), ("Chief Marketing Officer", 200000, 4), 
("Chief Financial Officer", 210000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Farley", "Chicken", 1, 8), ("C9", "Perkz", 3, 1), ("Daenerys", "Targaryen", 1, 8), 
("Tony", "Stark", 5, 3), ("Mace", "Windu", 3, 8), ("Jerome", "luvsCats", 2, 5), ("Cheng", "Tang", 2, 8), 
("John", "Wick", 4, 1);