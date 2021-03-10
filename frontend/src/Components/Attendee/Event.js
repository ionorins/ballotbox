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
import {useCookies} from "react-cookie";

/**
 * Event macro component, dependent on AttendeeCommentWall, AttendeePolls
 * @returns the entire event view for attendees
 * @constructor
 */
const Event = () => {

    const [unansweredPolls, setUnansweredPolls] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);

    const [load, setLoad] = useState(false);

    let history = useHistory();

    /**
     * Check if user is authorised for event, otherwise send back to home page
     */
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
            <div className="main-container">
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
