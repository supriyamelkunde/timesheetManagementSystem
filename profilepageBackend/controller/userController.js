// controllers/employeeController.js
const EmployeeModel = require('../models/User');

const createEmployee = async (req, res) => {
  const { email } = req.body;
  const dbemployee = await EmployeeModel.findOne({ email });

  if (dbemployee) {
    res.send("Employee Already exists");
  } else {
    let data = new EmployeeModel(req.body);
    let result = await data.save();
    res.send(result);
    console.log("Employee registered successfully", result);
  }
};

const getAllEmployees = async (req, res) => {
  let data = await EmployeeModel.find();
  res.send(data);
  console.log("Data", data);
};

const getEmployeeById = async (req, res) => {
  const { _id } = req.params;
  try {
    const employee = await EmployeeModel.findOne({ _id });
    if (!employee) {
      return res.status(404).send("Employee not found");
    } else {
      res.send({ message: "Employee found", employee });
    }
  } catch (error) {
    res.send(error);
  }
};

const updateEmployee = async (req, res) => {
  let data = await EmployeeModel.updateOne({ _id: req.params._id }, { $set: req.body });
  res.send(data);
  console.log("Updated successfully", data);
};

const deleteEmployee = async (req, res) => {
  let data = await EmployeeModel.deleteOne({ email: req.params.email });
  res.send(data);
  console.log('Data deleted', data);
};

const getEmployeeByDesignation = async (req, res) => {
  const { designation } = req.params;
  try {
    const employee = await EmployeeModel.find({ designation });
    if (!employee) {
      return res.status(404).send("Employee not found");
    } else {
      res.send({ message: "Employee found", employee });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeByDesignation
};
