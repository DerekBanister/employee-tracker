// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

// https://www.npmjs.com/package/console.table console table docs

//dependencies 
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to db
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'classlist_db'
  },
  console.log(`Connected to the employer_tracker database.`)
);


//inquirer prompt using switch cases for choices?
//mainmenu function w/ inquirer, prompts choices for options
//function for each action? call funciton in switch cases.
// query db for info in function?
function mainMenu() {
  inquirer
  .prompt({
    type: "list",
    name: "mainMenu",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Departments",
      "View All Roles",
      "Add Employee",
      "Add Department",
      "Add Role",
      "Update Employee Role",
      "Exit"
    ]
  })
  .then(function(answer) {
      //switch cases
      switch (answer.mainMenu){
        case "View All Employees":
          viewAllEmployees();
          break;

        case "View All Departments":
          viewAllDepartment();
          break;
        
        case "Add Department":
          addDepartment();
        
        case "Add Role":
          addRole();
          break;

        case "View All Roles":
          viewRoles();
          break;
        
        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;
        
        case "Exit":
          db.end()
          break;
      //exit just ends prompt, not close server. Want entire program to shut off.
      }
  });
}
//switch cases working.
mainMenu();


//functions i will need, call in switch cases
 function viewAllEmployees() {
   //this too way too long
   var querydb = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
      db.query(querydb, function (err, res) {
        console.table(res);
        mainMenu();
      })
  };




// viewAllDepartment();
// addRole();
// viewRoles();
// addEmployee();
// updateEmployeeRole();
// addDepartment();





















app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });