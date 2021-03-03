import { useParams } from "react-router-dom";
import React from "react";
import QRCode from "qrcode.react";


const Qr = () => {
    let { code } = useParams();
    return (
        <div className="container">
            <div className="display-4 mb-4 p-3">
                Scan this QR code to join the event!
            </div>
            <div className="py-3">
                <QRCode size={200} bgColor="transparent" value={"http://ballotbox.ml/" + code} />
            </div>

        </div>
    );

}
export default Qr;
