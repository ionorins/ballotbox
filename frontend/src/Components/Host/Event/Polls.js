import '../../../App.css';
import FormBuilder from "../../FormBuilder/FormBuilder";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {FiThumbsUp, FiUser} from "react-icons/fi";
import {FaPlus} from "react-icons/fa";
import NewEvent from "../NewEvent";
import Card from "react-bootstrap/Card";
import NewPoll from "./NewPoll";
import Accordion from "react-bootstrap/Accordion";
import FreeText from "../../FormBuilder/Types/FreeText";
import {ImBubble} from "react-icons/im";
import {FaTheaterMasks} from "react-icons/fa";
import {MdFormatListBulleted} from "react-icons/md";

export const getIcon = (type) => {
    if (type === "freeText")
        return <ImBubble  className="mb-1 mx-1"/>;
    else if (type === "multipleChoice")
        return <MdFormatListBulleted className="mx-1 mb-1"/>;
    else return <FaTheaterMasks className="mx-1 mb-1"/>;
}

const Polls = ({attendees}) => {


    let { id } = useParams();
    const [cookies, setCookies] = useCookies(['access_token']);
    const [pollsList, setPollsList] = useState([]);
    const [show, setShow] = useState(false);
    const [or, setOr] = useState("");

    async function getPolls() {
        console.log("TEST")
        fetch('http://localhost:8000/host/event/'+id+'/polls', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.length > 0)
                    setOr("or");
                setPollsList(responseJson);
            });
    }

    useEffect(() => {
        getPolls();
}, []);

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
                                            { (poll.answers.length > 0  ? poll.answers.map((answer) =>
                                                <ListGroup.Item>
                                                    {answer.answer}
                                                </ListGroup.Item>
                                            ) : "No one has answered yet :(")
                                            }
                                            </ListGroup>
                                        </Col>
                                        <Col sm={3}>
                                            {poll.answers.length} / {attendees} <FiUser className="mb-1"/>
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
            <Accordion>
                    <Card style={{cursor: "pointer",}} onClick={() => setShow(true)}>
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
                <NewPoll show={show} onS setShow={setShow} getPolls={getPolls}/>
        </div>

    );
}
export default Polls;

