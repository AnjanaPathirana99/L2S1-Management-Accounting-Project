import React from 'react';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import LoginForm from '../Componnets/LoginForm';
const LoginScreen=()=>
{
    const navigate = useNavigate();
    return(
        <>
            Login screen
            <div className='row'>
                <div className="col-sm-7"><LoginForm/></div>
            </div>
        </>
    );
}

export default LoginScreen;