import '../../App.css';
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventList from "./EventList";
import React, {useState} from "react";
import {useCookies} from "react-cookie";
import Navbar from "react-bootstrap/Navbar";

const Host = () => {

    let history = useHistory();

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

                <h1 className="display-4">BallotBox 🗳️</h1>
                <Card className="main-card">
                    <Tab.Container defaultActiveKey="events">
                        <Row className="px-3 py-2">
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="events">Events</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="account">Account</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="events">
                                        <EventList/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="account">
                                        account
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Card>

            </div>
        );
    }
    else return null;

}
export default Host;
