import '../../App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {FiLock, FiMail} from "react-icons/fi";
import {useCookies} from "react-cookie";
import { useHistory } from "react-router-dom";

const Signup = () => {

    const [cookies, setCookies] = useCookies(['access_token']);
    let history = useHistory();

    const handleSubmit = (event) => {
        const email = event.target[0].value;
        const pass = event.target[1].value;
        // form validation
        event.preventDefault();
        event.stopPropagation();
        fetch('http://localhost:8000/auth/create', {
            method: 'POST',
            body: JSON.stringify({
                username: email,
                password: pass,
            }),
        }).then((response) => {
            if (response.status !== 201) {
                alert("Signup failed");
                return;
            }
            else {
                alert("Signup succesful");
                response.json().then((responseJson) => {
                    setCookies('access_token', responseJson["access_token"]);
                    history.push("/host");
                })
            }
        });

      };

    return (
            <Form className="forms mx-auto" onSubmit={handleSubmit}>
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
export default Signup;
