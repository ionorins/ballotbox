import '../../../App.css';
import Button from "react-bootstrap/Button";
import React from "react";
import Modal from "react-bootstrap/Modal";
import FormBuilder from "../../FormBuilder/FormBuilder";


const NewPoll = ({ show, setShow, getPolls }) => {

    const hideModal = () => {
        getPolls();
        setShow(false);
    }

    return (
        <Modal
            show={show}
            onHide={() => hideModal()}
        >
            <Modal.Header closeButton>
                <Modal.Title>New Poll </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <FormBuilder setShow={hideModal}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => hideModal()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    );
}
export default NewPoll;

export const ShowContext = React.createContext('');
