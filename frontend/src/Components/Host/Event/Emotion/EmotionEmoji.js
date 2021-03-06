import Tooltip from "react-bootstrap/Tooltip";
import {OverlayTrigger} from "react-bootstrap";
import React from "react";

const EmotionEmoji = ({ type, size, toggleLine, toggled, handler }) => {
    let dimension = size * size * 250;
    if (size === 0 || size === null)
        dimension = 40;
    let opc, alt, id;

    if (toggled)
        opc = 1;
    else opc = 0.5;

    if (type === "joy") {
        alt = "😄";
        id = "1f604";
    }
    else if (type === "anger") {
        alt = "😡";
        id = "1f621";
    }
    else if (type === "sadness") {
        alt = "😭";
        id = "1f62d";
    }

    else if (type === "fear") {
        alt = "😨";
        id = "1f628";
    }

    else if (type === "love") {
        alt = "😍";
        id = "1f60d";
    }
    return (
        <OverlayTrigger
            placement="auto-start"
            delay={{ show: 300, hide: 400 }}
            trigger={'hover'}
            overlay={<Tooltip id="button-tooltip">
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </Tooltip>}
        >
            <img onClick={handler} id={type} draggable="false" style={{ filter: "opacity(" + opc + ")", cursor: "pointer", height: dimension, width: dimension }} alt={alt} src={"https://twemoji.maxcdn.com/v/13.0.1/72x72/" + id + ".png"} />
        </OverlayTrigger>
    );
}
export default EmotionEmoji;
