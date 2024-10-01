const mongoose = require("mongoose");

const DbConnect = () => {
  mongoose.connect("mongodb://localhost:27017/tms").then(()=>{
    console.log("connection established");
  });
};

module.exports = DbConnect;