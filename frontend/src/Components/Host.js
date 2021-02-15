import '../App.css';
import { useHistory } from "react-router-dom";
import FormBuilder from "./FormBuilder/FormBuilder";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventList from "./Host/EventList";
import React, {useState} from "react";


const Host = ({token}) => {

    let history = useHistory();

    if (token == null) {
        const localToken = JSON.parse(localStorage.getItem('token'))
        if (localToken == null)
            history.push("/login");
        else
            token = localStorage.getItem('token');
    }

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
export default Host;
