import '../../../App.css';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";


const MoodSlider = () => {

    return (
        <Form className="forms mx-auto">
            <h1>Mood Slider</h1>
            <InputGroup controlId="email" className="my-4" size="lg">
                <Form.Control type="text" placeholder="Question prompt"/>
            </InputGroup>
            Preview:
            <Row>
                <Col lg={1}>
                    ☹️
                </Col>
                <Col lg={10}>
                    <Form.Group controlId="formBasicRange">
                        <Form.Control type="range" />
                    </Form.Group>
                </Col>
                <Col lg={1}>
                    😄
                </Col>
            </Row>
            <Button variant="primary" type="submit" className="buttons my-2">
                Add
            </Button>
        </Form>
    )
}
export default MoodSlider;
