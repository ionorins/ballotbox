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
        // form validation
        console.log(email);
        console.log(pass);
        event.preventDefault();
        event.stopPropagation();
      };

    return (
            <Form className="forms mx-auto" onSubmit={handleSubmit}>
                <InputGroup controlId="user" className="my-4" size="lg">
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FiUser/>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="username" placeholder="Username" size="lg" />
                </InputGroup>
                <InputGroup controlId="email" className="my-4" size="lg">
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FiMail />
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="email" placeholder="Email" size="lg" />
                </InputGroup>
                <InputGroup size="lg">
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FiLock />
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="password" placeholder="Password" />
                </InputGroup>
                <InputGroup controlId="confirmPassword" className="my-4" size="lg">
                    <InputGroup.Prepend>
                    <InputGroup.Text>
                            <FiLock />
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="password" placeholder="Confirm Password"/>
                </InputGroup>
            <Button type="submit" className="buttons my-4">
                Sign up
            </Button>
            </Form>
    )
}
export default Login;
