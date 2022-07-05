import { Button, InlineLoading } from 'carbon-components-react';
import './App.scss';
import { DateTimePicker } from './DateTimePicker';
import { DocumentDownload } from '@carbon/icons-react';
import { GetSeiswave, QueryDatabase } from './QueryDatabase';
import { ProgressBar } from '@carbon/icons-react';

var queryingServer = false;

function StartQuery() {
    queryingServer = true;
    QueryDatabase();
}

function WaitingBar(props) {
    var waiting = props.waiting;

    return waiting ?
        <InlineLoading description="Interrogo INGV"/> :
        null;
}

function App() {
    return (
        <div>
            <h1>WebQuake</h1>
            <h2>Editor sismogramma</h2>
            <h3>Tempo di inizio</h3>
            <DateTimePicker id="start"></DateTimePicker>
            <h3>Tempo di fine</h3>
            <DateTimePicker id="end"></DateTimePicker>
            <Button renderIcon={ DocumentDownload } onClick={StartQuery}>Scarica</Button>
            <Button onClick={ ()=>{console.log(GetSeiswave())} }>Get wave</Button>
            <WaitingBar waiting={queryingServer} />
        </div>
    );
}

export default App;
