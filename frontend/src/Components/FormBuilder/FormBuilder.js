import '../../App.css';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import React, {useState} from "react";
import FreeText from "./Types/FreeText";
import MultipleChoice from "./Types/MultipleChoice";
import MoodSlider from "./Types/MoodSlider";
import Accordion from "react-bootstrap/Accordion";
import {ImBubble} from "react-icons/im";
import {FaTheaterMasks} from "react-icons/fa";
import {MdFormatListBulleted} from "react-icons/md";

const FormBuilder = () => {

    const [option, setOption] = useState(<p> Select a module to add</p>);

    const select = (option) => {
        setOption(option)
    };

    const questions = <ListGroup.Item>Test</ListGroup.Item>

    return (
                <Accordion className="text-center">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle eventKey="0" className="builder-toggle">
                                Free Text <ImBubble  className="mb-1 mx-1"/>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <FreeText/>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle eventKey="1" className="builder-toggle">
                                Multiple Choice <MdFormatListBulleted className="mx-1 mb-1"/>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <MultipleChoice/>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle eventKey="2" className="builder-toggle">
                                Mood Slider <FaTheaterMasks className="mx-1 mb-1"/>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <MoodSlider/>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
    )
}
export default FormBuilder;
