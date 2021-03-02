import '../../../App.css';
import {Link, useParams} from "react-router-dom";
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
import {Fade, Row} from "react-bootstrap";
import TitleLogo from "../../Utils/TitleLogo";
import Col from "react-bootstrap/Col";
import Logout from "../../Access/Logout";


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
            <Navbar fixed="top" className="flex-column mb-3">
                <Row className="min-vw-100">
                    <Navbar.Text className="mx-auto nav-stats-font">
                        <Link to="/host" className="clickable-link">
                            {eventName} <TitleLogo />
                        </Link>
                    </Navbar.Text>
                    <Navbar.Text>
                            <Logout />
                    </Navbar.Text>
                </Row>
                <Row className="min-vw-100">
                    <Col  className="text-left">
                        <div className="nav-stats-font copy-link" ref={target} style={{whiteSpace: "nowrap"}} onClick={() => {setShow(!show); navigator.clipboard.writeText(eventCode)}}>
                            <FiLink className="mb-1"/> { eventCode }
                        </div>
                        <Overlay target={target.current} show={show} placement="bottom">
                            {(props) => (
                                <Tooltip id="overlay-example" {...props}>
                                    Copied!
                                </Tooltip>

                            )}
                        </Overlay>
                    </Col>
                    <Col className="text-right">
                        <div className="nav-stats-font">
                            <span id="attendees" className="">{ attendees }</span> <FiUser className="mb-1"/>
                        </div>
                    </Col>
                </Row>
            </Navbar>
            <Card className="standard-card">
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
                <Card.Body className="access-card-body control-panel-card-body">
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
        </div>

    );
}
export default ControlPanel;
