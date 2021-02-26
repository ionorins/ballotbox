import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import Twemoji from "react-twemoji";
import EmotionBarChart from "./EmotionBarChart";

const EmotionAnalysis = () => {

    let { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);
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

    useEffect(() => {
        getValues(600);
    },[])

    return (
        <div>
            <div className="emoji-grid">
                <Row noGutters={true}>
                    <Col className="ml-auto">
                        <Twemoji>
                            😄
                        </Twemoji>
                    </Col>
                    <Col className="mr-auto">
                        <Twemoji>
                            😨
                        </Twemoji>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col className="mx-auto">
                        <Twemoji>
                            😡
                        </Twemoji>
                    </Col>
                </Row>
                <Row noGutters={true}>
                    <Col className="ml-auto">
                        <Twemoji>
                            😍
                        </Twemoji>
                    </Col>
                    <Col className="mr-auto">
                        <Twemoji>
                            😭
                        </Twemoji>
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
