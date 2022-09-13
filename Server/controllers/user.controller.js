const { application } = require('express');
const mysql =require('mysql');
const jwt = require('jsonwebtoken');


let conn=mysql.createConnection({host:"nd-sqlserver-01.mysql.database.azure.com", user:"nethmin", password:"Pa$$w0rd",database:"stockManager", port:3306, ssl:true});
conn.connect((err)=>{
if(err)
    throw err;
else
    console.log("mysql db is connected at user.controller");
});

const checkUser=(req,res)=>
{
    //console.log(`email : ${req.body.email}`);
    let email = req.body.email;
    let password = req.body.password;
    sql=`select name,email,user_id from user where email="${email}" and password="${password}"`;
    conn.query(sql,(err,result)=>
    {
        if(err)
        {
            res.status(500);
            throw err;
        }
        let count= result.length;

        if(count==1)
        {
            //console.log(count);
            let data=
            {
                num:count,
                user_id:result[0].user_id,
                name:result[0].name,
                email:result[0].email
            };
            jwt.sign({data},process.env.SECRETKEY,{expiresIn:'60s'},(err,token)=>
            {
                //console.log('hi token '+token);
                if(err)
                {
                    console.log("jwt error "+err);
                    res.status(401);
                }
                else
                {
                    //console.log('success');
                    res.status(200).json({data,token});
                }
            });
            //res.send(data);
        }
        //console.log(result);
    });
}


const addUser=(req,res)=>
{
    let sql= `insert into  user (user_id,name,email,password,tele) values('${req.body.user_id}','${req.body.name}','${req.body.email}','${req.body.password}','${req.body.tele}')`;
    conn.query(sql,(err,result)=>
    {
        if(err)
            throw err;
        console.log("new user added");
        res.send('1');
    })
    //console.log(req.body);
    //console.log("add user function");
}

module.exports = 
{
    checkUser:checkUser,
    addUser:addUser
}