import '../../App.css';
import {Link, useHistory} from "react-router-dom";
import Card from "react-bootstrap/Card";
import EventList from "./EventList";
import React, {useState} from "react";
import {useCookies} from "react-cookie";
import TitleLogo from "../Utils/TitleLogo";
import Logout from "../Access/Logout.js";

const Host = () => {

    let history = useHistory();

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);

    const [load, setLoad] = useState(false);

    if (cookies['access_token'] == null) {
        history.push('/login');
    }
    fetch('http://localhost:8000/host/events', {
        method: 'GET',
        headers: {
                "Authorization": "Bearer "+cookies['access_token'],
        }
    }).then((response) => {
        if (response.status === 403)
            history.push('/login');
        else
            setLoad(true);

    });
    if (load) {
        return (
            <div className="container">
                <Link className="clickable-link" to="/">
                    <h1 className="display-3">BallotBox <TitleLogo /></h1>
                </Link>

                <Card className="access-card">
                    <Card.Body className="access-card-body">
                        <h3 className="mb-3">Your Events</h3>
                        <EventList />
                    </Card.Body>
                </Card>
                <Card.Footer style={{background: "none", borderTop: "none"}}>
                    <Logout />
                </Card.Footer>
            </div>
        );
    }
    else return null;

}
export default Host;
