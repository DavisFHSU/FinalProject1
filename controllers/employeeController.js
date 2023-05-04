const data = {
  employees: require("../model/employees.json"),
  setEmployees(data) {
    this.employees = data;
  },
};

// Get all Employees
const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

// Create an Employee
const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  if (!newEmployee.firstName || !newEmployee.lastName) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

// Update an Employee
const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ${req.body.id} is not found` });
  }

  if (req.body.firstName) employee.firstName = req.body.firstName;
  if (req.body.lastName) employee.lastName = req.body.lastName;

  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  ); // Exclude the employee to be updated from filtered array
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );

  res.json(data.employees);
};

// Delete an Employee
const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};

// Get a Employee

const getEmployee = (req, res) => {
  const employeeId = parseInt(req.params.id); // Get employeeId from URL parameter
  const employee = data.employees.find((emp) => emp.id === employeeId);
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ${employeeId} is not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  updateEmployee,
  createNewEmployee,
  deleteEmployee,
  getEmployee,
};
