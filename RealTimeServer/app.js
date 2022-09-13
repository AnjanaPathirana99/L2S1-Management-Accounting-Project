
const http = require('http').createServer();
const io = require('socket.io')(http,{cors:{origin:'*'}});
const mysql = require('mysql');

let conn=mysql.createConnection({host:"nd-sqlserver-01.mysql.database.azure.com", user:"nethmin", password:"Pa$$w0rd",database:"stockManager", port:3306, ssl:true});
conn.connect((err)=>{
    if(err)
        throw err;
    else
        console.log("mysql db is connected...");
});

io.on('connection',(socket)=>
{
    console.log('new user connected to the server');
    socket.emit('msg','hi hi');
    socket.on('fetch',(data)=>
    {
        console.log('fetched msg');
    });
    socket.on('itemUpdat',(msg)=>
    {
        console.log(msg);
        socket.emit('getNoti','get!');
    })
})


http.listen(8090,()=>
{
    console.log('realtime server is running...');
})