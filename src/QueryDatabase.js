import { DataSelectQuery } from 'seisplotjs/dist/module/fdsndataselect';
import moment from 'moment';

// Database parameters
let INGV_HOST = "webservices.ingv.it";
let NETWORK_CODE = "IV";
let STATION_CODE = "CAVE";
let STATION_LOC = "";
let CHANNEL = "HH?";

var seiswave;

function onWaveRequestFullfilment(val) {
    seiswave = val;
    console.log("Received seismogram: " + val);
}

function onWaveRequestFailure(val) {
    console.log("database error");
}

export function GetSeiswave() {
    return seiswave;
}

export function QueryDatabase() {
    var waves = new DataSelectQuery(INGV_HOST);
    var now = moment().subtract(10, 'minutes');

    waves
      .networkCode(NETWORK_CODE)
      .stationCode(STATION_CODE)
      .channelCode(CHANNEL)
      .startTime(now.clone().subtract(5, 'minutes'))
      .endTime(now);
    
    var wfile_promise = waves.querySeismograms();
    wfile_promise.then(onWaveRequestFullfilment, onWaveRequestFailure);
}

