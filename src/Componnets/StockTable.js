import React from 'react';
import {Button,Table} from 'react-bootstrap';
import {useState,useEffect} from 'react';
import axios from 'axios';
const StockTable=()=>
{
    useEffect(()=>
    {
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
        //console.log(arr);
    },[])


    const [tableData,setTableData]=useState([]);
    return(
        <>
        <Table striped bordered hover>
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
        </>
    );
}
export default StockTable;