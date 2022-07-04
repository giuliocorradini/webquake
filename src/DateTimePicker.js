import { DatePicker, DatePickerInput, TextInput, TimePicker } from "carbon-components-react";

export function DateTimePicker(props) {

    return (
        <DatePicker size="md" datePickerType="single">
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
                pattern="'(1[012]|[1-9])(:[0-5][0-9](\\s)?){2}'"
                size="md"
            />
        </DatePicker>
    );
}
