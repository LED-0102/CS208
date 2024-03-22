import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import FacultyHome from './pages/HomePages/FacultyHome/FacultyHome';
import StudentHome from './pages/HomePages/StudentHome/StudentHome';
import FirstFormofPurchase from './pages/PurchasePages/FirstFormofPurchase';
import SS04form from './pages/SS04/SSform';
import Login from "./components/LoginSignup/Login"
import SignUp from "./components/LoginSignup/SignUp"
import SS01form from "./pages/SS01/SS01";
import PfacultyHome from './pages/HomePages/FacultyHome/PfacultyHome';

function App() {
  return (

    <>
      
        <Routes>
        <Route exact path="/" element={ <LandingPage /> } />

          <Route exact path="/login" element={ <Login/> } />
          <Route exact path="/signup" element={ <SignUp/> } />
  
          <Route exact path="/facultyHome" element={ <FacultyHome /> } />
          
          <Route exact path="/StudentHome" element={ <StudentHome /> } />

          <Route exact path="/faculty/purchase/ff" element={ <FirstFormofPurchase /> } />
          <Route exact path="/SS04" element={ <SS04form /> } />
          <Route exact path="/pfh" element={ <PfacultyHome /> } />

  
        </Routes>

    </>
  );
}

export default App;
