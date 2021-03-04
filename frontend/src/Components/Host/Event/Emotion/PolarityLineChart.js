import {
    XAxis,
    LineChart,
    YAxis,
    CartesianGrid,
    Line,
    ResponsiveContainer,
    ReferenceLine,
    Tooltip,
    Legend
} from "recharts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const PolarityLineChart = ({ interval }) => {

    let { id } = useParams();

    const [emotionData, setEmotionData] = useState([{ x: 0, y: 0 }])
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['access_token'])

    async function getValues() {
        fetch('/host/event/' + id + "/mood/polarity?interval=" + interval, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + cookies['access_token'],
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                setEmotionData(responseJson);
            });

    }


    useEffect(() => {
        getValues();
        const timeoutID = setInterval(() => {
            console.log("CHECKING " + interval);
            getValues();
        }, 3000);
        return () => clearInterval(timeoutID);
        // eslint-disable-next-line
    }, [interval])

    return (
        <ResponsiveContainer width="90%" className="">
            <LineChart data={emotionData[0]['data']}>
                <XAxis dataKey="x" tickFormatter={Math.round} />
                <YAxis domain={[-0.5, 0.5]} />
                <CartesianGrid stroke="#c9c9c9" strokeDasharray="5 5" />
                <ReferenceLine y={0} stroke="red" strokeDasharray="3 10" />
                <Tooltip labelFormatter={labelFormatter} />
                <Legend />
                <Line type="monotone" dataKey="polarity" stroke="#8884d8" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>

    );

}

export const labelFormatter = (e) => {
    return Math.round(e) + " minutes passed"
}

export default PolarityLineChart;
