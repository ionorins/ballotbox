import {ResponsiveBar, ResponsiveLine} from "nivo";

const EmotionBarChart = ({data}) => {

    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
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
                legendOffset: -40
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
export default EmotionBarChart;
