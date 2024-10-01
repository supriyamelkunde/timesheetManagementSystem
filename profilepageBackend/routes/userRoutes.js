// routes/employeeRoutes.js
const express = require('express');
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeByDesignation
} = require('../controllers/employeeController');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Create new employee
router.post('/newEmployee',authenticate, createEmployee);

// Get all employees
router.get('/getEmp',authenticate, getAllEmployees);

// Get employee by ID
router.get('/getEmp/:_id',authenticate, getEmployeeById);

// Update employee
router.put('/updateEmployee/:_id',authenticate, updateEmployee);

// Delete employee
router.delete('/deleteEmployee/:email',authenticate, deleteEmployee);

// Get employee by designation
router.get('/getEmployee/:designation',authenticate, getEmployeeByDesignation);

module.exports = router;
