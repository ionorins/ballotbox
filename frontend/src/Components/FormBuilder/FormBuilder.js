import '../../App.css';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import {useState} from "react";
import FreeText from "./Types/FreeText";
import MultipleChoice from "./Types/MultipleChoice";
import MoodSlider from "./Types/MoodSlider";
import Accordion from "react-bootstrap/Accordion";

const FormBuilder = () => {

    const [option, setOption] = useState(<p> Select a module to add</p>);

    const select = (option) => {
        setOption(option)
    };

    const questions = <ListGroup.Item>Test</ListGroup.Item>

    return (
        <Card className="main-card mx-auto">
            <h1>Form Modules</h1>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle eventKey="0">
                            Free Text
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <FreeText/>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle eventKey="1">
                            Multiple Choice
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <MultipleChoice/>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle eventKey="2">
                            Mood Slider
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <MoodSlider/>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Card>
    )
}
export default FormBuilder;
