import '../../App.css';
import Card from "react-bootstrap/Card";
import React from "react";
import FreeText from "./Types/FreeText";
import MultipleChoice from "./Types/MultipleChoice";
import MoodSlider from "./Types/MoodSlider";
import Accordion from "react-bootstrap/Accordion";
import {ImBubble} from "react-icons/im";
import {FaTheaterMasks} from "react-icons/fa";
import {MdFormatListBulleted} from "react-icons/md";

const FormBuilder = ({setShow}) => {

    return (
                <Accordion className="text-center">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle eventKey="0" className="builder-toggle">
                                Free Text <ImBubble  className="mb-1 mx-1"/>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                                <FreeText setShow={setShow}/>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle eventKey="1" className="builder-toggle">
                                Multiple Choice <MdFormatListBulleted className="mx-1 mb-1"/>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <MultipleChoice setShow={setShow}/>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle eventKey="2" className="builder-toggle">
                                Mood Slider <FaTheaterMasks className="mx-1 mb-1"/>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <MoodSlider setShow={setShow}/>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
    )
}
export default FormBuilder;
