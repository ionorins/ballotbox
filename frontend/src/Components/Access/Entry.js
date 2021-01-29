import '../../App.css';
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { FiLink } from "react-icons/fi";
import Home from '../Home.js';
import Login from './Login.js';
import Signup from './Signup.js';

const Entry = ({ setPage }) => {

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const roomCode = event.target[0].value;
        event.preventDefault();
        event.stopPropagation();
        setPage(<Home roomCode={roomCode}/>)
      };

    return (
        <div className="container">
            <h1 className="display-1">BallotBox 🗳️</h1>
            <Form className="forms mx-auto my-3" onSubmit={handleSubmit}>
                <InputGroup className="my-2">
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FiLink/>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control size="lg" placeholder="Event Code" maxLength="5" />
                </InputGroup>
                <Button className="buttons my-2" type="submit">
                Submit
                </Button>
            </Form>
            <Navbar fixed="bottom">
                <Navbar.Text className="mx-auto navbar-text">
                    Want to host an event? <a className="clickable-link" onClick={() => setPage(<Login />)}>Login</a> or <a className="clickable-link" onClick={() => setPage(<Signup />)}>sign up</a>
                </Navbar.Text>
            </Navbar>
        </div>
    )
}
export default Entry;