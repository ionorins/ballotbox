import '../../App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { FiLock, FiMail } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { useCookies, withCookies } from "react-cookie";
import { useState } from "react";

const Login = () => {
    let history = useHistory();

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['access_token']);
    const [validated, setValidated] = useState("");

    const handleSubmit = (event) => {
        const email = event.target[0].value;
        const pass = event.target[1].value;
        let form = new FormData();
        form.append("username", email);
        form.append("password", pass);
        event.preventDefault();
        event.stopPropagation();
        fetch('/auth/login', {
            method: 'POST',
            body: form,
        }).then((response) => {
            if (response.status !== 201) {
                setValidated("Invalid email/password combination")
                return;
            }
            response.json().then((responseJson) => {
                setCookie('access_token', responseJson["access_token"]);
                history.push("/host");
            })
        });

    };

    return (
        <Form className="forms mx-auto" onSubmit={handleSubmit}>
            <InputGroup className="mt-4" size="lg">
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        <FiMail />
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="email" placeholder="Email" />
            </InputGroup>

            <InputGroup className="mt-4" size="lg">
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        <FiLock />
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="password" placeholder="Password" />
            </InputGroup>
            <Form.Text style={{ color: "crimson", }}>
                {validated}
            </Form.Text>
            <Button variant="primary" type="submit" className="buttons mt-4 mb-2">
                Log in
            </Button>
        </Form>
    )
}
export default withCookies(Login);
