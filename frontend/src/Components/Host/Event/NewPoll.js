import '../../../App.css';
import Button from "react-bootstrap/Button";
import React from "react";
import Modal from "react-bootstrap/Modal";
import PollBuilder from "./PollBuilder/PollBuilder";

/**
 * Poll creator modal dependent on PollBuilder
 *
 * @param show - state passdown
 * @param setShow - "    "
 * @param getPolls - function passdown for updating polls
 * @returns new poll modal
 */
const NewPoll = ({ show, setShow, getPolls }) => {

    /**
     * Hides modal and refreshes poll on close
     */
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
                <PollBuilder setShow={hideModal} />
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

