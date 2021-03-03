import {
    XAxis,
    LineChart,
    YAxis,
    CartesianGrid,
    Line,
    ResponsiveContainer,
    ReferenceLine,
    Tooltip,
    Legend, Text
} from "recharts";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";

const MoodLineChart = ({interval, mood}) => {

    let { id } = useParams();

    const [emotionData, setEmotionData] = useState([{x: 0, y: 0}])
    const [cookies, setCookies] = useCookies(['access_token'])

    async function getMoodValues() {
        fetch('/host/event/'+id+"/mood/"+mood+"?interval="+interval, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer "+cookies['access_token'],
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                setEmotionData(responseJson);
            });

    }

    useEffect(() => {
        getMoodValues();
        const timeoutID = setInterval(() => {
            getMoodValues();
        }, 3000);
        return () => clearInterval(timeoutID);
    },[mood, interval])


    return (
            <ResponsiveContainer width="90%" className="mr-5 ml-2">
                <LineChart data={emotionData[0]['data']}>
                    <XAxis dataKey="x"/>
                    <YAxis>
                            {console.log(mood)}
                    </YAxis>
                    <CartesianGrid stroke="#c9c9c9" strokeDasharray="5 5"/>
                    <ReferenceLine y={0} stroke="red" strokeDasharray="3 10" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="y" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>


    );

}
export default MoodLineChart;
