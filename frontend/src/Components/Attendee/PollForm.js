import '../../App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCookies } from "react-cookie";
import RangeSlider from "react-bootstrap-range-slider";
import React, { useState } from "react";


const PollForm = ({ poll, getPolls }) => {

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);
    const [value, setValue] = useState(0);

    function tooltipLabeller() {
        console.log(value)
        if (value < 10)
            return "😭";
        if (value < 20)
            return "😢";
        if (value < 30)
            return "☹️";
        if (value < 40)
            return "🙁";
        if (value < 50)
            return "😕";
        if (value < 60)
            return "😐";
        if (value < 70)
            return "🙂";
        if (value < 80)
            return "😀";
        if (value < 90)
            return "😁";
        if (value < 101)
            return "😍";
    }

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

    const handleSubmit = (event) => {
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
            console.log(poll.content.options);
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
