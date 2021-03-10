import Tooltip from "react-bootstrap/Tooltip";
import {OverlayTrigger} from "react-bootstrap";
import React from "react";

/**
 * Size variable emoji button for graph control
 *
 * @param type - which emoji
 * @param size - current emoji value
 * @param toggled - currently toggled bool
 * @param handler - toggle handler passdown
 * @returns specific size emoji button
 */
const EmotionEmoji = ({ type, size, toggled, handler }) => {
    let dimension = size * size * 250;
    // No data or mood is 0
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
                {type.charAt(0).toUpperCase() + type.slice(1)} - {size}
            </Tooltip>}
        >
            <img onClick={handler} id={type} draggable="false" style={{ filter: "opacity(" + opc + ")", cursor: "pointer", height: dimension, width: dimension }} alt={alt} src={"https://twemoji.maxcdn.com/v/13.0.1/72x72/" + id + ".png"} />
        </OverlayTrigger>
    );
}
export default EmotionEmoji;
