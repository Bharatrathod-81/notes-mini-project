import "./App.css";
import "./component/Utilities/Utilities.css";
import { Routes, Route } from 'react-router-dom';
import NavBar from './component/Navigation/Navigation';
import Home from "./pages/home/home";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
