import {ResponsiveBar, ResponsiveLine} from "nivo";
import {XAxis, LineChart, YAxis, CartesianGrid, Line, ResponsiveContainer, ReferenceLine} from "recharts";

const PolarityLineChart = ({data}) => {

    data = data[0]['data'];
    return (
        <ResponsiveContainer width="90%">
            <LineChart data={data}>
                <XAxis dataKey="x"/>
                <YAxis/>
                <CartesianGrid stroke="#c9c9c9" strokeDasharray="5 5"/>
                <ReferenceLine y={0} stroke="red" strokeDasharray="3 10" />
                <Line type="monotone" dataKey="y" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );

}
export default PolarityLineChart;
