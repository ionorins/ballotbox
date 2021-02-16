import '../../App.css';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useHistory} from "react-router-dom";
import React from "react";
import Modal from "react-bootstrap/Modal";
import {useCookies} from "react-cookie";


const NewEvent = ({ show, setShow }) => {

    const [cookies, setCookie] = useCookies(['access_token']);

    let history = useHistory();

    const handleSubmit = (event) => {
        const name = event.target[0].value;
        event.preventDefault();
        event.stopPropagation();
        fetch('http://localhost:8000/host/event', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            },
            body: JSON.stringify({
                name: name,
            }),
        }).then((response) => {
            alert("Added succesfully!");
            setShow(false);
            window.location.reload();
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
                        <Form.Control type="name" placeholder="Enter event name" required/>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label>
                            Date
                        </Form.Label>
                        <Form.Control type="date" required/>
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
