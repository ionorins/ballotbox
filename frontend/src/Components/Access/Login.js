import '../../App.css';
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {FiUser, FiLock, FiMail} from "react-icons/fi";
import Home from '../Home.js';
import {sha256} from 'js-sha256';
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

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
            <Form className="forms mx-auto" onSubmit={handleSubmit}>
                <InputGroup controlId="email" className="my-4" size="lg">
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FiMail/>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="email" placeholder="Email"/>
                </InputGroup>

                <InputGroup controlId="password" className="my-4" size="lg">
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FiLock/>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="password" placeholder="Password"/>
                </InputGroup>
            <Button variant="primary" type="submit" className="buttons my-2">
                Log in
            </Button>
            </Form>
    )
}
export default Login;
