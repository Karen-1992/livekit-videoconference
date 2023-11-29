import Room from './Room';
import { Routes, Route } from "react-router-dom";
import './App.css';
import PrejoinExample from './Prejoin';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route
          path={"/"}
          element={<PrejoinExample />}
        />
        <Route
          path={"/room/:roomId"}
          element={<Room />}
        />
       </Routes>
    </div>
  );
}

export default App;
