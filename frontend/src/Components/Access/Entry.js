import '../../App.css';
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { FiLink } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import TitleLogo from "../Utils/TitleLogo";
import { useParams } from "react-router-dom";
import Div100vh from "react-div-100vh";

/**
 * Component that is shown on the root of the application, where attendees can join events
 *
 * @returns event entry page
 */
const Entry = () => {

    // routing
    const history = useHistory();

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);
    const [validated, setValidated] = useState(<></>);

    /**
     * Deals with submission of event code into form, if valid code then joins event.
     * @param event submission
     */
    const handleSubmit = (event) => {
        const roomCode = event.target[0].value;

        // communicate with attendee endpoint
        fetch('/attendee/login/' + roomCode, {
            method: 'POST',
            body: "",
        }).then((response) => {
            if (response.status !== 200) {
                setValidated("That event does not exist.")
            }
            else {
                response.json().then((responseJson) => {
                    setCookies('access_token', responseJson["access_token"]);
                    history.push("/event");
                })
            }

        });

        setValidated(true);
        event.preventDefault();
        event.stopPropagation();

    };

    // code from url, for QR code linkage
    let { code } = useParams();

    return (
        <Div100vh>
        <div className="main-container">
            <h1 className="display-4">BallotBox <TitleLogo /></h1>
            <Form className="forms mx-auto my-3 flex-column" onSubmit={handleSubmit}>
                <InputGroup className="mt-2">
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FiLink />
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control required size="lg" placeholder="Event Code" maxLength="8" defaultValue={code} />
                </InputGroup>
                <Form.Text style={{ color: "crimson", }}>
                    {validated}
                </Form.Text>
                <Button className="buttons my-3" type="submit">
                    Join
                </Button>
            </Form>
            <Navbar fixed="bottom">
                <Navbar.Text className="mx-auto navbar-text">
                    <Link to="/host" className="clickable-link">Hosting an event? Click here</Link>
                </Navbar.Text>
            </Navbar>
        </div>

        </Div100vh>
    )
}
export default Entry;
