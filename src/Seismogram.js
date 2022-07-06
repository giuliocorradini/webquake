import { PropTypes } from "carbon-components-react";
import { useEffect, useRef } from "react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Label } from "recharts";

function SingleSeismogram(props) {
    let time = props.time;
    let freq = props.freq;
    let data = Array.from(props.data).map(x => {
        return {v: x, t: time.add(10, 'milliseconds').format('HH:mm:ss')}
    });

    return <LineChart width={1300} height={400} margin={{bottom: 100, right: 100}} data={ data }>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="t" angle={35} tickMargin={20}>
            <Label position="bottom" offset={35} value={props.ch} />
        </XAxis>
        <YAxis />
        <Line dataKey="v" dot={false} />
    </LineChart>;
}


//  Interactive seismogram graph
export function Seismograms(props) {

    return props.data.map(
        wave => <SingleSeismogram data={wave.y} key={wave.channelCode} ch={wave.channelCode} time={wave.startTime}/>
    );

}
