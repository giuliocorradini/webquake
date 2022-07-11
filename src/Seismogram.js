import download from 'downloadjs';
import { useCurrentPng } from 'recharts-to-png';
import { useCallback } from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Label } from "recharts";
import { useEffect } from 'react';
import { saveAs } from 'file-saver';

function SingleSeismogram(props) {
    let time = props.time;
    let freq = props.freq;
    let data = Array.from(props.data).map(x => {
        return {v: x, t: time.add(10, 'milliseconds').format('HH:mm:ss')}
    });

    const [getPng, {ref, isLoading}] = useCurrentPng();
    const getImage = useCallback(async () => {
        const png = await getPng();

        console.log(props.ch);

        if(png)
            saveAs(png, `${props.ch}.png`);
            
    }, [getPng]);

    useEffect(()=>{
        console.log("hello effect");
        props.imageArray.push(getImage);
    }, []);

    return <LineChart width={1300} height={400} margin={{bottom: 90, right: 100, top: 20}} data={ data } ref={ref}>
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
        wave => <SingleSeismogram data={wave.y} key={wave.channelCode} ch={wave.channelCode} time={wave.startTime} imageArray={props.imageArray}/>
    );

}
