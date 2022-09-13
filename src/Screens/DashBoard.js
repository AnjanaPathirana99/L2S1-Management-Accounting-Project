import React from 'react';
import AddToStockForm from '../Componnets/AddToStockForm';
import {Button,Table} from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddNewItem from '../Componnets/AddNewItem';
import io from 'socket.io-client';
import StockTable from '../Componnets/StockTable';
import axios from 'axios';
import MyNavbar from '../Componnets/MyNavbar';
const DashBoard=()=>
{
    const navigate = useNavigate();
    const [btn,setBtn]= useState("Add New Item");
    const [stock,setStock]=useState(0);
    const [formName,setFormName]= useState(<AddToStockForm setStock={setStock} stock={stock}/>);
    const [table,setTable]= useState(<StockTable />);  
    useEffect(()=>
    {
        socket=io.connect('http://localhost:8090');
        socket.on('getNoti',(msg)=>console.log(msg));
        
    },[]);
    let socket;
    useEffect(()=>
    {
            console.log(stock);
            axios.get(process.env.REACT_APP_SERVER_ADDRESS+`/item/for?customer_id=${localStorage.getItem('user_id')}`)
            .then(res=>
                {
                    console.log(res.data);
                    let arr2=res.data;
                    let arr=arr2.map(item=>
                        {
                            return(
                                <tr>
                                <td>{item.item_code}</td>
                                <td>{item.item_name}</td>
                                <td>{item.supplier_id}</td>
                                <td>{item.quantity}</td>
                                </tr>
                            );
                        });
                        setTableData(arr);
                        console.log(arr);   
                });
            //setTable(<StockTable/>);
            setStock(0);
    },[stock]);
    const [tableData,setTableData]=useState([]);
    const onAddNewButtonClick=(e)=>
    {
        setFormName(<AddNewItem setStock={setStock} stock={stock}/>);
        setBtn("Add To Stock");
    }

    const onAddStockButtonClick=(e)=>
    {
        setFormName(<AddToStockForm setStock={setStock} stock={stock}/>);
        setBtn("Add New Item");
    }

    return(
        <>
            <MyNavbar/>
            <Button onClick={e=>
                {
                    if(btn == "Add New Item")
                        onAddNewButtonClick(e);
                    else
                        onAddStockButtonClick(e);
                }}>{btn}</Button>
            <div className='row'>
                <div className="col-sm-6 p-5 border-3 border-primary">{formName}</div>
                <div className="col-sm-6 p-5 border-3 border-primary">
                    <Table className="table table-bordered tab table-responsive-xl variant='danger' mt-4 max-height='300px'" >
                        <thead>
                            <tr>
                            <th>Item</th>
                            <th>Item Name</th>
                            <th>Supplier</th>
                            <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                        {tableData} 
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default DashBoard;