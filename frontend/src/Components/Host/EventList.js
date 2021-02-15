import '../../App.css';
import {FaPlay} from "react-icons/fa";
import Events from "../../exampleData/events.json";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {sha256} from "js-sha256";
import {useHistory} from "react-router-dom";


const EventList = () => {

    let history = useHistory();

    const selectEvent = (eventId) => {
        console.log(eventId);
        history.push("/host/event/"+eventId);
    }

    const events = Events["events"].map((event) =>
        <ListGroup.Item>
            <Row>
            <Col>
                <Row className="text-left mx-1">
                    {event.name}

                </Row>
                <Row className="text-left mx-1">
                    {event.date}
                </Row>
            </Col>
            <Col>
                <Row className="float-right">
                <Button className="mx-2 event-select-button" size={"lg"} onClick={() => selectEvent(event.id)}>
                    <FaPlay />
                </Button>

                </Row>
            </Col>
            </Row>
        </ListGroup.Item>
    );
    return (
        <div>
            <ListGroup>
                {events}
            </ListGroup>

        </div>

    );
}
export default EventList;
