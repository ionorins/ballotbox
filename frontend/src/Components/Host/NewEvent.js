import '../../App.css';
import {FaPlay, FaPlus} from "react-icons/fa";
import Events from "../../exampleData/events.json";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {sha256} from "js-sha256";
import {useHistory} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";


const NewEvent = ({ show, setShow }) => {

    const handleSubmit = ({ event }) => {
        fetch('http://localhost:8000/host/event', {
            method: 'POST',
            body: "",
        }).then((response) => {
            if (response.status === 201) {
                alert("UCKKMMFNKJSDFNKSD");

            }
            else {
                alert("Event doesn't exist");
            }
        });
        event.preventDefault();
        event.stopPropagation();
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
                I will not close if you click outside me. Don't even try to press
                escape key.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Form onSubmit={handleSubmit}>
                    <Button variant="primary" type="submit">Create</Button>
                </Form>
            </Modal.Footer>
        </Modal>

    );
}
export default NewEvent;
