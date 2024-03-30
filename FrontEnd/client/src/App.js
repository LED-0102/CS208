import './App.css';
import { Routes, Route } from "react-router-dom";
import FacultyHome from './pages/HomePages/FacultyHome/FacultyHome';
import StudentHome from './pages/HomePages/StudentHome/StudentHome';
import FirstFormofPurchase from './pages/PurchasePages/FirstFormofPurchase';
import SS04form from './pages/SS04/SSform';
import Login from "./components/LoginSignup/Login"
import SignUp from "./components/LoginSignup/SignUp"
import SS01form from "./pages/SS01/SSform";
import MM04form from "./pages/MM04/MM04";
import Furnitureform from "./pages/Furniture/furniture";
import PfacultyHome from './pages/HomePages/FacultyHome/PfacultyHome';
import Selectform from './pages/HomePages/FacultyHome/Selectform';
import Search from './components/Search/search'
import NewFh from './pages/HomePages/FacultyHome/NewFh';
import Home from './pages/HomePages/Home';
import E01 from './pages/E01/E01';
import R1 from './pages/R1/R1';


function App() {
  return (

    <>
      
        <Routes>
        <Route exact path="/" element={ <Login/> } />

          <Route exact path="/login" element={ <Login/> } />
          <Route exact path="/signup" element={ <SignUp/> } />
  
          <Route exact path="/facultyHome" element={ <FacultyHome /> } />
          
          <Route exact path="/StudentHome" element={ <StudentHome /> } />

          <Route exact path="/faculty/purchase/ff" element={ <FirstFormofPurchase /> } />
          <Route exact path="/SS04" element={ <SS04form /> } />
          <Route exact path="/SS01" element={ <SS01form /> } />
          <Route exact path="/MM04" element={ <MM04form /> } />
          <Route exact path="/Furniture" element={ <Furnitureform /> } />
          <Route exact path="/search" element={ <Search /> } />
          <Route exact path="/pfh" element={ <PfacultyHome /> } />
          <Route exact path="/nfh" element={ <Home /> } />
          <Route exact path="/e01" element={ <E01 /> } />
          <Route exact path="/r1" element={ <R1 /> } />

          <Route exact path="/availableForms" element={ <Selectform /> } />
  
        </Routes>

    </>
  );
}

export default App;
