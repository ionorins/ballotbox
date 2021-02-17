import '../../../App.css';
import Button from "react-bootstrap/Button";
import React from "react";
import Modal from "react-bootstrap/Modal";
import FormBuilder from "../../FormBuilder/FormBuilder";


const NewPoll = ({ show, setShow }) => {


    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>New Poll </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormBuilder />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    );
}
export default NewPoll;

