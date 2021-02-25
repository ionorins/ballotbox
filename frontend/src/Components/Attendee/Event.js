import '../../App.css';
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import React, {useState} from "react";
import AttendeeCommentWall from "./AttendeeCommentWall";
import Tab from "react-bootstrap/Tab";
import EventList from "../Host/EventList";
import AttendeePolls from "./AttendeePolls";
import Polls from "../Host/Event/Polls";
import Badge from "react-bootstrap/Badge";

const Event = () => {

    const [view, setView] = useState(<AttendeeCommentWall />);
    const [unansweredPolls, setUnansweredPolls] = useState(0);

    return (
        <div className="container">
            <h1 className="display-4">BallotBox 🗳️</h1>
            <Card className="standard-card">
                <Tab.Container defaultActiveKey="comments">
                <Card.Header style={{borderBottom: "none", backgroundColor: "transparent",}}>
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
                            <AttendeeCommentWall/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="polls">
                            <AttendeePolls setUnansweredPolls={setUnansweredPolls} />
                        </Tab.Pane>
                    </Tab.Content>
                </Card.Body>
                </Tab.Container>
            </Card>
        </div>
    )
}
export default Event;
