import './App.scss';
import { DateTimePicker } from './DateTimePicker';

function App() {
  return (
    <div>
      <h3>Tempo di inizio</h3>
      <DateTimePicker id="start"></DateTimePicker>
      <h3>Tempo di fine</h3>
      <DateTimePicker id="end"></DateTimePicker>
    </div>
  );
}

export default App;
