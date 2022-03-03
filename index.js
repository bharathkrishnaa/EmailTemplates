const express  = require('express');
var app = express();
var bodyparser=require('body-parser');
var mongoose = require('./dbConnection/connection.js')

app.use(bodyparser.json());

//api routes
var templateRoutes = require('./routes/templates.js');
app.use('/templates',templateRoutes);

var userRoutes = require('./routes/auth.js');
app.use('/token',userRoutes);

//api call port configuratiion and activation
app.listen(5000,()=>{
    console.log('app started on port 5000');
});