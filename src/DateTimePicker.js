import { DatePicker, DatePickerInput, TextInput } from "carbon-components-react";
import { useState } from "react";

const parseTime = ts => {
    const re = /(\d{1,2}):(\d{1,2}):(\d{1,2})(.\d+)?/;

    let matches = ts.match(re);

    if(matches != null) {
        let [_, hours, minutes, seconds, millisecs] = matches;
        return [hours, minutes, seconds, millisecs];
    }

    return null;
}

export function DateTimePicker(props) {

    const dateTime = props.dateTime;
    const setDateTime = props.setDateTime;

    const setDate = d => {
        d = d[0];
        let dt = dateTime;
        dt.setUTCFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getDate());
        setDateTime(dt);
    };

    const setTime = t => {
        if(t != null) {
            const [hours, minutes, seconds, milli] = t;
            let dt = dateTime;
            dt.setHours(hours, minutes, seconds);
            setDateTime(dt);
        }
    };

    return (
        <DatePicker size="md" datePickerType="single" dateFormat="d-m-Y" onChange={setDate}>
            <DatePickerInput
                id={props.id + "_date"}
                labelText="Data"
                placeholder="dd/mm/yyyy"
                size="md"
            />
            <TextInput
                id={props.id + "_time"}
                labelText="Orario"
                placeholder="hh:mm:ss"
                size="md"
                onChange={evt => setTime(parseTime(evt.target.value))}
            />
        </DatePicker>
    );
}
