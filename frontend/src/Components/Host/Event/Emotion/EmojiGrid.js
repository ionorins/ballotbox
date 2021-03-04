import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EmotionEmoji from "./EmotionEmoji";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const EmojiGrid = ({ selected, handler }) => {
    const [emojiSize, setEmojiSize] = useState([]);

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);


    let { id } = useParams();

    async function getCurrent() {
        fetch('/host/event/' + id + "/currentmood", {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + cookies['access_token'],
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                setEmojiSize(responseJson);
            });
    }

    useEffect(() => {
        getCurrent();
        const timeoutID = setInterval(() => {
            getCurrent();
        }, 3000);
        return () => clearInterval(timeoutID);
        // eslint-disable-next-line
    }, [])

    return (
        <div className="emoji-grid py-4">
            <Row noGutters={true}>
                <Col className="ml-auto">
                    <EmotionEmoji type={"joy"} size={emojiSize['joy']} handler={handler} toggled={selected === 'joy'} />
                </Col>
                <Col className="mr-auto">
                    <EmotionEmoji type={"fear"} size={emojiSize['fear']} handler={handler} toggled={selected === 'fear'} />
                </Col>
            </Row>
            <Row noGutters={true}>
                <Col className="mx-auto">
                    <EmotionEmoji type={"anger"} size={emojiSize['anger']} handler={handler} toggled={selected === 'anger'} />
                </Col>
            </Row>
            <Row noGutters={true}>
                <Col className="ml-auto">
                    <EmotionEmoji type={"love"} size={emojiSize['love']} handler={handler} toggled={selected === 'love'} />
                </Col>
                <Col className="mr-auto">
                    <EmotionEmoji type={"sadness"} size={emojiSize['sadness']} handler={handler} toggled={selected === 'sadness'} />
                </Col>
            </Row>
        </div>
    );
}
export default EmojiGrid;
