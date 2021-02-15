import '../../App.css';
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Login from "../Access/Login";
import Signup from "../Access/Signup";
import React, {useState} from "react";
import CommentWall from "../Event/CommentWall";

const Event = ({token}) => {

    const [view, setView] = useState(<CommentWall />)

    return (
        <div className="container">
            <h1 className="display-3">BallotBox 🗳️</h1>
            <Card className="access-card">
                <Card.Header style={{borderBottom: "none", backgroundColor: "transparent",}}>
                    <Nav variant="tabs" className="tab-bar" defaultActiveKey="#comments">
                        <Nav.Item className="custom-nav-tabs mx-1">
                            <Nav.Link className="custom-nav-links" href="#comments" onClick={() => setView(<CommentWall />)}>
                                Comments
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="custom-nav-tabs mx-1">
                            <Nav.Link className="custom-nav-links" href="#polls" onClick={() => setView(<Signup />)}>
                                Polls
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body className="access-card-body">
                    {view}
                </Card.Body>
            </Card>
        </div>
    )
}
export default Event;
