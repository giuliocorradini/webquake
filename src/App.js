import './App.scss';
import { Button, InlineLoading } from 'carbon-components-react';
import { DateTimePicker } from './DateTimePicker';
import { DocumentDownload } from '@carbon/icons-react';
import { GetSeiswave, QueryDatabase } from './QueryDatabase';
import { Seismograms } from './Seismogram';
import { useState } from 'react';


function StartQuery(state, setState, setData) {
    if(state == true)
        return () => {};
    
    return () => {
        setState(true);
        QueryDatabase(setData, setState);
    };
}

function WaitingBar(props) {
    var waiting = props.waiting;

    return waiting ?
        <InlineLoading description="Interrogo INGV"/> :
        null;
}

function App() {
    const [isQueryingServer, setQueryingServer] = useState(false);
    const [isDataAvailable, setDataAvailable] = useState(false);

    return (
        <div>
            <h1>WebQuake</h1>
            <h2>Editor sismogramma</h2>
            <h3>Tempo di inizio</h3>
            <DateTimePicker id="start"></DateTimePicker>
            <h3>Tempo di fine</h3>
            <DateTimePicker id="end"></DateTimePicker>
            <Button renderIcon={ DocumentDownload } onClick={StartQuery(isQueryingServer, setQueryingServer, setDataAvailable)}>Scarica</Button>
            <WaitingBar waiting={isQueryingServer} />
            {isDataAvailable ? <Seismograms data={GetSeiswave()}/> : null}
        </div>
    );
}

export default App;
