import { useCookies } from "react-cookie";
import React, { useState } from "react";
import PolarityLineChart from "./Emotion/PolarityLineChart";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import EmojiGrid from "./Emotion/EmojiGrid";
import {Carousel, OverlayTrigger, Popover} from "react-bootstrap";
import { NextIcon, PrevIcon } from "../../Utils/CarouselIcons";
import MoodLineChart from "./Emotion/MoodLineChart";
import Button from "react-bootstrap/Button";

/**
 * Emotion analysis component containing all machine-learning content
 * dependent on everything in ./Emotion
 * @returns {JSX.Element}
 * @constructor
 */
const EmotionAnalysis = () => {

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);
    const [intervalValue, setIntervalValue] = useState(5);
    const [selectedEmoji, setSelectedEmoji] = useState("joy");
    const [emojiChart, setEmojiChart] = useState(<MoodLineChart mood={selectedEmoji} interval={intervalValue} />);
    const [polarityChart, setPolarityChart] = useState(<PolarityLineChart interval={intervalValue} />);

    /**
     * Handles toggle of emoji in grid
     * @param event submission
     */
    const handleEmojiClick = (event) => {
        setSelectedEmoji(event.target.id);
        setEmojiChart(<MoodLineChart mood={event.target.id} interval={intervalValue} />)
    }

    /**
     * Handles change in interval selection
     * @param event submission
     */
    const handleIntervalChange = (event) => {
        if (event.target.value === "Select interval")
            return;
        setIntervalValue(event.target.value);
        setPolarityChart(<PolarityLineChart interval={event.target.value} />)
        setEmojiChart(<MoodLineChart mood={selectedEmoji} interval={event.target.value} />)
    }

    // Popover element for polarity chart tooltip
    const polarityPopover = () => {
        return (
            <Popover id="popover-basic">
                <Popover.Content>
                    <strong>Polarity</strong> is a numerical representation of the overall current mood in the event.
                    Positive is good, negative is bad.
                </Popover.Content>
            </Popover>
        );

    }

    // Popover element for mood chart tooltip
    const moodPopover = () => {
        return (
            <Popover id="popover-basic">
                <Popover.Content>
                    A numerical representation of  the level of <strong>{selectedEmoji}</strong> in the event over time
                </Popover.Content>
            </Popover>
        );
    }


    return (
        <div>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <EmojiGrid selected={selectedEmoji} handler={handleEmojiClick} />
                </ListGroup.Item>
                <ListGroup.Item className="p-0 my-auto">
                    <Form className="chart-dropdown mt-2">
                        <Form.Group>
                            <Form.Control as="select"
                                onChange={handleIntervalChange}
                                defaultValue="Select interval"
                            >
                                <option>Select data interval</option>
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
                                <OverlayTrigger trigger="hover" placement="bottom" overlay={polarityPopover()}>
                                    <Button variant="success" className="help-button px-2 py-0 ml-2 mb-1">?</Button>
                                </OverlayTrigger>
                                {polarityChart}
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="chart-container">
                                {selectedEmoji.charAt(0).toUpperCase() + selectedEmoji.slice(1)} by minutes passed
                                <OverlayTrigger trigger="hover" placement="bottom" overlay={moodPopover()}>
                                    <Button variant="success" className="help-button px-2 py-0 ml-2 mb-1">?</Button>
                                </OverlayTrigger>
                                {emojiChart}
                            </div>
                        </Carousel.Item>
                    </Carousel>

                </ListGroup.Item>
            </ListGroup>

        </div>

    );
}
export default EmotionAnalysis;
