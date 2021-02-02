import '../../App.css';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import {useState} from "react";
import Home from "../Home";
import FreeText from "./Types/FreeText";
import MultipleChoice from "./Types/MultipleChoice";
import MoodSlider from "./Types/MoodSlider";

const FormBuilder = () => {

    const [option, setOption] = useState(<p> Select a module to add</p>);

    const select = (option) => {
        setOption(option)
    };

    const questions = <ListGroup.Item>Test</ListGroup.Item>

    return (
            <Card className="main-card mx-auto">
                <Row className="builder-row">
                    <Col lg={3}className="builder-cols-left">
                        <ListGroup variant="flush">
                            <ListGroup.Item className="font-weight-bold">Form Modules</ListGroup.Item>
                            <ListGroup.Item className="builder-option" onClick={() => select(<FreeText/>)}>Free Text</ListGroup.Item>
                            <ListGroup.Item className="builder-option" onClick={() => select(<MultipleChoice/>)}>Multiple Choice</ListGroup.Item>
                            <ListGroup.Item className="builder-option" onClick={() => select(<MoodSlider />)}>Mood Slider</ListGroup.Item>
                            <ListGroup.Item className="builder-option" onClick={() => select(4)}>Option 4</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col lg={6} className="align-self-center">
                        { option }
                    </Col>
                    <Col lg={3} className="builder-cols-right">
                        <ListGroup variant="flush" className="option-lists">
                            <ListGroup.Item className="font-weight-bold">Form Preview</ListGroup.Item>
                            { questions }
                        </ListGroup>
                    </Col>
                </Row>
            </Card>
    )
}
export default FormBuilder;
