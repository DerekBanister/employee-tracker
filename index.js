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
const cTable = require("console.table");


// Connect to db
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password', 
    database: 'employer_tracker' //had this at classlist_db for a day..................
  },
  console.log(`Connected to the employer_tracker database.`)
);

db.connect(function (err) {
  if (err) throw err;
  mainMenu();
});

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
          viewAllDepartments();
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
//functions i will need, call in switch cases
function viewAllEmployees() {
   //this took way too long
   //is working as intended
   var querydb = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
   db.query(querydb, function (err, res) {
     //console.log(res);
        console.table(res);
        mainMenu();
      })
  };

function viewAllDepartments() {

  var querydb = "SELECT * FROM department"
  db.query(querydb, function (err, res) {
    //console.log(res);
      console.table(res);
      mainMenu();
  })
};

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's title",
        name: "roleTitle"
      },
      {
        type: "input",
        message: "Enter the employee's salary",
        name: "roleSalary"
      },
      {
        type: "input",
        message: "Enter the employee's department ID",
        name: "roleDept"
      }
    ])
  .then(function (res) {
    const title = res.roleTitle;
    const salary = res.roleSalary;
    const departmentID = res.roleDept;
    var querydb = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
    db.query(querydb, function (err, res) {
      if (err) {
        throw err;
      }
      //console.log(res);
      console.table(res);
      mainMenu();
    });
  });
};

function viewRoles() {
  var querydb = "SELECT * FROM department"
  db.query(querydb, function (err, res) {
    //console.log(res);
    console.table(res);
    mainMenu();
  })
};

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's first name",
        name: "firstName"
      },
      {
        type: "input",
        message: "Enter the employee's last name",
        name: "lastName"
      },
      {
        type: "input",
        message: "Enter the employee's role ID",
        name: "addEmployeeRole"
      },
      {
        type: "input",
        message: "Enter the employee's manager ID",
        name: "addManangerID"
      }
    ])
    .then(function (res) {
      const firstName = res.firstName;
      const lastName = res.lastName;
      const employeeRole = res.addEmployeeRole;
      const ManagerID = res.addManagerID;
      const querydb = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employeeRole}", "${ManagerID}")`;

      db.query (querydb, function (err, res) {
        if (err) {
          throw err;
        }

        console.table(res);
        mainMenu();
      })
    })
};

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "Enter the name of the new department",
      name: "newDepartment"
    })
      .then(function (res) {
        const newDepartment = res.newDepartment
        const querydb = `INSERT INTO department (department_name) VALUES ("${newDepartment}")`;

        db.query(querydb, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          mainMenu();
        })
      })
};

function updateEmployeeRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the employee's ID you want to be updated",
          name: "updateEmployee"
        },
        {
          type: "input",
          message: "Enter the new role ID for the employee",
          name: "newRole"
        }
      ])
      .then(function (res) {
        const updateEmployee = res.updateEmployee;
        const newRole = res.newRole;

        const querydb = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmploy}"`;

        db.query(querydb, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          mainMenu();
        })
      })
};






















