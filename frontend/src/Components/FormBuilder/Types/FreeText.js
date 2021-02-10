import '../../../App.css';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";


const FreeText = () => {

    return (
        <Form className="px-3 mx-auto">
            <InputGroup controlId="email" className="my-4" size="lg">
                <Form.Control type="text" placeholder="Question prompt"/>
            </InputGroup>
            <Button variant="primary" type="submit" className="buttons my-2">
                Send
            </Button>
        </Form>
    )
}
export default FreeText;
