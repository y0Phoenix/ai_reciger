/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import State from '../types/State';
import { ConnectedProps, connect } from 'react-redux';
import { closeConfirmModal } from '../actions/modal';
import { useNavigate } from 'react-router-dom';

const mapStateToProps = (state: State) => ({
    show: state.modal.confirm.show,
    id: state.modal.confirm.id,
    callback: state.modal.confirm.callback
});

const connector = connect(mapStateToProps, { closeConfirmModal });

type Props = ConnectedProps<typeof connector>;

const ConfirmModal: React.FC<Props> = ({ show, id, callback, closeConfirmModal }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
    // Perform delete action
    callback(id, navigate)
    // Close the modal
    closeConfirmModal();
    };

    return (
        <>
            {show &&
                <Modal show={show} onHide={closeConfirmModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            Are you sure you want to delete?
                            This cannot be undone!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeConfirmModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Confirm Delete
                        </Button>
                        </Modal.Footer>
                </Modal>
            }
        </>
    );
};

export default connector(ConfirmModal);
