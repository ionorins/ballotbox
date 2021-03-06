import { useParams } from "react-router-dom";
import React from "react";
import QRCode from "qrcode.react";
import Div100vh from "react-div-100vh";


const Error404 = () => {
    return (
        <Div100vh>
            <div className="container">
                <div className="display-1 mb-4 p-3">
                    404
                </div>
                <div className="py-3 display-4">
                    Page not found :(
                </div>

            </div>
        </Div100vh>
    );

}
export default Error404;
