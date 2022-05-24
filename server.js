require('./models/db');

const express = require('express');
const path = require('path');
const exphbar = require('express-handlebars');
const bodyparser = require('body-parser')

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

const employeeController = require('./controllers/employeeController')

app.set('/views', path.resolve(__dirname, '/views/'))
app.use('/employee', employeeController);

app.set('view engine', 'ejs');

app.listen(3000, ()=>{
    console.log("Listening at port 3000")
})