import "./App.css";
import "./component/Utilities/Utilities.css";
import { Routes, Route } from 'react-router-dom';
import NavBar from './component/Navigation/Navigation';
// import SideBar from "./component/side-bar/side-bar";
import Home from "./pages/home/home";
import MainPage from "./pages/main-page/main-page";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className=' flex-row'>
        {/* <SideBar/> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='main' element={<MainPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
