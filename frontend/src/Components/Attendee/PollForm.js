import '../../App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCookies } from "react-cookie";
import RangeSlider from "react-bootstrap-range-slider";
import React, { useState } from "react";
import {tooltipLabeller} from "../Host/Event/PollBuilder/Types/MoodSlider";

/**
 * Submission form for individual polls
 *
 * @param poll - to be answered
 * @param getPolls - getPolls function passdown to refresh polls after answering
 * @returns form to submit for poll
 */
const PollForm = ({ poll, getPolls }) => {

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);
    const [value, setValue] = useState(0);

    /**
     * Collects attendee answers pre-submission
     * @param event submission
     * @returns answers
     */
    const getAnswer = (event) => {
        let answers = [];
        if (poll.content.type === "multipleChoice") {
            let i;
            for (i = 0; i < event.target.length; i++) {
                if (event.target[i].checked)
                    answers.push(event.target[i].id);
            }
            return answers;
        }
        else return event.target[0].value;
    }

    /**
     * Handles submission of answer to poll
     * @param event
     */
    const handleSubmit = (event) => {
        // Link to poll answer endpoint
        fetch('/attendee/poll/' + poll.id + '/answer', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + cookies['access_token'],
            },
            body: JSON.stringify({
                content: {
                    answer: getAnswer(event)
                }
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                getPolls();
            });
        event.preventDefault();
        event.stopPropagation();

    }

    /**
     * @returns correct form dependent on poll type
     */
    const formBody = () => {
        if (poll.content.type === "freeText") {
            return (<Form.Control as="textarea" placeholder="Write your answer here..." />)
        }
        else if (poll.content.type === "moodSlider") {
            return (<RangeSlider
                value={value}
                onChange={changeEvent => setValue(changeEvent.target.value)}
                tooltipLabel={tooltipLabeller}
            />)
        }
        else if (poll.content.type === "multipleChoice") {
            const optionMap = poll.content.options.map((option) =>
                <Form.Check id={option} label={option} />
            );
            return optionMap;
        }
    }

    return (
        <Form className="px-3 mx-auto" onSubmit={handleSubmit}>
            <Form.Group className="my-1" size="lg">
                <Form.Label style={{ fontSize: "xx-large", }}>{poll.content.prompt}</Form.Label>
                {formBody()}
            </Form.Group>
            <Button variant="primary" type="submit" className="buttons my-2">
                Submit
            </Button>
        </Form>
    )
}
export default PollForm;
