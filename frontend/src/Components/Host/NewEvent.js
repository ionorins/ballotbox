import '../../App.css';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useCookies } from "react-cookie";

/**
 * Event creation modal
 * @param show - state passdown
 * @param setShow - "  "
 * @param getEvents - function passdown for event refresh
 * @returns event creation modal
 */
const NewEvent = ({ show, setShow, getEvents }) => {

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['access_token']);

    /**
     * Handle submission of new event
     * @param event
     */
    const handleSubmit = (event) => {
        const name = event.target[0].value;
        const date = new Date(event.target[1].value).getTime();
        event.preventDefault();
        event.stopPropagation();
        // Link to new event endpoint
        fetch('/host/event', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + cookies['access_token'],
            },
            body: JSON.stringify({
                name: name,
                timestamp: date,
            }),
        }).then((response) => {
            setShow(false);
            getEvents();
        });

    };

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Create a new event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="mx-3">
                    <Form.Group as={Row} >
                        <Form.Label>
                            Event name
                        </Form.Label>
                        <Form.Control type="name" placeholder="Enter event name" required maxLength={28}/>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label>
                            Date
                        </Form.Label>
                        <Form.Control type="date" required min={new Date().toISOString().split('T')[0]}
                                      max={"2050-01-01"}
                         />
                    </Form.Group>
                    <Button variant="primary" type="submit">Create</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    );
}
export default NewEvent;
