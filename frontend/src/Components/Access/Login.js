import '../../App.css';
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {FiUser, FiLock, FiMail} from "react-icons/fi";
import Home from '../Home.js';
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
            <h1 className="display-1 clickable-link" onClick={() => window.location.reload()}>BallotBox🗳️</h1>
            <Form className="forms mx-auto" onSubmit={handleSubmit}>
                <InputGroup controlId="email" className="my-2">
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FiMail/>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="email" placeholder="Email" size="lg" />
                </InputGroup>

                <InputGroup controlId="password" className="my-2">
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FiLock/>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="password" placeholder="Password" size="lg" />
                </InputGroup>
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