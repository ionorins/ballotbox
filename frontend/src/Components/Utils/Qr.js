import { useParams } from "react-router-dom";
var QRCode = require('qrcode.react');


const Qr = () => {
    let { code } = useParams();
    return (
        <QRCode value={"http://ballotbox.ml/" + code} />
    );

}
export default Qr;
