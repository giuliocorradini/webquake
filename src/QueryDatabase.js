import { DataSelectQuery } from 'seisplotjs/dist/module/fdsndataselect';
import moment from 'moment';

// Database parameters
let INGV_HOST = "webservices.ingv.it";
let NETWORK_CODE = "IV";
let STATION_CODE = "CAVE";
let STATION_LOC = "";
let CHANNEL = "HH?";

var seiswave = [];

export function GetSeiswave() {
    return seiswave;
}

export function QueryDatabase(dataAvCb, queryServerCb, sDt, eDt) {
    let waves = new DataSelectQuery(INGV_HOST);

    const start = moment(sDt);
    const end = moment(eDt);
    
    waves
      .networkCode(NETWORK_CODE)
      .stationCode(STATION_CODE)
      .channelCode(CHANNEL)
      .startTime(start)
      .endTime(end);
    
    const onWaveRequestFullfilment = val => {
        seiswave = val;
        dataAvCb(true);
        queryServerCb(false);
    }
    
    const onWaveRequestFailure = val => {
        queryServerCb(false);
    }
    

    var wfile_promise = waves.querySeismograms();
    wfile_promise.then(onWaveRequestFullfilment, onWaveRequestFailure);
}

