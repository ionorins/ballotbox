import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import React, {useEffect, useState} from "react";
import EmotionEmoji from "./Emotion/EmotionEmoji";
import PolarityLineChart from "./Emotion/PolarityLineChart";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import EmojiGrid from "./Emotion/EmojiGrid";
import {Carousel} from "react-bootstrap";
import {NextIcon, PrevIcon} from "../../Utils/CarouselIcons";
import MoodLineChart from "./Emotion/MoodLineChart";

const EmotionAnalysis = () => {

    let { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);
    const [intervalValue, setIntervalValue] = useState(5);
    const [selectedEmoji, setSelectedEmoji] = useState("joy");
    const [emojiChart, setEmojiChart] = useState(<MoodLineChart mood={"joy"} interval={intervalValue}/>);

    const handleEmojiClick = (event) => {
        setSelectedEmoji(event.target.id);
    }


    return (
        <div>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <EmojiGrid selected={selectedEmoji} handler={handleEmojiClick}/>
                </ListGroup.Item>
                <ListGroup.Item className="p-0 my-auto">
                    <Form className="chart-dropdown mt-2">
                        <Form.Group>
                            <Form.Control as="select"
                                          onChange={e => {setIntervalValue(e.target.value)}}
                                          defaultValue="Select interval"
                                          >
                                <option>Select interval</option>
                                <option value="1">1 minute</option>
                                <option value="2">2 minutes</option>
                                <option value="5">5 minutes</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Carousel interval={null} nextIcon={<NextIcon />} prevIcon={<PrevIcon />} indicators={false} className="custom-carousel">
                        <Carousel.Item>
                            <div className="chart-container py-3">
                                <PolarityLineChart interval={intervalValue}/>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="chart-container py-3">
                                { emojiChart }
                            </div>
                        </Carousel.Item>
                    </Carousel>

                </ListGroup.Item>
            </ListGroup>

        </div>

    );
}
export default EmotionAnalysis;
