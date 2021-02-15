import '../../App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {FiUser, FiLock, FiMail} from "react-icons/fi";
import {sha256} from 'js-sha256';
import { useHistory } from "react-router-dom";

const Login = ({setToken}) => {
    let history = useHistory();

    const handleSubmit = (event) => {
        const email = event.target[0].value;
        const pass = sha256(event.target[1].value);
        let form = new FormData();
        form.append("username", email);
        form.append("password", pass);
        console.log(email);
        console.log(pass);
        event.preventDefault();
        event.stopPropagation();
        fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            body: form,
        }).then((response) => {
            if (response.status === 201) {
                setToken(email);
                history.push("/host");

            }
            else {
                alert("Incorrect details");
            }
        });

    };
        //localStorage.setItem('token', JSON.stringify(email));
        //localStorage.setItem('loggedIn', JSON.stringify("true"));


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
