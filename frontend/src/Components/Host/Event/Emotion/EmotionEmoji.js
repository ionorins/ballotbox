import Twemoji from "react-twemoji";

const EmotionEmoji = ({type, size, toggleLine, toggled}) => {
    let dimension = size * 150;
    if (size === 0)
        dimension = 50;
    let opc, alt, id;

    if (toggled)
        opc = 1;
    else opc = 0.5;

    if (type === "joy") {
        alt="😄";
        id="1f604";
    }
    else if (type === "anger") {
        alt = "😡";
        id = "1f621";
    }
    else if (type === "sadness") {
        alt="😭";
        id="1f62d";
    }

    else if (type === "fear") {
        alt="😨";
        id="1f628";
    }

    else if (type === "love") {
        alt="😍";
        id="1f60d";
    }

    console.log(id);
    return <img onClick={() => toggleLine(type)} draggable="false" style={{filter: "opacity("+opc+")", cursor: "pointer", height: dimension, width: dimension}} alt={alt} src={"https://twemoji.maxcdn.com/v/13.0.1/72x72/"+id+".png"} />
}
export default EmotionEmoji;
