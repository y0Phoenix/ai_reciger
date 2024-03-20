/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ConnectedProps, connect } from 'react-redux';
import State from '../types/State';
import { closeRegisterModal } from '../actions/modal';
import { RegisterFormData, register } from '../actions/user';
import { useNavigate } from 'react-router-dom';

const mapStateToProps = (state: State) => ({
    show: state.modal.registerShow
});

const connector = connect(mapStateToProps, { register, closeRegisterModal });

type Props = ConnectedProps<typeof connector>;

const RegisterPage: React.FC<Props> = ({ show, register, closeRegisterModal }) => {
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        remeber: false
    });

    const navigate = useNavigate();

    const handleRegister = () => {
        // Handle registration logic here (e.g., send registration request to server)
        console.log('Registering with username:', formData.name, ', email:', formData.email, 'and password:', formData.password);
        register(formData, navigate);
        // You can replace the console.log statement with your actual registration logic
        // If registration is successful, you can close the modal
        closeRegisterModal();
    };

    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name]: e.target.name == 'remeber' ? e.target.checked : e.target.value});

    return (
        <>
            { show &&
                <Modal show={show} onHide={closeRegisterModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicUsername" className='mb-3'>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter username" 
                            value={formData.name} 
                            onChange={(e: any) => onchange(e)} 
                            required 
                        />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className='mb-3'>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            value={formData.email} 
                            onChange={(e: any) => onchange(e)}
                            required 
                        />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                        <Form.Control 
                            type="password" 
                            placeholder="Enter Password" 
                            value={formData.password} 
                            onChange={(e: any) => onchange(e)}
                            required 
                        />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={closeRegisterModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleRegister}>
                        Register
                    </Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    );
};

export default connector(RegisterPage);
