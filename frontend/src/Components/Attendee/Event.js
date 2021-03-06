import '../../App.css';
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import React, {useEffect, useState} from "react";
import AttendeeCommentWall from "./AttendeeCommentWall";
import Tab from "react-bootstrap/Tab";
import AttendeePolls from "./AttendeePolls";
import Badge from "react-bootstrap/Badge";
import {Link, useHistory} from "react-router-dom";
import TitleLogo from "../Utils/TitleLogo";
import Div100vh from "react-div-100vh";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {RiThumbUpFill, RiThumbUpLine} from "react-icons/ri";
import {useCookies} from "react-cookie";

const Event = () => {

    const [unansweredPolls, setUnansweredPolls] = useState(0);
    const [cookies, setCookies] = useCookies(['access_token']);

    const [load, setLoad] = useState(false);

    let history = useHistory();

    useEffect(() => {
        fetch('/attendee/comments', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + cookies['access_token'],
            }
        }).then((response) => {
            if (response.status === 403) {
                history.push('/');
            }
            else setLoad(true);
        });
        // eslint-disable-next-line
    }, [])

    if (load)
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
    );
    else return null;
}
export default Event;
