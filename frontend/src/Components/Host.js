import '../App.css';
import { useHistory } from "react-router-dom";
import FormBuilder from "./FormBuilder/FormBuilder";
import Card from "react-bootstrap/Card";

const Host = ({token}) => {

    let history = useHistory();

    if (token == null) {
        const localToken = JSON.parse(localStorage.getItem('token'))
        if (localToken == null)
            history.push("/host");
        else
            token = localStorage.getItem('token');
    }

    return (
        <div className="container">
            <Card className="main-card">
                <Card.Body className="access-card-body">

                    <FormBuilder />
                </Card.Body>

            </Card>
        </div>
    );
}
export default Host;
