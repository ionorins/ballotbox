import '../App.css';
import { useHistory } from "react-router-dom";
import FormBuilder from "./FormBuilder/FormBuilder";

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
            <FormBuilder />
        </div>
    )
}
export default Host;
