import '../../App.css';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useCookies } from "react-cookie";

/**
 * Event deletion/disable modal
 * @param showDelete - state passdown
 * @param setShowDelete
 * @param code - event code
 * @param name - event name
 * @param timestamp - event timestamp
 * @param getEvents - passdown function to refresh events
 * @returns event deletion modal
 */
const DeleteEvent = ({ showDelete, setShowDelete, code, name, timestamp, getEvents }) => {

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['access_token']);

    /**
     * Handles submission of delete/disable modal
     * @param event submission
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        // Link to event deletion endpoint
        fetch('/host/event/' + code, {
            method: 'PUT',
            headers: {
                "Authorization": "Bearer " + cookies['access_token'],
            },
            body: JSON.stringify({
                name: name,
                timestamp: timestamp,
                active: false
            }),
        }).then((response) => {
            setShowDelete(false);
            getEvents();
        });

    };

    return (
        <Modal
            show={showDelete}
            onHide={() => setShowDelete(<DeleteEvent />)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="mx-3">
                    <div className="mb-3 text-center">
                        Are you sure you want to delete {name}?
                    </div>

                    <Button variant="danger" type="submit">Delete</Button>
                    <Button variant="secondary" style={{ float: 'right' }} onClick={() => setShowDelete(false)}>
                        Close
                </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>

    );
}
export default DeleteEvent;
