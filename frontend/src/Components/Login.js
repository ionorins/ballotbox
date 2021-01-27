import '../App.css';
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Home from './Home.js';
import {sha256} from 'js-sha256';

const Login = () => {

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const email = event.target[0].value;
        const pass = sha256(event.target[1].value);
        console.log(email);
        console.log(pass);
        event.preventDefault();
        event.stopPropagation();
      };

    return (
        <div className="container">
            <h1 className="display-1">BallotBox🗳️</h1>
            <Form className="forms mx-auto" onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="my-2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" size="lg" />
                </Form.Group>

                <Form.Group controlId="password" className="my-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" size="lg" />
                </Form.Group>
            <Button variant="primary" type="submit" className="buttons my-2">
                Log in
            </Button>
            </Form>
            <Navbar fixed="bottom">
                <Navbar.Text className="mx-auto footer-text">
                    BallotBox © 2021
                </Navbar.Text>
            </Navbar>
        </div>
    )
}
export default Login;