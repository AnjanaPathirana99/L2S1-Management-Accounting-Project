import React from 'react';
import { useState } from 'react';
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';
const AddToStockForm=({setStock,stock})=>
{

    const [itemCode,setItemCode]=useState('');
    const [itemName,setItemName]=useState('');
    const [recieveQuantity,setRecieveQuantity]=useState(0);
    const [supplierId,setSupplierId]=useState('');
    const onClickSubmit=(e)=>
    {
        e.preventDefault();
        setStock(1);
        let data=
        {
            item_code:itemCode,
            item_name:itemName,
            quantity:recieveQuantity,
            supplier_Id:supplierId
        }
        //console.log(localStorage.getItem(''));
        axios.post(process.env.REACT_APP_SERVER_ADDRESS+`/item/update?customer_id=${localStorage.getItem('user_id')}`,data,
        {headers:{'authorization':`${localStorage.getItem('Token')}`}})
        .then(res=>
            {
                console.log(res);
                console.log(res.data); 
            });
    }
    return(
        <>
            <h3>Add to stock</h3>
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
                    <Form.Control type="text" placeholder="Supplier id" id="supplier_name" onChange={e=>setSupplierId(e.target.value)}/>
                </Form.Group>
                <Button variant="dark" type="submit" onClick={e=>onClickSubmit(e)}>
                    Add to stock
                </Button>
            </Form>
        </>
    );
}

export default AddToStockForm;