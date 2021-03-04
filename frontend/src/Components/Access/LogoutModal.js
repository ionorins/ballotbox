import '../../App.css';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";


const LogoutModal = ({ show, setShow, handleLogout }) => {

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['access_token']);

    let history = useHistory();

    const handleSubmit = (event) => {
        fetch('/auth/logout', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + cookies['access_token'],
            }
        }).then((response) => {
            response.json().then((responseJson) => {
                setCookie('access_token', null);
                console.log("TESTTTTT");
                history.replace("/");
            })
        });
    }

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="mx-3">
                    <div className="mb-3 text-center"> Are you sure you want to logout?</div>
                    <Button onClick={() => setShow(false)} variant="danger" type="submit">Yes</Button>
                    <Button variant="success" style={{ float: 'right' }} onClick={() => setShow(false)}>
                        No
                </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>

    );
}
export default LogoutModal;
