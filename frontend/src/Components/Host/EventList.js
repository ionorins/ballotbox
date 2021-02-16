import '../../App.css';
import {FaPlay, FaPlus} from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import NewEvent from "./NewEvent";
import {useCookies} from "react-cookie";


const EventList = () => {

    let history = useHistory();

    const [cookies, setCookie] = useCookies(['access_token']);

    const [show, setShow] = useState(false);

    const [events, setEvents] = useState(<> </>);

    const selectEvent = (eventId) => {
        console.log(eventId);
        history.push("/host/event/"+eventId);
    }


    useEffect(() => {
        fetch('http://localhost:8000/host/events', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const eventMap = responseJson.map((event) =>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <Row className="text-left mx-1">
                                    {event.name}

                                </Row>
                                <Row className="text-left mx-1">
                                    {event.code}
                                </Row>
                            </Col>
                            <Col>
                                <Row className="float-right">
                                    <Button className="mx-2 event-select-button" size={"lg"} onClick={() => selectEvent(event.code)}>
                                        <FaPlay />
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                );
                setEvents(eventMap);
            });
    }, []);

    return (
        <div>
            <ListGroup>
                {events}
                <ListGroup.Item>
                    <Row>
                        <Col>
                            <Row className="text-left align-items-center mt-2 mx-1">
                                Create a new event...
                            </Row>
                        </Col>
                        <Col>
                            <Row className="float-right">
                                <Button className="mx-2 event-select-button" size={"lg"} onClick={() => setShow(true)}>
                                    <FaPlus />
                                </Button>
                                <NewEvent show={show} setShow={setShow}/>
                            </Row>
                        </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>

        </div>

    );
}
export default EventList;
