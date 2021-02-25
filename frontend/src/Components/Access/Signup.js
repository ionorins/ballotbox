import '../../App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {FiLock, FiMail} from "react-icons/fi";
import {useCookies} from "react-cookie";
import { useHistory } from "react-router-dom";
import {useState} from "react";

const Signup = () => {

    const [cookies, setCookies] = useCookies(['access_token']);
    const [emailValidated, setEmailValidated] = useState("");
    const [passValidated, setPassValidated] = useState("");
    let history = useHistory();

    const handleSubmit = (event) => {
        const email = event.target[0].value;
        const pass = event.target[1].value;
        // form validation!!!!!

        // check passwords

        event.preventDefault();
        event.stopPropagation();
        fetch('/auth/create', {
            method: 'POST',
            body: JSON.stringify({
                username: email,
                password: pass,
            }),
        }).then((response) => {
            if (response.status === 403) {
                setPassValidated("");
                setEmailValidated("Email already in use");
                return;
            }
            else if (response.status === 422) {
                setEmailValidated("");
                setPassValidated("Password requires 8 characters and at least 1 number")
            }
            else {
                response.json().then((responseJson) => {
                    setCookies('access_token', responseJson["access_token"]);
                    history.push("/host");
                })
            }
        });

      };

    return (
            <Form className="forms mx-auto" onSubmit={handleSubmit}>
                <Form.Text style={{color: "crimson",}}>
                    {emailValidated}
                </Form.Text>
                <InputGroup controlId="email" className="mb-4" size="lg">
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FiMail />
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="email" placeholder="Email" size="lg" />
                </InputGroup>
                <Form.Text style={{color: "crimson",}}>
                    {passValidated}
                </Form.Text>
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
            <Button type="submit" className="buttons my-2">
                Sign up
            </Button>
            </Form>
    )
}
export default Signup;
