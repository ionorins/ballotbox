import {ResponsiveBar, ResponsiveLine} from "nivo";

const EmotionLineChart = ({data}) => {

    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 30, bottom: 120, left: 50 }}
            gridYValues={[0, 0.1, 0.2, 0.3]}
            yScale={{
                type: "linear",
                min: -0.4,
                max: 0.4,
                stacked: false

            }}
            xScale={{
                type: "linear",
            }}
            axisLeft={{
                legend: 'polarity',
                legendPosition: 'center',
                legendOffset: -20,
                tickValues: [-0.4, 0, 0.4],
            }}
            axisBottom={{
                orient: 'bottom',
                legend: 'timestamp',
                legendPosition: 'center',
                legendOffset: 40
            }}
            animate={true}
        />
    );

}
export default EmotionLineChart;
