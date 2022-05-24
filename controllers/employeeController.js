const express = require('express');
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');


var router = express.Router();
var employee = new Employee();
router.get('/', (req, res)=>{
    res.render('employee/addOrEdit', {viewTitle :"Insert Employee", employee:employee})
})

router.post('/', (req, res)=>{
    if(req.body._id == '')
        insertData(req,res)
        else
        updateData(req, res)
})
function updateData(req, res){  
    Employee.findOneAndUpdate({_id:req.body._id}, req.body, {new: true}, (err, doc)=>{
        if(!err) {
            res.redirect('employee/list');
        }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render('employee/addOrEdit',{
                    viewTitle: 'Update Employee', 
                    employee : req.body
                });
            }
            else{
                console.log("Error In Update :"+err);
            }
        }
    })
    // Employee.findByIdAndUpdate(req.body._id, {employee:req.body},(err, doc)=>{
    //     if(!err){
    //     res.render('employee/addOrEdit',{
    //         viewTitle: 'Update Employee',
    //         employee: doc
    //     });}
    //     else{
    //         console.log("ERRROR: "+err)
    //     }
    // })
}
function insertData(req, res) {
    var employee = new Employee();
    employee.fullname = req.body.fullname;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list'); //, {employee: req.body}
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function handleValidationError(err, body){
    for (field in err.errors){
        switch(err.errors[field].path){
            case 'fullname':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['EmailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/list', (req, res)=>{
    Employee.find({},(err, docs)=> {
        if(!err){
            res.render('employee/list',{
                list: docs
            });
        }
        else{
            console.log("Error in retriecing data :"+err)
        }
    })
});

router.get('/:id', (req, res)=>{
    Employee.findById(req.params.id, (err,doc) => {
        if(!err){
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    })
})

router.get('/delete/:id', (req, res)=> {
    Employee.findByIdAndDelete(req.params.id, (err, doc)=> {
        if(!err){
            res.redirect('/employee/list')
        }
        else{
            console.log("ERROR: "+err)
        }
    })
})
module.exports = router;