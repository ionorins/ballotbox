import '../../../App.css';
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {RiThumbUpFill, RiThumbUpLine} from "react-icons/ri";


const CommentWall = () => {

    let { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);
    const [comments, setComments] = useState(<></>);

    const like = (commentId) => {
        fetch('http://localhost:8000/host/event/'+id+'/comment/like/'+commentId, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                getComments();
            });
    }

    async function getComments() {
        fetch('http://localhost:8000/host/event/'+id+"/comments", {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                const commentList = responseJson.map((comment) =>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <h6>{(comment.author.name === null) ? 'Anonymous' : comment.author.name}</h6>
                            </Col>
                            <Col className="comment-likes">
                                {comment.likes}
                                <Button className="like-button" onClick={() => like(comment.id)}>
                                    {(comment.liked ? <RiThumbUpFill className="mb-2 like-button-liked"/> : <RiThumbUpLine  className="mb-2 "/>)}
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
                responseJson.length === 0 ? setComments(<ListGroup.Item className="mx-auto my-auto">No one has commented yet :(</ListGroup.Item>) : setComments(commentList);
            });
    }

    async function getCommentsRefresh() {
        getComments();
        setTimeout(getCommentsRefresh, 3000);
    }

    useEffect(() => {
        getCommentsRefresh();
    },[])


    const handleSubmit = (event) => {
        const message = event.target[0].value;
        event.preventDefault();
        event.stopPropagation();
        fetch('http://localhost:8000/host/event/'+id+"/comment", {
            method: 'POST',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            },
            body: JSON.stringify({
                content: message
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                getComments()
            });
        event.currentTarget.reset();
    };


    return (
        <div className="mt-auto">
            <div className="comment-wall-container m-1">
            <ListGroup variant="flush" className="comment-list">
                {comments}
            </ListGroup>
            </div>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="my-2">
                    <Form.Control size="lg" placeholder="Add a comment..."/>
                </InputGroup>
            </Form>
        </div>
    );
}
export default CommentWall;
