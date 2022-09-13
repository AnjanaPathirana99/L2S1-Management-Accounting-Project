import React from 'react';
import {Button,Offcanvas} from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastItem from './ToastItem';

const Notification=()=> {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <span  onClick={handleShow}>
          Notification
        </span>
  
        <Offcanvas show={show} onHide={handleClose} onClick={e=>navigate('/dashboard')}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Notifications</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
                <ToastItem/>
                <ToastItem/>
                <ToastItem/>
                <ToastItem/>
                <ToastItem/>
                <ToastItem/>
                <ToastItem/>
                <ToastItem/>
                <ToastItem/>
                <ToastItem/>
                <ToastItem/>
                <ToastItem/>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

  export default Notification;