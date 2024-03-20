/* eslint-disable react-refresh/only-export-components */
import { Modal, Button, Form } from 'react-bootstrap';
import State from '../types/State';
import { ConnectedProps, connect } from 'react-redux';
import { login, LoginFormData } from '../actions/user';
import { useState } from 'react';
import { closeLoginModal } from '../actions/modal';
import { useNavigate } from 'react-router-dom';

const mapStateToProps = (state: State) => ({
    show: state.modal.loginShow
});

const connector = connect(mapStateToProps, { login, closeLoginModal });

type Props = ConnectedProps<typeof connector>;

const LoginPage: React.FC<Props> = ({show, login, closeLoginModal}) => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        remember: false // Corrected typo in the state name
    });

    const navigate = useNavigate();

    const handleLogin = () => {
        console.log('Logging in with username:', formData.email, 'and password:', formData.password);
        login(formData, navigate);
        closeLoginModal();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value // Handle checkbox separately
        }));
    };

    return (
        <>
            {
                show && 
                <Modal show={show} onHide={closeLoginModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicUsername" className='mb-3'>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter email"            
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required
                                    name='email'        
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter Password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    required 
                                    name='password'
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Remember Me" 
                                    checked={formData.remember} 
                                    onChange={handleChange} 
                                    name='remember' 
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeLoginModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    );
};

export default connector(LoginPage);
