const { application } = require('express');
const jwt = require('jsonwebtoken');
//const app=require('../app');
const mysql =require('mysql');


let conn=mysql.createConnection({host:"nd-sqlserver-01.mysql.database.azure.com", user:"nethmin", password:"Pa$$w0rd",database:"stockManager", port:3306, ssl:true});
conn.connect((err)=>{
if(err)
    throw err;
else
    console.log("mysql db is connected at item.controller");
});

const getItemAll=(req,res)=>
{
    console.log('hello');
    let sql="show databases";
    conn.query(sql,(err,result)=>
        {
            if(err) throw err;
            console.log(result);
            res.send("item fetched");
        });    
}


const getItemFor=(req,res)=>
{
    let sql=`select item_code,item_name,quantity,supplier_id  from item where customer_id='${req.query.customer_id}'`;
    console.log(req.query.customer_id);
    conn.query(sql,(err,result)=>
    {
        if(err)
        {
            res.status(406).send(err);
            throw err;
            
        }
        console.log(result);
        res.status(200).send(result);
    })
    //res.send('hello');
}



const addItem=(req,res)=>
{
    let {item_code,item_name,quantity,supplier_Id,rol,eoq}=req.body;
    console.log(item_code,item_name,quantity,supplier_Id,rol,eoq);
   // console.log(req.body);
    let token= req.headers.authorization.split(' ')[1];
    console.log(token);
    let payload=jwt.decode(token);
    let customer_id=payload.data.user_id;
    //res.send("item added");
    let sql=`insert into item (item_code,customer_id,item_name,quantity,rol,eoq,supplier_id) values('${item_code}','${customer_id}','${item_name}',${quantity*1},${rol*1},${eoq*1},'${supplier_Id}')`;
    conn.query(sql,(err,result)=>
    {
        if(err)
        {
            res.status(406).send('error');
            throw err;
            
        }
        console.log(result);
        res.status(200).send('item added');
    })
}

const AddStockItem=(req,res)=>
{
    let {item_code,item_name,quantity,supplier_Id}=req.body;
    console.log(item_code,item_name,quantity,supplier_Id);
   // console.log(req.body);
    let token= req.headers.authorization.split(' ')[1];
    console.log(token);
    let payload=jwt.decode(token);
    let customer_id=payload.data.user_id;
    //res.send("item added");
    //let sql=`update item set quantity =()'${item_code}','${customer_id}','${item_name}',${quantity*1},${rol*1},${eoq*1},'${supplier_Id}')`;
    let sql2=`select updateQnt('${item_code}','${item_name}','${customer_id}','${supplier_Id}',${quantity})`;
    conn.query(sql2,(err,result)=>
    {
        if(err)
        {
            throw err;
            res.status(406);
        }
        console.log(result);
        res.status(200).send('item updated');
    })
}


const SellStockItem=(req,res)=>
{
    let {item_code,item_name,quantity}=req.body;
    console.log(item_code,item_name,quantity);
    console.log(req.body);
    let token= req.headers.authorization.split(' ')[1];
    console.log(token);
    let payload=jwt.decode(token);
    let customer_id=payload.data.user_id;
    //res.send('ok');
    //res.send("item added");
    //let sql=`update item set quantity =()'${item_code}','${customer_id}','${item_name}',${quantity*1},${rol*1},${eoq*1},'${supplier_Id}')`;
    let sql2=`select sellQnt('${item_code}','${item_name}','${customer_id}',${quantity})`;
    conn.query(sql2,(err,result)=>
    {
        if(err)
        {
            throw err;
            res.status(406);
        }
        console.log(result);
        res.status(200);
    })
}

module.exports=
{
    getItemAll:getItemAll,
    getItemFor:getItemFor,
    addItem:addItem,
    AddStockItem:AddStockItem,
    SellStockItem:SellStockItem
}