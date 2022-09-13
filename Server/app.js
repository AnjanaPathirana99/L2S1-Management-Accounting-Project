const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const item=require('./routes/item');
const user = require('./routes/user');
require('dotenv').config();



//connect to the database
let conn=mysql.createConnection({host:"nd-sqlserver-01.mysql.database.azure.com", user:"nethmin", password:"Pa$$w0rd",database:"stockManager", port:3306, ssl:true});
conn.connect((err)=>{
    if(err)
        throw err;
    else
        console.log("mysql db is connected...");
});

//define port 8080
app.listen(8080,()=>{
    console.log("server is running...");
});

//middleware
app.use('/item',item);
app.use('/user',user);
 