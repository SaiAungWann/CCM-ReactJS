import { useState } from "react";
import "./App.css";
import Trip from "./component/trips.jsx";

function App() {
  let [show, setShow] = useState(true);
  return (
    <div>
      <button onClick={() => setShow(false)}>Hide Show</button>
      {show && <Trip />}
    </div>
  );
}

export default App;
