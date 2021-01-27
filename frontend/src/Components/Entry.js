import '../App.css';
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Home from './Home.js';
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
                <Form.Group controlId="eventCode">
                    <Form.Control size="lg" placeholder="Event Code" maxLength="5" />
                </Form.Group>
                <Button className="buttons my-2" type="submit">
                Submit
                </Button>
            </Form>
            <Navbar fixed="bottom">
                <Navbar.Text className="mx-auto navbar-text">
                    Want to host an event? <a onClick={() => setPage(<Login />)}>Login</a> or <a onClick={() => setPage(<Signup />)}>sign up</a>
                </Navbar.Text>
            </Navbar>
        </div>
    )
}
export default Entry;