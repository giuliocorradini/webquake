import './App.scss';
import { Button, Content, InlineLoading, Row, FlexGrid, Column, Form, Grid, ButtonSet } from 'carbon-components-react';
import { DateTimePicker } from './DateTimePicker';
import { DocumentDownload } from '@carbon/icons-react';
import { GetSeiswave, QueryDatabase } from './QueryDatabase';
import { Seismograms } from './Seismogram';
import { useRef, useState } from 'react';
import Header from './Header';
import { WatsonHealthSaveImage } from '@carbon/icons-react';

function WaitingBar(props) {
    var waiting = props.waiting;

    return waiting ?
        <InlineLoading description="Interrogo INGV"/> :
        null;
}

var graph_images = new Array();

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

    function saveImages() {
        console.log(graph_images);
        for(let i=0; i<graph_images.length; i+=2) {
            graph_images[i]();
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
                            <ButtonSet>
                                <Button renderIcon={ DocumentDownload } onClick={StartQuery}>Scarica</Button>
                                <Button renderIcon={ WatsonHealthSaveImage } onClick={saveImages} disabled={!isDataAvailable}>Salva</Button>
                                <WaitingBar waiting={ isQueryingServer } />
                            </ButtonSet>
                        </Column>
                    </Row>
                </FlexGrid>
                <div>
                    {isDataAvailable ? <Seismograms data={GetSeiswave()} imageArray={graph_images}/> : null}
                </div>
            </Content>
        </div>
    );
}

export default App;
