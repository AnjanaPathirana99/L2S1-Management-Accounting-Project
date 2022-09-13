import REACT from 'react';
import {useState} from 'react';
import {Form,Row,Col,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
const LoginForm=()=>
{
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const navigate = useNavigate();
    const onClickLogin=(e)=>
    {
        e.preventDefault();
       const data=
        {
            email:email,
            password:password
        };
        axios.post(process.env.REACT_APP_SERVER_ADDRESS+'/user/login',data)
        .then(res=>
            {
                console.log(res.data.data);
                console.log(res.data.token);
                let status = res.status;
                if(status==200)
                {
                    localStorage.clear();
                    localStorage.setItem('Token','Bearer '+res.data.token);
                    localStorage.setItem('user_id',res.data.data.user_id);
                    localStorage.setItem('name',res.data.data.name);
                    navigate(`/dashboard`);
                }

                /*let user_id=res.data.user_id;
                console.log("authenticated");
                sessionStorage.setItem('name',res.data.name);
                sessionStorage.setItem('user_id',user_id);
                navigate(`/dashboard?user_id=${user_id}`);*/
            });
    }
    return(
        <Form>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            Email
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
            Password
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="password" placeholder="Password" onChange={e=>{setPassword(e.target.value)}}/>
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
            <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
            <Button type='submit' onClick={(e)=>onClickLogin(e)}>Sign in</Button>
            <Link to='/register' className='m-5'>Sign up</Link>
            </Col>
        </Form.Group>
        </Form>
    );
}

export default LoginForm;
