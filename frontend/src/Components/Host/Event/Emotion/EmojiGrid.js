import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EmotionEmoji from "./EmotionEmoji";
import React from "react";

const EmojiGrid = () => {
    return(
        <div className="emoji-grid py-4">
            <Row noGutters={true}>
                <Col className="ml-auto">
                    <EmotionEmoji type={"joy"} size={emojiSize['joy']} toggled={true}/>
                </Col>
                <Col className="mr-auto">
                    <EmotionEmoji type={"fear"} size={emojiSize['fear']} oggled={false}/>
                </Col>
            </Row>
            <Row noGutters={true}>
                <Col className="mx-auto">
                    <EmotionEmoji type={"anger"} size={emojiSize['anger']} toggled={true}/>
                </Col>
            </Row>
            <Row noGutters={true}>
                <Col className="ml-auto">
                    <EmotionEmoji type={"love"} size={emojiSize['love']} toggled={false}/>
                </Col>
                <Col className="mr-auto">
                    <EmotionEmoji type={"sadness"} size={emojiSize['sadness']} toggled={false}/>
                </Col>
            </Row>
        </div>
    );
}
export default EmojiGrid;
