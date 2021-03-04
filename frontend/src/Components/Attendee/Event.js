import '../../App.css';
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import React, { useState } from "react";
import AttendeeCommentWall from "./AttendeeCommentWall";
import Tab from "react-bootstrap/Tab";
import AttendeePolls from "./AttendeePolls";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import TitleLogo from "../Utils/TitleLogo";
import Div100vh from "react-div-100vh";

const Event = () => {

    const [unansweredPolls, setUnansweredPolls] = useState(0);

    return (
        <Div100vh>
            <div className="container">
                <Link className="clickable-link mt-3" to="/">
                    <h1 className="display-4">BallotBox <TitleLogo /></h1>
                </Link>
                <Card className="standard-card attendee-event-card">
                    <Tab.Container defaultActiveKey="comments">
                        <Card.Header style={{ borderBottom: "none", backgroundColor: "transparent", }}>
                            <Nav variant="tabs" className="tab-bar">
                                <Nav.Item className="custom-nav-tabs mx-1">
                                    <Nav.Link className="custom-nav-links" eventKey="comments">
                                        Comments
                            </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="custom-nav-tabs mx-1">
                                    <Nav.Link className="custom-nav-links" eventKey="polls" >
                                        Polls {unansweredPolls > 0 ? <Badge className="py-1 ml  -1" pill variant="danger">{unansweredPolls}</Badge> : ""}
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <Card.Body className="access-card-body">
                            <Tab.Content>
                                <Tab.Pane eventKey="comments">
                                    <AttendeeCommentWall />
                                </Tab.Pane>
                                <Tab.Pane eventKey="polls">
                                    <AttendeePolls setUnansweredPolls={setUnansweredPolls} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Card.Body>
                    </Tab.Container>
                </Card>
            </div>
        </Div100vh>
    )
}
export default Event;
