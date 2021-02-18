import '../../../App.css';
import FormBuilder from "../../FormBuilder/FormBuilder";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {FiThumbsUp} from "react-icons/fi";
import {FaPlus} from "react-icons/fa";
import NewEvent from "../NewEvent";
import Card from "react-bootstrap/Card";
import NewPoll from "./NewPoll";
import Accordion from "react-bootstrap/Accordion";
import FreeText from "../../FormBuilder/Types/FreeText";


const Polls = () => {


    let { id } = useParams();
    const [cookies, setCookies] = useCookies(['access_token']);
    const [pollsList, setPollsList] = useState(<></>);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/host/event/'+id+'/polls', {
        method: 'GET',
        headers: {
            "Authorization": "Bearer "+cookies['access_token'],
        }
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            const polls = responseJson.map((poll) =>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle eventKey={poll.id} className="builder-toggle">
                            {poll.content['prompt']}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={poll.id}>
                        <Card.Body>
                            { (poll.answers.length > 0  ? poll.answers.map((answer) =>
                                    <ListGroup.Item>
                                        {answer.answer}
                                    </ListGroup.Item>
                                ) : "No one has answered yet :(")
                            }
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            );
            setPollsList(polls);
        });
}, []);

    return (
        <div>
                <Accordion>
                    {pollsList}
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
                <NewPoll show={show} setShow={setShow} />
        </div>

    );
}
export default Polls;
