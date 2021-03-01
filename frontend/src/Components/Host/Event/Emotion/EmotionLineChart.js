import {ResponsiveBar, ResponsiveLine} from "nivo";

const EmotionLineChart = ({data}) => {

    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
            yScale={{
                type: "linear",
                stacked: false,
            }}
            xScale={{
                type: "time",
                precision: "day",
                format: "native"
            }}
            axisLeft={{
                legend: 'polarity',
                legendPosition: 'center',
                legendOffset: -20,
                tickValues: [0, 1, 2],
            }}
            axisBottom={{
                legend: 'timestamp',
                legendPosition: 'center',
                legendOffset: 40
            }}
            animate={true}
        />
    );

}
export default EmotionLineChart;
