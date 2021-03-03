import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import React, {useEffect, useState} from "react";
import EmotionEmoji from "./Emotion/EmotionEmoji";
import EmotionLineChart from "./Emotion/PolarityLineChart";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import EmojiGrid from "./Emotion/EmojiGrid";

const EmotionAnalysis = () => {

    let { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);
    const [intervalValue, setIntervalValue] = useState(5);
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

    function selectInterval(selected) {
        setIntervalValue(selected);
        console.log(selected);
        getValues();
    }

    async function getValues() {
        fetch('/host/event/'+id+"/mood/polarity?interval="+intervalValue, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                setEmotionData(responseJson);
            });

    }

    async function getEmotionRefresh() {
        getValues();
        setTimeout(getEmotionRefresh, 5000);
    }

    useEffect(() => {
        fetch('/host/event/'+id+"/mood/polarity?interval="+intervalValue, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                setEmotionData(responseJson);
            });
    },[intervalValue])

    return (
        <div>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <EmojiGrid />
                </ListGroup.Item>
                <ListGroup.Item className="p-0">
                    <Form className="chart-dropdown mt-2">
                        <Form.Group>
                            <Form.Control as="select"
                                          onChange={e => {selectInterval(e.target.value)}}
                                          defaultValue="Select interval"
                                          >
                                <option>Select interval</option>
                                <option value="1">1 minute</option>
                                <option value="2">2 minutes</option>
                                <option value="5">5 minutes</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <div className="chart-container py-3">
                        <EmotionLineChart data={emotionData} />
                    </div>
                </ListGroup.Item>
            </ListGroup>

        </div>

    );
}
export default EmotionAnalysis;
