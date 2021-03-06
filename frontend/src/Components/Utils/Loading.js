import {Link, useParams} from "react-router-dom";
import React from "react";
import QRCode from "qrcode.react";
import Div100vh from "react-div-100vh";
import {Spinner} from "react-bootstrap";
import '../../App.css';


const Loading = () => {
    return (
        <Div100vh>
            <div className="main-container">
                <div>
                    <Spinner size="lg" animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            </div>
        </Div100vh>
    );

}
export default Loading;
