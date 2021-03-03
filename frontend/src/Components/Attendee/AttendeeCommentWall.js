import '../../App.css';
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {RiThumbUpFill, RiThumbUpLine} from "react-icons/ri";
import {Container, OverlayTrigger, Popover} from "react-bootstrap";
import {FiSettings} from "react-icons/fi";
import {FaUserEdit} from "react-icons/all";


const AttendeeCommentWall = () => {

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);
    const [comments, setComments] = useState("");

    function like(id) {
        fetch('/attendee/comment/like/'+id, {
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
        fetch('/attendee/comments', {
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
        fetch('/attendee/comment', {
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

    const handleAliasChange = (event) => {
        const alias = event.target[0].value;
        event.preventDefault();
        event.stopPropagation();
        fetch('/attendee/alias/'+alias, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                getComments()
            });
        event.currentTarget.reset();
    };

    const aliasPopover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Set a name</Popover.Title>
            <Popover.Content>
                <Form onSubmit={handleAliasChange}>
                    <InputGroup className="my-2">
                        <Form.Control placeholder="Enter name"/>
                    </InputGroup>
                </Form>
            </Popover.Content>
        </Popover>
    );

    return (
        <div>
            <div className="comment-wall-container attendee-comment-wall-container m-1">
                <ListGroup variant="flush" className="comment-list">
                    {comments}
                </ListGroup>
            </div>
                <Row>
                    <Col xs={10} md={11} className="pr-0">
                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="my-2">
                                <Form.Control size="lg" placeholder="Add a comment..."/>
                            </InputGroup>
                        </Form>
                    </Col>
                    <Col xs={2} md={1} className="pl-0">
                        <OverlayTrigger trigger="click" placement="auto" overlay={aliasPopover}>
                            <Button variant="light" className="p-2 mt-2"><FaUserEdit/></Button>
                        </OverlayTrigger>
                    </Col>
                </Row>
        </div>
    );
}
export default AttendeeCommentWall;
