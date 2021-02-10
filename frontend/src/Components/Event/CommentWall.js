import '../../App.css';
import {FiPlay, FiThumbsUp} from "react-icons/fi";
import Comments from "../../exampleData/comments.json";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {sha256} from "js-sha256";


const CommentWall = () => {

    const like = (id) => {
        // post like with id

    }

    const handleSubmit = (event) => {
        const message = event.target[0].value;
        console.log(message);
        // post message to api with id
        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.reset();
    };

    const comments = Comments["comments"].map((comment) =>
        <ListGroup.Item>
            <Row>
                <Col>
                    <h6>{comment.author}</h6>
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
export default CommentWall;
