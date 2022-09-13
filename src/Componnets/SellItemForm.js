import React from 'react';
import { useState,useEffect } from 'react';
import {Form,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
const SellItemForm=()=>
{
    let socket;
    useEffect(()=>
    {
        socket=io.connect('http://localhost:8090');
        socket.on('getNoti',(msg)=>console.log(msg));
        
    });
    
    const navigate = useNavigate();
    const [itemCode,setItemCode]=useState('');
    const [itemName,setItemName]=useState('');
    const [recieveQuantity,setRecieveQuantity]=useState(0);
    const onClickSubmit=(e)=>
    {
        e.preventDefault();
        socket.emit('itemUpdat',"update!");
        let data=
        {
            item_code:itemCode,
            item_name:itemName,
            quantity:recieveQuantity
        }
        //console.log(localStorage.getItem(''));
        axios.post(process.env.REACT_APP_SERVER_ADDRESS+`/item/sell?customer_id=${localStorage.getItem('user_id')}`,data,
        {headers:{'authorization':`${localStorage.getItem('Token')}`}})
        .then(res=>
            {
                console.log(res);
                console.log(res.data); 
            });
    }
    //socket.on('getNoti',(msg)=>{console.log(msg)});
    return(
        <>
            <div className='container '>
                <div className="row justify-content-center">
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
                            <Form.Label>Selling quantity</Form.Label>
                            <Form.Control type="number" placeholder="Enter Quantity" id="quantity" onChange={e=>setRecieveQuantity(e.target.value)}/>
                        </Form.Group>
                        <Button variant="dark" type="submit" onClick={e=>onClickSubmit(e)} className='pl-4'>
                            Sell
                        </Button>
                    </Form>
                </div>
            </div>

        </>
    );
}

export default SellItemForm;