import '../../App.css';
import {FiPlay, FiThumbsUp} from "react-icons/fi";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {sha256} from "js-sha256";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";


const AttendeeCommentWall = () => {

    let { id } = useParams();
    const [cookies, setCookies] = useCookies(['access_token']);
    const [comments, setComments] = useState("");

    function like(id) {
        fetch('http://localhost:8000/attendee/comment/like/'+id, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("FUCK YOU!!!!");
            });

        getComments();
    }

    async function getComments() {
        fetch('http://localhost:8000/attendee/comments', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const commentList = responseJson.map((comment) =>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <h6>Anonymous</h6>
                            </Col>
                            <Col className="comment-likes">
                                {comment.likes}
                                <Button className="like-button" onClick={() => like(comment.id)}>
                                    <FiThumbsUp  className="mb-2"/>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {comment.content}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                );
                setComments(commentList);
            });
    }

    useEffect(() => {
        getComments();
    },[])


    const handleSubmit = (event) => {
        const message = event.target[0].value;
        event.preventDefault();
        event.stopPropagation();
        fetch('http://localhost:8000/attendee/comment', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            },
            body: JSON.stringify({
                content: message
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            });
        console.log("FUCK")
        event.currentTarget.reset();
        getComments();
    };


    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="my-2">
                    <Form.Control size="lg" placeholder="Add a comment..."/>
                </InputGroup>
            </Form>
            <ListGroup className="comment-list">
                {comments}
            </ListGroup>
        </div>

    );
}
export default AttendeeCommentWall;
