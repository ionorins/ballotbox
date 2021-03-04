import '../../App.css';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useCookies } from "react-cookie";


const DeleteEvent = ({ showDelete, setShowDelete, code, name, timestamp }) => {

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['access_token']);


    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        fetch('http://localhost:8000/host/event/' + code, {
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
            window.location.reload();
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
