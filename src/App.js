import "./App.css";
import "./component/Utilities/Utilities.css";
import { Routes, Route } from 'react-router-dom';
import NavBar from './component/Navigation/Navigation';
import Home from "./pages/home/home";
import MainPage from "./pages/main-page/main-page";
import Archive from "./pages/Archive/archive";
import Trash from "./pages/Trash/Trash"

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className=' flex-row'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='main' element={<MainPage />} />
          <Route path="archive" element={<Archive />}/>
          <Route path="trash" element={<Trash />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
