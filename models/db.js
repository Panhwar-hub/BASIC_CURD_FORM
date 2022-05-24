const mongoose= require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/EmployeeDB', {useNewUrlparser:true}, (err)=>{
    if(!err){console.log("MongoDB connected Succesfully")}
    else {console.log("MongoDB not connected"+err)}
});

require('./employee')