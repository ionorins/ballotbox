import Twemoji from "react-twemoji";

const EmotionEmoji = ({type, size, toggleLine, toggled}) => {
    const dimension = size * 150;
    let opc;

    if (toggled)
        opc = 1;
    else opc = 0.5;

    if (type === "joy")
        return <img onClick={() => toggleLine(type)} draggable="false" style={{filter: "opacity("+opc+")", cursor: "pointer", height: dimension, width: dimension}} alt="😄" src="https://twemoji.maxcdn.com/v/13.0.1/72x72/1f604.png" />;
    else if (type === "anger")
        return <img onClick={() => toggleLine(type)} draggable="false" style={{filter: "opacity("+opc+")", cursor: "pointer", height: dimension, width: dimension}} alt="😡" src="https://twemoji.maxcdn.com/v/13.0.1/72x72/1f621.png" />
    else if (type === "sadness")
        return <img onClick={() => toggleLine(type)} draggable="false" style={{filter: "opacity("+opc+")", cursor: "pointer", height: dimension, width: dimension}} alt="😭" src="https://twemoji.maxcdn.com/v/13.0.1/72x72/1f62d.png" />
    else if (type === "fear")
        return <img onClick={() => toggleLine(type)} draggable="false" style={{filter: "opacity("+opc+")", cursor: "pointer", height: dimension, width: dimension}} alt="😨" src="https://twemoji.maxcdn.com/v/13.0.1/72x72/1f628.png" />
    else if (type === "love")
        return <img onClick={() => toggleLine(type)} draggable="false" style={{filter: "opacity("+opc+")", cursor: "pointer", height: dimension, width: dimension}} alt="😍" src="https://twemoji.maxcdn.com/v/13.0.1/72x72/1f60d.png" />
}
export default EmotionEmoji;
