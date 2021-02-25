import {Planet} from "react-planet";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import {RiThumbUpFill, RiThumbUpLine} from "react-icons/ri";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useEffect} from "react";

const EmotionAnalysis = () => {

    let { id } = useParams();
    const [cookies, setCookies] = useCookies(['access_token']);

    async function getValues(interval) {
        fetch('http://localhost:8000/host/event/'+id+"/mood/polarity?interval="+interval, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            });
    }

    useEffect(() => {
        getValues(1);
    },[])

    return (
            <div className="emoji-grid">
                <Row>
                    <Col>
                        x
                    </Col>
                    <Col />
                    <Col>
                        x
                    </Col>
                </Row>
                <Row>
                    <Col />
                    <Col>
                        x
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col>
                        x
                    </Col>
                    <Col />
                    <Col>
                        x
                    </Col>
                </Row>
            </div>

    );
}
export default EmotionAnalysis;
