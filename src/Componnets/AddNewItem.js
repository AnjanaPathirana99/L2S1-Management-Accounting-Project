import React from 'react';
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
const AddNewItem=({setStock,stock})=>
{
    useEffect(()=>
    {
        socket=io.connect('http://localhost:8090');
        //socket.on('msg',(msg)=>console.log(msg));
        
    },[]);
    let socket;
    const [itemCode,setItemCode]=useState('');
    const [itemName,setItemName]=useState('');
    const [recieveQuantity,setRecieveQuantity]=useState(0);
    const [supplierId,setSupplierId]=useState('');
    const [rol,setRol]=useState(0);
    const [eoq,setEoq]=useState(0);

    const onClickSubmit=(e)=>
    {
        e.preventDefault();
        setStock(1);
        let data=
        {
            item_code:itemCode,
            item_name:itemName,
            quantity:recieveQuantity,
            supplier_Id:supplierId,
            rol:rol,
            eoq:eoq
        }
        //console.log(localStorage.getItem(''));
        axios.post(process.env.REACT_APP_SERVER_ADDRESS+`/item/add?customer_id=${localStorage.getItem('user_id')}`,data,
        {headers:{'authorization':`${localStorage.getItem('Token')}`}})
        .then(res=>
            {
                console.log(res);
                console.log(res.data);
            });
    }
    return(
        <>
            <h3>Add New Item</h3>
            <Form className='card p-3 bg-light'>
                <Form.Group className="mb-3" controlId="Normal text">
                    <Form.Label>Item Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter code" id="item_code" onChange={e=>setItemCode(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Normal text">
                    <Form.Label>Item name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" id="item_name" onChange={e=>setItemName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Normal text" id="">
                    <Form.Label>Recieved quantity</Form.Label>
                    <Form.Control type="number" placeholder="Enter Quantity" id="quantity" onChange={e=>setRecieveQuantity(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Normal text">
                    <Form.Label>Supplier Id</Form.Label>
                    <Form.Control type="text" placeholder="Supplier name" id="supplier_name" onChange={e=>setSupplierId(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Normal text">
                    <Form.Label>ROL</Form.Label>
                    <Form.Control type="number" placeholder="Re-order Level" id="re_order_level" onChange={e=>setRol(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Normal text">
                    <Form.Label>EOQ</Form.Label>
                    <Form.Control type="number" placeholder="EOQ" id="eoq" onChange={e=>setEoq(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={e=>onClickSubmit(e)}>
                    Add New Item
                </Button>

            </Form>
        </>
    );
}

export default AddNewItem;