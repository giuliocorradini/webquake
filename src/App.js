import './App.scss';
import { Button, Content, InlineLoading, Row, FlexGrid, Column, Form, Grid } from 'carbon-components-react';
import { DateTimePicker } from './DateTimePicker';
import { DocumentDownload } from '@carbon/icons-react';
import { GetSeiswave, QueryDatabase } from './QueryDatabase';
import { Seismograms } from './Seismogram';
import { useRef, useState } from 'react';
import Header from './Header';


function WaitingBar(props) {
    var waiting = props.waiting;

    return waiting ?
        <InlineLoading description="Interrogo INGV"/> :
        null;
}

function App() {
    const [isQueryingServer, setQueryingServer] = useState(false);
    const [isDataAvailable, setDataAvailable] = useState(false);
    const [startDt, setStartDt] = useState(new Date());
    const [endDt, setEndDt] = useState(new Date());

    function StartQuery() {
        if(!isQueryingServer) {
            setQueryingServer(true);

            QueryDatabase(setDataAvailable, setQueryingServer, startDt, endDt)
        }
    }

    return (
        <div>
            <Header></Header>
            <Content>
                <FlexGrid>
                    <Row>
                        <h3>Tempo di inizio</h3>
                        <DateTimePicker id="start" setDateTime={setStartDt} dateTime={startDt}></DateTimePicker>
                    </Row>
                    <Row>
                        <h3>Tempo di fine</h3>
                        <DateTimePicker id="end" setDateTime={setEndDt} dateTime={endDt}></DateTimePicker>
                    </Row>
                    <Row>
                        <Column>
                            <Button renderIcon={ DocumentDownload } onClick={StartQuery}>Scarica</Button>
                        </Column>
                        <Column>
                            <WaitingBar waiting={isQueryingServer} />
                        </Column>
                    </Row>
                </FlexGrid>
                {isDataAvailable ? <Seismograms data={GetSeiswave()}/> : null}
            </Content>
        </div>
    );
}

export default App;
