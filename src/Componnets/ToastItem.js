import React from 'react';
import {Button,Offcanvas,Toast} from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ToastItem=()=>
{
    return(
        <Toast className='mb-1'>
        <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
    );
}

export default ToastItem;
