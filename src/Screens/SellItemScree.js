import React from 'react';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import MyNavbar from '../Componnets/MyNavbar';
import SellItemForm from '../Componnets/SellItemForm';
const SellItemScreen=()=>
{
    const navigate = useNavigate();
    return(
        <>
        <div className='row'>
                <MyNavbar/>
                <div className="col-sm-7"><SellItemForm/></div>
        </div>
        </>
    );
}

export default SellItemScreen;