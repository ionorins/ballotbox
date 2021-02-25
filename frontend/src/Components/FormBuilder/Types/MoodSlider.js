import '../../../App.css';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import RangeSlider from 'react-bootstrap-range-slider';
import {useState} from "react";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";

const MoodSlider = () => {

    const [value, setValue] = useState(0);

    let {id} = useParams();
    const [cookies, setCookies] = useCookies(['access_token']);

    const handleSubmit = (event) => {
        const prompt = event.target[0].value;
        event.preventDefault();
        event.stopPropagation();
        fetch('http://localhost:8000/host/event/'+id+"/poll", {
            method: 'POST',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            },
            body: JSON.stringify({
                content: {
                    "prompt": prompt,
                    "type": "moodSlider",
                }
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // u
            });
        event.currentTarget.reset();
    };


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

    return (
        <Form className="px-3" onSubmit={handleSubmit}>
            <InputGroup controlId="email" className="my-4" size="lg">
                <Form.Control type="text" placeholder="Question prompt"/>
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
