import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import FacultyHome from './pages/HomePages/FacultyHome/FacultyHome';

function App() {
  return (

    <>
      
        <Routes>
        <Route exact path="/" element={ <LandingPage /> } />

          <Route exact path="/login" element={ <LandingPage /> } />
  
          <Route exact path="/facultyHome" element={ <FacultyHome /> } />
  
        </Routes>
    </>
  );
}

export default App;
