import '../../App.css';
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { FiLink } from "react-icons/fi";
import {Link, useHistory} from "react-router-dom";
import Event from "../Attendee/Event";

const Entry = ({ setToken }) => {

    const history = useHistory();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const roomCode = event.target[0].value;
        event.preventDefault();
        event.stopPropagation();
        setToken(roomCode);
        history.push("/event");
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
                Join
                </Button>
            </Form>
            <Navbar fixed="bottom">
                <Navbar.Text className="mx-auto navbar-text">
                    <Link to="/host" className="clickable-link">Hosting an event? Click here</Link>
                </Navbar.Text>
            </Navbar>
        </div>
    )
}
export default Entry;
