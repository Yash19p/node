/*
var fs = require('fs');
var os = require('os');

var user = os.userInfo();
console.log(user);

fs.appendFile('greeting.txt','Hi ' + user.username + '!\n', ()=>{
    console.log('file is created');
});

--------------------------------------
*/

/*
const notes = require('./notes.js');
var _= require('lodash');

var age = notes.age;


var result = notes.addNumber(age+18,20);
console.log(age);
console.log('result is now:',result);

var data = ["user","user",1,3,1,2,18,19,2,1,19,'name','age','2'];
var filter = _.uniq(data);
console.log(filter);
------------------------------------
*/

/*
const jsonString = '{"name": "yash", "age": 30, "city": "New York"}';
const jsonObject = JSON.parse(jsonString);// convert string to object
console.log(jsonObject);

console.log(typeof jsonObject);


const objectToConvert ={
    name: "Yash",
    age: 29
};

const json = JSON.stringify(objectToConvert);// convert object to JSON string
console.log(json);
console.log(typeof json);
*/

// Get method
const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


app.get('/', function (req, res){ 
    res.send('Welcome to our Hotel')
})

//import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the routers
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);




app.listen(3000, ()=>{
    console.log('listening on port 3000');
})