import '../App.css';
import { useHistory } from "react-router-dom";

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
            {JSON.parse(localStorage.getItem('token'))}
        </div>
    )
}
export default Host;
