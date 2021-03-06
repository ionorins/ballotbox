import {Link, useParams} from "react-router-dom";
import React from "react";
import QRCode from "qrcode.react";
import Div100vh from "react-div-100vh";
import '../../App.css';


const Error404 = () => {
    return (
        <Div100vh>
            <div className="main-container">
                <Link to="/" className="clickable-link">
                    <div className="display-1 mb-4 p-3">
                        404
                    </div>
                </Link>
                <div className="py-3 display-4">
                    Page not found :(
                </div>

            </div>
        </Div100vh>
    );

}
export default Error404;
