import "./App.css";
import { useParams } from "./context/context";
import Navbar from "./components/Navbar/Navbar";

function App() {
  console.log(useParams());

  return (
    <div className="App">
      <Navbar></Navbar>
    </div>
  );
}

export default App;
