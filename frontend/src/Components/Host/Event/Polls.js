import '../../../App.css';
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FiUser } from "react-icons/fi";
import Card from "react-bootstrap/Card";
import NewPoll from "./NewPoll";
import Accordion from "react-bootstrap/Accordion";
import { ImBubble } from "react-icons/im";
import { FaTheaterMasks } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";
import {tooltipLabeller} from "./PollBuilder/Types/MoodSlider";

/**
 * Polls component for ControlPanel, allowing poll creation
 * dependent on NewPoll
 *
 * @param attendees - number of attendees to check who has answered
 * @returns Accordion of polls, new poll creator
 */
const Polls = ({ attendees }) => {


    let { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);
    const [pollsList, setPollsList] = useState([]);
    const [show, setShow] = useState(false);
    const [or, setOr] = useState("");

    /**
     * Gets polls from API
     */
    async function getPolls() {
        // Link to polls endpoint
        fetch('/host/event/' + id + '/polls', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + cookies['access_token'],
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length > 0)
                    setOr("or");
                setPollsList(responseJson);
            });
    }

    /**
     * Sets refresh on polls to 3000ms on mount, closing on unmount
     */
    useEffect(() => {
        getPolls();
        const timeoutID = setInterval(() => {
            getPolls();
        }, 3000);
        return () => clearInterval(timeoutID);
        // eslint-disable-next-line
    }, [])


    return (
        <div>
            <div className="polls-container">
                <Accordion>
                    {pollsList.length > 0 ? pollsList.map((poll) =>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle eventKey={poll.id} className="builder-toggle">
                                    {poll.content['prompt']} {getIcon(poll.content.type)}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={poll.id}>
                                <Card.Body>
                                    <Row>
                                        <Col sm={8}>
                                            Responses
                                            <ListGroup variant="flush" className="answers-container">
                                                {(poll.answers.length > 0 ? poll.answers.map((answer) =>
                                                    <ListGroup.Item>
                                                        {answer.answer} {(poll.content.type === "moodSlider" ? tooltipLabeller(answer.answer) : "")}
                                                    </ListGroup.Item>
                                                ) : <div className="my-3">No one has answered yet :(</div>)
                                                }
                                            </ListGroup>
                                        </Col>
                                        <Col sm={3}>
                                            {poll.answers.length} / {attendees} <FiUser className="mb-1" />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ) : "No polls submitted yet :("}
                </Accordion>
            </div>
            <div className="my-2">
                {or}
            </div>
            <Accordion className="mb-2">
                <Card style={{ cursor: "pointer", }} onClick={() => setShow(true)}>
                    <Card.Header>
                        <Accordion.Toggle eventKey="#'" className="builder-toggle">
                            Create a new poll...
                            </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="#">
                        <Card.Body>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <NewPoll show={show} onS setShow={setShow} getPolls={getPolls} />
        </div>

    );
}

/**
 * Gets corresponding icon for poll type
 * @param type of poll
 * @returns question icon
 */
export const getIcon = (type) => {
    if (type === "freeText")
        return <ImBubble className="mb-1 mx-1" />;
    else if (type === "multipleChoice")
        return <MdFormatListBulleted className="mx-1 mb-1" />;
    else return <FaTheaterMasks className="mx-1 mb-1" />;
}

export default Polls;

