import "./App.css";
import Image from "./access/123.png";

function App() {
  let name = "Sai Aung Wann";
  return (
    <div className="test">
      <h2>{name}</h2>
      <img src={Image} alt="" className="img" />
    </div>
  );
}

export default App;
