

import './App.css';
import NavBar from './Pages/Navbar';
import LoginSignup from './Pages/LoginForm';
import SignUp from './Pages/Signup';
import Home from './Pages/Home';
import About from './Pages/About';
import Dashboard from './Pages/Dashboard';

import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import MarketSurvey from './Pages/Questions';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div id="page-body">
        <Routes>
        <Route path="/" element={<LoginSignup/>} />
          <Route path="/create-account" element={<SignUp/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/MarketSurvey" element={<MarketSurvey/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Dashboard" element={<Dashboard/>} />
         
       </Routes>
      </div>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
