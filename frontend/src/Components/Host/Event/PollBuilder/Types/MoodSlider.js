import '../../../../../App.css';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import RangeSlider from 'react-bootstrap-range-slider';
import { useState } from "react";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

/**
 * Mood slider based poll creator used in polls component,
 * uses react-bootstrap-range-slider module
 *
 * @param setShow - modal state passdown
 * @returns poll creation form
 */
const MoodSlider = ({ setShow }) => {

    const [value, setValue] = useState(0);

    let { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);

    /**
     * Handles submission of form, aka poll creation
     * @param event submission
     */
    const handleSubmit = (event) => {
        const prompt = event.target[0].value;
        event.preventDefault();
        event.stopPropagation();
        // link to poll creation endpoint
        fetch('/host/event/' + id + "/poll", {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + cookies['access_token'],
            },
            body: JSON.stringify({
                content: {
                    "prompt": prompt,
                    "type": "moodSlider",
                }
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                setShow();
            });
        event.currentTarget.reset();
    };


    return (
        <Form className="px-3" onSubmit={handleSubmit}>
            <InputGroup controlId="email" className="my-4" size="lg">
                <Form.Control type="text" placeholder="Question prompt" />
            </InputGroup>
            <Row>
                <Col>
                    Preview:
                </Col>

            </Row>

            <Row>
                <Col>
                    <RangeSlider
                        value={value}
                        onChange={changeEvent => setValue(changeEvent.target.value)}
                        tooltipLabel={tooltipLabeller}
                    />
                </Col>

            </Row>
            <Button variant="primary" type="submit" className="buttons my-2">
                Send
            </Button>
        </Form>

    )
}
export default MoodSlider;

/**
 * Tooltip labeller for range slider, maps emoji to values
 * @param value
 * @returns emoji
 */
export function tooltipLabeller(value){
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
