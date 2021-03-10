import '../../App.css';
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";

/**
 * Comment wall component for Event macrocomponent
 *
 * @returns a live updating comment wall
 * @constructor
 */
const AttendeeCommentWall = () => {

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token']);
    const [comments, setComments] = useState("");
    const [show, setShow] = useState(false);

    /**
     * Handles comment liking
     * @param id of comment to be liked
     */
    function like(id) {
        // Link to comment like endpoint
        fetch('/attendee/comment/like/' + id, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + cookies['access_token'],
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                getComments();
            });


    }

    /**
     * Gets all comments posted in the event
     */
    async function getComments() {
        // Link to comments endpoint
        fetch('/attendee/comments', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + cookies['access_token'],
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                // map comments to jsx
                const commentList = responseJson.map((comment) =>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <h6>{(comment.author.name === null) ? 'Anonymous' : comment.author.name}</h6>
                            </Col>
                            <Col className="comment-likes">
                                {comment.likes}
                                <Button className="like-button" onClick={() => like(comment.id)}>
                                    {(comment.liked ? <RiThumbUpFill className="mb-2 like-button-liked" /> : <RiThumbUpLine className="mb-2 " />)}
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

    /**
     * Sets refresh on getComments to 3000ms on mount, close on unmount
     */
    useEffect(() => {
        getComments();
        const timeoutID = setInterval(() => {
            getComments();
        }, 3000);
        return () => clearInterval(timeoutID);
        // eslint-disable-next-line
    }, [])

    /**
     * Handles submission of a comment to the wall
     * @param event submission
     */
    const handleSubmit = (event) => {
        const message = event.target[0].value;
        event.preventDefault();
        event.stopPropagation();
        // Link to comment post endpoint
        fetch('/attendee/comment', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + cookies['access_token'],
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

    /**
     * Handles attendee alias change
     * @param event submission
     */
    const handleAliasChange = (event) => {
        const alias = event.target[0].value;
        event.preventDefault();
        event.stopPropagation();
        // Link to alias change endpoint
        fetch('/attendee/alias/' + alias, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + cookies['access_token'],
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                getComments()

            });
        setShow(false);
        event.currentTarget.reset();
    };

    // Popover element for alias change button
    const aliasPopover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Set a name</Popover.Title>
            <Popover.Content>
                <Form onSubmit={handleAliasChange}>
                    <InputGroup className="my-2">
                        <Form.Control placeholder="Enter name" />
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
                            <Form.Control size="lg" placeholder="Add a comment..." />
                        </InputGroup>
                    </Form>
                </Col>
                <Col xs={2} md={1} className="pl-0">
                    <OverlayTrigger show={show} trigger="click" placement="auto" overlay={aliasPopover}>
                        <Button variant="light" onClick={() => setShow(!show)} className="p-2 mt-2"><FaUserEdit /></Button>
                    </OverlayTrigger>
                </Col>
            </Row>
        </div>
    );
}
export default AttendeeCommentWall;
