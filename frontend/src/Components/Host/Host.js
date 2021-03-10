import '../../App.css';
import {Link, useHistory} from "react-router-dom";
import Card from "react-bootstrap/Card";
import EventList from "./EventList";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import TitleLogo from "../Utils/TitleLogo";
import Logout from "../Access/Logout.js";
import Div100vh from "react-div-100vh";

/**
 * Host macro component for managing events
 *
 * @returns host view of events
 */
const Host = () => {

    let history = useHistory();

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);

    const [load, setLoad] = useState(false);

    if (cookies['access_token'] == null) {
        history.push('/login');
    }

    /**
     * Check host is logged in on mount
     */
    useEffect(() => {
        fetch('/host/events', {
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
        // eslint-disable-next-line
    }, []);


    if (load)
        return (
            <Div100vh>
            <div className="main-container">
                <Link className="clickable-link" to="/">
                    <h1 className="display-4">BallotBox <TitleLogo /></h1>
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

            </Div100vh>
        );
    else return null;

}
export default Host;
