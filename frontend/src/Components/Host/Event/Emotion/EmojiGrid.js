import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EmotionEmoji from "./EmotionEmoji";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";

const EmojiGrid = () => {
    const [emojiSize, setEmojiSize] = useState([]);
    const [cookies, setCookies] = useCookies(['access_token']);


    let { id } = useParams();

    useEffect(() => {
        getCurrentRefresh();
    },[])

    async function getCurrent() {
        fetch('/host/event/'+id+"/mood", {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                setEmojiSize(responseJson);
            });
    }

    function getCurrentRefresh() {
        getCurrent();
        setTimeout(getCurrent, 3000);
    }

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
