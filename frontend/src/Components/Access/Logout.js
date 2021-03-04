import '../../App.css';
import Button from "react-bootstrap/Button";
import {FiLogOut} from "react-icons/fi";
import { useHistory } from "react-router-dom";
import {useCookies} from "react-cookie";
import LogoutModal from "./LogoutModal";
import {useState} from "react";

const Logout = () => {
    let history = useHistory();

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['access_token']);

    const [show, setShow] = useState(false);

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
        <div>
            <Button onClick={() => setShow(true)} className="logout-button back-button mt-2">
                <FiLogOut />
            </Button>
            <LogoutModal show={show} setShow={setShow} handleLogout={handleLogout}/>
        </div>

    );
}
export default Logout;
