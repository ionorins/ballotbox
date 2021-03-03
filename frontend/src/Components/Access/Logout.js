import '../../App.css';
import Button from "react-bootstrap/Button";
import {FiLogOut} from "react-icons/fi";
import { useHistory } from "react-router-dom";
import {useCookies} from "react-cookie";

const Logout = () => {
    let history = useHistory();

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['access_token']);

    const handleLogout = () => {
        fetch('/auth/logout', {
            method: 'POST',
        }).then((response) => {
            response.json().then((responseJson) => {
                setCookie('access_token', null);
                history.push("/");
            })
        });

    }

    return (
        <Button onClick={() => handleLogout()} className="logout-button back-button mt-2">
            <FiLogOut />
        </Button>
    );
}
export default Logout;
