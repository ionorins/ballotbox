import '../../App.css';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useCookies } from "react-cookie";


const DeleteEvent = ({ showDelete, setShowDelete, code, name, date }) => {

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['access_token']);


    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        fetch('/host/event/' + code, {
            method: 'PUT',
            headers: {
                "Authorization": "Bearer " + cookies['access_token'],
            },
            body: JSON.stringify({
                name: name,
                timestamp: date,
                active: false
            }),
        }).then((response) => {
            setShowDelete(false);
            window.location.reload();
        });

    };

    return (
        <Modal
            show={showDelete}
            onHide={() => setShowDelete(<DeleteEvent />)}
        >
            <Modal.Header closeButton>
                <Modal.Title>{code}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="mx-3">
                    <Form.Group as={Row} >
                        <Form.Label>
                            Event name
                        </Form.Label>
                        <Form.Control type="name" placeholder="Enter event name" required />
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label>
                            Date
                        </Form.Label>
                        <Form.Control type="date" required />
                    </Form.Group>
                    <Button variant="primary" type="submit">Create</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDelete(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    );
}
export default DeleteEvent;
