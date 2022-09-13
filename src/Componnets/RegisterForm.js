import REACT from 'react';
import {useState} from 'react';
import {Form,Row,Col,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
const RegisterForm=()=>
{
    const [userId,setUserId]= useState('');
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [tele,setTele]= useState('');
    const [password,setPassword]= useState('');
    const navigate = useNavigate();
    const onClickRegister=(e)=>
    {
        e.preventDefault();
       const data=
        {
            user_id:userId,
            name:name,
            email:email,
            tele:tele,
            password:password
        };
        axios.post(process.env.REACT_APP_SERVER_ADDRESS+'/user/register',data)
        .then(res=>
            {
                console.log(res.data);
                let data= res.data;
                if(data=='1')
                {
                    navigate('/');
                }
                //let user_id=res.data.user_id;
                //console.log("authenticated");
                //navigate(`/dashboard?user_id=${user_id}`);
            });
    }
    return(
        <Form>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            User id
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="text" placeholder="Uxxx" onChange={e=>setUserId(e.target.value)} />
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            Name
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="text" placeholder="name" onChange={e=>setName(e.target.value)} />
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            Email
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            Tele
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="text" placeholder="0xx xxxxxxx" onChange={e=>setTele(e.target.value)} />
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
            <Button type='submit' onClick={(e)=>onClickRegister(e)}>Sign UP</Button>
            <Link to='/' className='m-5'>Sign In</Link>
            </Col>
        </Form.Group>
        </Form>
    );
}

export default RegisterForm;
