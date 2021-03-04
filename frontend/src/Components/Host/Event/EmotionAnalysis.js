import {useCookies} from "react-cookie";
import React, {useState} from "react";
import PolarityLineChart from "./Emotion/PolarityLineChart";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import EmojiGrid from "./Emotion/EmojiGrid";
import {Carousel} from "react-bootstrap";
import {NextIcon, PrevIcon} from "../../Utils/CarouselIcons";
import MoodLineChart from "./Emotion/MoodLineChart";

const EmotionAnalysis = () => {

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);
    const [intervalValue, setIntervalValue] = useState(5);
    const [selectedEmoji, setSelectedEmoji] = useState("joy");
    const [emojiChart, setEmojiChart] = useState(<MoodLineChart mood={selectedEmoji} interval={intervalValue}/>);
    const [polarityChart, setPolarityChart] = useState(<PolarityLineChart interval={intervalValue} />);

    const handleEmojiClick = (event) => {
        setSelectedEmoji(event.target.id);
        setEmojiChart(<MoodLineChart mood={event.target.id} interval={intervalValue}/>)
    }

    const handleIntervalChange = (event) => {
        if (event.target.value === "Select interval")
            return;
        setIntervalValue(event.target.value);
        setPolarityChart(<PolarityLineChart interval={event.target.value}/>)
        setEmojiChart(<MoodLineChart mood={selectedEmoji} interval={event.target.value}/>)
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
                                          onChange={handleIntervalChange}
                                          defaultValue="Select interval"
                                          >
                                <option>Select interval</option>
                                <option value="1">1 minute</option>
                                <option value="2">2 minutes</option>
                                <option value="5">5 minutes</option>
                                <option value="10">10 minutes</option>
                                <option value="30">30 minutes</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Carousel interval={null} nextIcon={<NextIcon />} prevIcon={<PrevIcon />} indicators={false} className="custom-carousel">
                        <Carousel.Item className="">
                            <div className="chart-container ">
                                Polarity by minutes passed
                                { polarityChart }
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="chart-container">
                                {selectedEmoji.charAt(0).toUpperCase() + selectedEmoji.slice(1)} by minutes passed
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
