import '../../../App.css';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";


const FreeText = () => {

    let {id} = useParams();
    const [cookies, setCookies] = useCookies(['access_token']);

    const handleSubmit = (event) => {
        const prompt = event.target[0].value;
        event.preventDefault();
        event.stopPropagation();
        fetch('http://localhost:8000/host/event/'+id+"/poll", {
            method: 'POST',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            },
            body: JSON.stringify({
                content: {
                    "prompt": prompt
                }
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // u
            });
        event.currentTarget.reset();
    };

    return (
        <Form className="px-3 mx-auto" onSubmit={handleSubmit}>
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
