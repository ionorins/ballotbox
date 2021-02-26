import '../../../App.css';
import {useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import React, {useEffect, useRef, useState} from "react";
import Tab from "react-bootstrap/Tab";
import CommentWall from "./CommentWall";
import {useCookies} from "react-cookie";
import Navbar from "react-bootstrap/Navbar";
import {FiLink,  FiUser} from "react-icons/fi";
import Polls from "./Polls";
import EmotionAnalysis from "./EmotionAnalysis";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";


const ControlPanel = () => {
    let { id } = useParams();

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['access_token']);
    const [eventName, setEventName] = useState("Loading...");
    const [eventCode, setEventCode] = useState("Loading...");
    const [attendees, setAttendees] = useState(0);
    const [show, setShow] = useState(false);
    const target = useRef(null);

    async function getAttendees() {
        fetch('http://localhost:8000/host/event/'+id+"/attendees", {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                setAttendees(responseJson.length)
            });
        setTimeout(getAttendees, 3000);
    }


    useEffect(() => {
        fetch('http://localhost:8000/host/event/'+id, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                setEventName(responseJson['name']);
                setEventCode(responseJson['code']);
            });
        getAttendees();
    }, []);

    return (
        <div className="container">
            <Navbar fixed="top">
                <Navbar.Text ref={target} onClick={() => {setShow(!show); navigator.clipboard.writeText(eventCode)}}>
                    <h1 className="nav-stats-font"> <FiLink className="mb-1"/> { eventCode }</h1>
                    <Overlay target={target.current} show={show} placement="bottom">
                        {(props) => (
                            <Tooltip id="overlay-example" {...props}>
                                Copied!
                            </Tooltip>

                        )}
                    </Overlay>
                </Navbar.Text>
                <Navbar.Text className="ml-auto">
                    <h1 className="nav-stats-font">
                        <span id="attendees" className="">{ attendees }</span> <FiUser className="mb-1"/>
                    </h1>
                </Navbar.Text>
            </Navbar>
            <Card className="standard-card">
                <h2 className="display-5">{ eventName }</h2>
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
                            <EmotionAnalysis />
                        </Tab.Pane>
                        <Tab.Pane eventKey="comments">
                            <CommentWall />
                        </Tab.Pane>
                        <Tab.Pane eventKey="polls">
                            <Polls attendees={attendees}/>
                        </Tab.Pane>
                    </Tab.Content>
                </Card.Body>
                </Tab.Container>
            </Card>
            <Navbar fixed="bottom">
                <Navbar.Text className="mx-auto navbar-text">
                    BallotBox 🗳️ | DBCampus Project 2021
                </Navbar.Text>
            </Navbar>
        </div>

    );
}
export default ControlPanel;
