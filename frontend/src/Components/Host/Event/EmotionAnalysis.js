import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import React, {useEffect, useState} from "react";
import EmotionEmoji from "./Emotion/EmotionEmoji";
import EmotionBarChart from "./Emotion/EmotionBarChart";

const EmotionAnalysis = () => {

    let { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);
    const [emojiSize, setEmojiSize] = useState([]);
    const [emotionData, setEmotionData] = useState([
        {
            id: "Anger",
            data: [
                {
                    x: "2018-01-01",
                    y: 1.3
                },
                {
                    x: "2018-01-02",
                    y: 1.4
                },
                {
                    x: "2018-01-03",
                    y: 1.5
                },
                {
                    x: "2018-01-04",
                    y: 1.2
                },
                {
                    x: "2018-01-05",
                    y: 1.3
                },
                {
                    x: "2018-01-06",
                    y: 1.4
                },
                {
                    x: "2018-01-07",
                    y: 1.5
                },
                {
                    x: "2018-01-08",
                    y: 1.2
                },
            ]
        },
        {
            id: "Joy",
            data: [
                {
                    x: "2018-01-01",
                    y: 1.0
                },
                {
                    x: "2018-01-02",
                    y: 0.9
                },
                {
                    x: "2018-01-03",
                    y: 0.1
                },
                {
                    x: "2018-01-04",
                    y: 2.0
                },
                {
                    x: "2018-01-05",
                    y: 1.0
                },
                {
                    x: "2018-01-06",
                    y: 0.9
                },
                {
                    x: "2018-01-07",
                    y: 0.1
                },
                {
                    x: "2018-01-08",
                    y: 2.0
                },
            ]
        }
    ]);

    async function getValues(interval) {
        fetch('http://localhost:8000/host/event/'+id+"/mood/polarity?interval="+interval, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                //setEmotionData(responseJson);
            });
    }

    async function getCurrent() {
        fetch('http://localhost:8000/host/event/'+id+"/mood", {
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
    useEffect(() => {
        getValues(600);
        getCurrent();
    },[])

    return (
        <div>
            <div className="emoji-grid">
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
            <div className="chart-container">
                <EmotionBarChart data={emotionData} />
            </div>
        </div>

    );
}
export default EmotionAnalysis;
