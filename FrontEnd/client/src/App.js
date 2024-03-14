import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import FacultyHome from './pages/HomePages/FacultyHome/FacultyHome';
import StudentHome from './pages/HomePages/StudentHome/StudentHome';
import FirstFormofPurchase from './pages/PurchasePages/FirstFormofPurchase';
import SS04form from './pages/SS04/SSform';

function App() {
  return (

    <>
      
        <Routes>
        <Route exact path="/" element={ <LandingPage /> } />

          <Route exact path="/login" element={ <LandingPage /> } />
  
          <Route exact path="/facultyHome" element={ <FacultyHome /> } />
          
          <Route exact path="/StudentHome" element={ <StudentHome /> } />

          <Route exact path="/faculty/purchase/ff" element={ <FirstFormofPurchase /> } />
          <Route exact path="/SS04" element={ <SS04form /> } />
  
        </Routes>
    </>
  );
}

export default App;
