import { useParams } from "react-router-dom";
import React from "react";
import QRCode from "qrcode.react";
import Div100vh from "react-div-100vh";


const Qr = () => {
    let { code } = useParams();
    return (
        <Div100vh>
        <div className="container">
            <div className="display-4 mb-4 p-3">
                Scan this QR code to join the event!
            </div>
            <div className="py-3">
                <QRCode size={200} bgColor="transparent" value={"http://ballotbox.ml/" + code} />
            </div>

        </div>
        </Div100vh>
    );

}
export default Qr;
