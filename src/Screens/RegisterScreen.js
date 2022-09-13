import React from 'react';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import RegisterForm from '../Componnets/RegisterForm';
const RegisterScreen=()=>
{
    const navigate = useNavigate();
    return(
        <>
            Register screen
            <div className='row p-6'>
                <div className="col-sm-7"><RegisterForm/></div>
            </div>
        </>
    );
}

export default RegisterScreen;