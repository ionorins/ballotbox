import {
    XAxis,
    LineChart,
    YAxis,
    CartesianGrid,
    Line,
    ResponsiveContainer,
    Tooltip,
    Legend, Label
} from "recharts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { labelFormatter } from "./PolarityLineChart";

const MoodLineChart = ({ interval, mood }) => {

    let { id } = useParams();

    const [emotionData, setEmotionData] = useState([{ x: 0, y: 0 }])
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token'])

    async function getMoodValues() {
        fetch('/host/event/' + id + "/mood/" + mood + "?interval=" + interval, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + cookies['access_token'],
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                setEmotionData(responseJson);
            });

    }

    const getStrokeColour = () => {
        if (mood === "joy")
            return "#ffc800"
        if (mood === "anger")
            return "red"
        if (mood === "love")
            return "purple"
        if (mood === "sadness")
            return "blue"
        if (mood === "fear")
            return "black"
    }

    useEffect(() => {
        getMoodValues();
        const timeoutID = setInterval(() => {
            getMoodValues();
        }, 3000);
        return () => clearInterval(timeoutID);
        // eslint-disable-next-line
    }, [mood, interval])


    return (
        <ResponsiveContainer width="90%" className="mr-5">
            <LineChart data={emotionData[0]['data']}>
                <XAxis dataKey="x">
                    <Label content={<div> tet </div>} />
                </XAxis>
                <YAxis domain={[0, 1]} />
                <CartesianGrid stroke="#c9c9c9" strokeDasharray="5 5" />
                <Tooltip labelFormatter={labelFormatter} />
                <Legend />
                <Line type="monotone" dataKey={mood} stroke={getStrokeColour()} strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>


    );

}
export default MoodLineChart;
