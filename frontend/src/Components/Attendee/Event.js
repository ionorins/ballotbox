import '../../App.css';
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import React, {useState} from "react";
import AttendeeCommentWall from "./AttendeeCommentWall";

const Event = () => {

    const [view, setView] = useState(<AttendeeCommentWall />)

    return (
        <div className="container">
            <h1 className="display-3">BallotBox 🗳️</h1>
            <Card className="standard-card">
                <Card.Header style={{borderBottom: "none", backgroundColor: "transparent",}}>
                    <Nav variant="tabs" className="tab-bar" defaultActiveKey="#comments">
                        <Nav.Item className="custom-nav-tabs mx-1">
                            <Nav.Link className="custom-nav-links" href="#comments">
                                Comments
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="custom-nav-tabs mx-1">
                            <Nav.Link className="custom-nav-links" href="#polls" >
                                Polls
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body className="access-card-body">
                    { view }
                </Card.Body>
            </Card>
        </div>
    )
}
export default Event;
