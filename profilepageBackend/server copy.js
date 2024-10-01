const dbConnect = require("./config/dbconfig");//import dbconnect
const EmployeeModel = require('./models/User');//import model
const express = require('express');
const app= express();

const cors = require('cors');//connect backend to frontend (axios- frontend to backend)


app.use(cors());

app.use(express.json());
const PORT= 5000;


//create new employee
app.post('/api/newEmployee', async(req,res)=>{ //URL:localhost:5000/api/newEmployee
  const {email} = req.body;
  const dbemployee = await EmployeeModel.findOne({email});

  if(dbemployee){
    res.send("Employee Already exist");
  }
   else{
    let data = await EmployeeModel(req.body)
    console.log(data);
    let result = await data.save();
    res.send(result);
    console.log("employee registered successfully", result);

   }
});

//get all employee
app.get('/api/getEmp', async(req,res)=>{ //URL:localhost:5000/api/getEmp
    let data = await EmployeeModel.find();
    res.send(data);
    console.log("data", data);
})

//get data by employee id
app.get('/api/getEmp/:_id', async(req,res)=>{ //URL:localhost:5000/api/getEmp/666973df3446983d6d108e3e
    const {_id} = req.params;
    console.log("45",{_id})
    try{
      const employee = await EmployeeModel.findOne({_id});
      console.log(employee)
      if(!employee){
        return res.status(404).send("employee not found");
      }
      else{
        res.send({message :"Employee found", employee});
      }
    }
    catch(error){
      res.send(error)
    }
    
})

//update employee
app.put('/api/updateEmployee/:_id', async(req,res)=>{ //URL:localhost:5000/api/updateEmployee/666971e30061c7a74460f85e
    let data = await EmployeeModel.updateOne(req.params.email, {$set: req.body});
    res.send(data);
    console.log("updated successfully", data)
})

//delete employee
app.delete('/api/deleteEmployee/:email', async(req,res)=>{ //URL:localhost:5000/api/deleteEmployee/enter@email
    let data = await EmployeeModel.deleteOne(req.params);
    res.send(data);
    console.log('data deleted', data)
})


//get by designation 
app.get('/api/getEmployee/:designation', async(req,res)=>{ //URL:localhost:5000/api/getEmployee/Junior%20developer
  const {designation} = req.params;
  console.log("employee",{designation})
  try{
    const employee = await EmployeeModel.find({designation});
    console.log(employee)
    if(!employee){
      return res.status(404).send("employee not found");
    }
    else{
      res.send({message :"Employee found", employee});
    }
  }
  catch(error){
    res.send(error)
  }
  
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dbConnect();
  EmployeeModel();
});




//data:
// {
//   "fullName": "supriya patil",
//   "email":"supriya@gmail.com",
//   "dateOfBirth": "1990-01-01T00:00:00.000Z",
//   "address": "123 Main St",
//   "city": "pune",
//   "state": "Maharashtra",
//   "country": "India",
//   "postalCode": "560001",
//   "phoneNumber": "1234567890",
//   "designation": "Senior developer",
//   "bankName": "State Bank of India",
//   "accountNumber": "0123456789",
//   "taxID": "ABC1234567",
//   "salary": 150000,
//   "hireDate": "2022-08-15T00:00:00.000Z",
//   "userId": "60d0fe4f5311236168a109ca"
// }
