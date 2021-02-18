import '../../App.css';
import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import PollForm from "./PollForm";


const AttendeePolls = () => {

    let {id} = useParams();
    const [cookies, setCookies] = useCookies(['access_token']);
    const [pollsList, setPollsList] = useState(<></>);

    useEffect(() => {
        fetch('http://localhost:8000/attendee/polls', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                const polls = responseJson.map((poll) =>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle eventKey={poll.id} className="builder-toggle">
                                {poll.content['prompt']}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={poll.id}>
                            <Card.Body>
                                <PollForm poll={poll} />
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
            </Accordion>
        </div>

    );
}
export default AttendeePolls;
