import '../../App.css';
import {useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Login from "../Access/Login";
import Signup from "../Access/Signup";
import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import CommentWall from "../Event/CommentWall";
import FormBuilder from "../FormBuilder/FormBuilder";
import Loading from "../../Images/bboxloading.gif";


const ControlPanel = () => {
    let { id } = useParams();
    return (
        <div className="container">
            <Card className="access-card">
                <h1 className="display-4">BallotBox 🗳️</h1>
                <h2 className="display-5">event name</h2>
                <Tab.Container defaultActiveKey="comments">
                <Card.Header style={{borderBottom: "none", backgroundColor: "transparent",}}>
                    <Nav variant="tabs" className="tab-bar" >
                        <Nav.Item className="custom-nav-tabs mx-1">
                            <Nav.Link className="custom-nav-links" eventKey="emotion">
                                Emotion Analysis
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="custom-nav-tabs mx-1">
                            <Nav.Link className="custom-nav-links" eventKey="comments">
                                Comments
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="custom-nav-tabs mx-1">
                            <Nav.Link className="custom-nav-links" eventKey="polls">
                                Polls
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body className="access-card-body">
                    <Tab.Content>
                        <Tab.Pane eventKey="emotion">
                            <img src={Loading}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="comments">
                            <CommentWall />
                        </Tab.Pane>
                        <Tab.Pane eventKey="polls">
                            <FormBuilder />
                        </Tab.Pane>
                    </Tab.Content>
                </Card.Body>
                </Tab.Container>
            </Card>
        </div>

    );
}
export default ControlPanel;
