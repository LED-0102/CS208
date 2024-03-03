import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import FacultyHome from './pages/HomePages/FacultyHome/FacultyHome';

function App() {
  return (
    // <div>
    //   {/* <LandingPage></LandingPage> */}
    //   <FacultyHome></FacultyHome>
    // </div>

    <>
       <Routes>
       <Route path="/LandingPage" element={<LandingPage/>}></Route>
 
       <Route path="/FacultyHome" element={<FacultyHome/>}></Route>
 
        </Routes>

    </>
  );
}

export default App;
