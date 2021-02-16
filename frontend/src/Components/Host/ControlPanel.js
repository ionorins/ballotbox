import '../../App.css';
import {useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import React, {useEffect, useState} from "react";
import Tab from "react-bootstrap/Tab";
import CommentWall from "../Event/CommentWall";
import FormBuilder from "../FormBuilder/FormBuilder";
import Loading from "../../Images/bboxloading.gif";
import {useCookies} from "react-cookie";


const ControlPanel = () => {
    let { id } = useParams();

    const [cookies, setCookie] = useCookies(['access_token']);
    const [eventName, setEventName] = useState("Loading...");
    const [eventCode, setEventCode] = useState("Loading...");

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
    }, []);

    return (
        <div className="container">
            <Card className="standard-card">
                <h1 className="display-4">BallotBox 🗳️</h1>
                <h2 className="display-5">{ eventName }</h2>
                <h3 className="display-5">{ eventCode }</h3>
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
