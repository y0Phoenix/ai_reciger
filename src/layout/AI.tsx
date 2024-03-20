/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import State from '../types/State';
import { ConnectedProps, connect } from 'react-redux';
import { closeAIModal } from '../actions/modal';
import { useNavigate } from 'react-router-dom';
import { getAIRecipe } from '../actions/recipe';

const mapStateToProps = (state: State) => ({
    show: state.modal.aiShow
});

const connector = connect(mapStateToProps, { closeAIModal, getAIRecipe });

type Props = ConnectedProps<typeof connector>;

const AIModal: React.FC<Props> = ({show, closeAIModal, getAIRecipe}) => {
    const [text, setText] = useState('');
    
    const naigate = useNavigate();

    const handleGenerate = () => {
        // Do something with the entered text, e.g., generate content based on it
        console.log('Generated content based on:', text);
        getAIRecipe(text, naigate);
        // Close the modal
        closeAIModal();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    return (
        <>
            {show &&
                <Modal show={show} onHide={closeAIModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Text Prompt</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="textPrompt">
                            <Form.Label>Enter Text:</Form.Label>
                            <Form.Control type="text" placeholder="Enter text" value={text} onChange={handleChange} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeAIModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleGenerate}>
                            Generate
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    );
};

export default connector(AIModal);
