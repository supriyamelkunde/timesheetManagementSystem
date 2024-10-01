const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbconfig');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Use the employee routes
const employeeRoutes = require('./routes/userRoutes');
app.use('/api/user', employeeRoutes);
//localhost:5000/api/user/newEmployee

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dbConnect();
});
