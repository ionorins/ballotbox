import '../../../App.css';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";


const FreeText = () => {

    return (
        <Form className="forms mx-auto">
            <h1>Free Text Input</h1>
            <InputGroup controlId="email" className="my-4" size="lg">
                <Form.Control type="text" placeholder="Question prompt"/>
            </InputGroup>
            <Button variant="primary" type="submit" className="buttons my-2">
                Add
            </Button>
        </Form>
    )
}
export default FreeText;
