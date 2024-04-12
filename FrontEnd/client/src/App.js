import './App.css';
import { Routes, Route} from "react-router-dom";
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
import Home from './pages/HomePages/Home';
import E01 from './pages/E01/E01';
import R1 from './pages/R1/R1';
import DisplayPendingForm from './pages/DisplayPendingForm/DisplayPendingForm';
import DisplaySeekingForm from './pages/DisplaySeekingForm/DisplaySeekingForm';
import DisplayPreviousForm from './pages/DisplayPreviousForm/DisplayPreviousForm';
import SpecificDisplayPendingForm from './pages/DisplayPendingForm/SpecificDisplayPendingForm'
import SpecificDisplaySeekingForm from './pages/DisplaySeekingForm/SpecificDisplaySeekingForm'
import SpecificDisplayPreviousForm from './pages/DisplayPreviousForm/SpecificDisplayPreviousForm'
import Leave_Student from './pages/Leave/Leave_Student'
import Forms from './pages/Forms/Forms';
import Anavbar from './components/Navbar/Anavbar';
import CompleteProfile from './pages/ProfileRelated/CompleteProfile';
import DisplayProfile from './pages/ProfileRelated/DisplayProfile';
import { useState,useEffect } from 'react';
import BookLab from './pages/lab/BookLab';
import CompleteBookLab from './pages/lab/CompleteBookLab';

function App() {

  
  // const[authenticated , setAuthenticated]=useState(()=>{
  //   if(!(localStorage.getItem('authenticated'))){
  //     return false;
  //   }
  //   const storedAuthState = localStorage.getItem('authenticated');
  //   return JSON.parse(storedAuthState);
  // });

  // useEffect(() => {
  //   localStorage.setItem('authenticated', JSON.stringify(authenticat ed));
  // }, [authenticated]);

  const[authenticated , setAuthenticated]=useState(()=>{
    if(!(localStorage.getItem('token'))){
      return "";
    }
    const storedAuthState = localStorage.getItem('token');
    return storedAuthState;
  })

  return (

    <>
      {authenticated ? (<Anavbar setAuthenticated={setAuthenticated} />) : (<div></div>)}
      {authenticated ? (<div className='mt-40 h-0'></div>) : (<div></div>)}
      {authenticated ? (
        <Routes>
        <Route exact path="/" element={ <Home/> } />
          <Route exact path="/home" element={ <Home/> } />
          <Route exact path="/booklab" element={ <BookLab /> } />
          <Route exact path="/Forms" element={ <Forms /> } />
          <Route exact path="/login" element={ <Login setAuthenticated={setAuthenticated} /> } />
          <Route exact path="/completeprofile" element={ <CompleteProfile /> } />
          <Route exact path="/displayprofile" element={ <DisplayProfile /> } />
          <Route exact path="/signup" element={ <SignUp/> } />
          <Route exact path="/completebooklab/:labName" element={ <CompleteBookLab /> } />

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
          <Route exact path="/displayPendingForm" element={ <DisplayPendingForm /> } />
          <Route exact path="/displaySeekingForm" element={ <DisplaySeekingForm /> } />
          <Route exact path="/displayPreviousForm" element={ <DisplayPreviousForm /> } />
          <Route exact path="/displayPendingForm/:formName/:formId" element={ <SpecificDisplayPendingForm /> } />
          <Route exact path="/displaySeekingForm/:formName/:formId" element={ <SpecificDisplaySeekingForm /> } />
          <Route exact path="/displayPreviousForm/:formName/:formId" element={ <SpecificDisplayPreviousForm /> } />
          <Route exact path="/leave_student" element={ <Leave_Student /> } />

          <Route exact path="/availableForms" element={ <Selectform /> } />
 
        </Routes>
      ):(
        <Routes>
         <Route exact path="/" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/home" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/Forms" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/login" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/completeprofile" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/displayprofile" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/signup" element={ <SignUp/> } />
           <Route exact path="/booklab" element={ <Login /> } />
           <Route exact path="/facultyHome" element={ <Login setAuthenticated={setAuthenticated} /> } />
          
           <Route exact path="/StudentHome" element={ <Login setAuthenticated={setAuthenticated} /> } />

           <Route exact path="/faculty/purchase/ff" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/SS04" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/SS01" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/MM04" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/Furniture" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/search" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/pfh" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/nfh" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/e01" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/r1" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/displayPendingForm" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/displaySeekingForm" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/displayPreviousForm" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/displayPendingForm/:formName/:formId" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/displaySeekingForm/:formName/:formId" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/displayPreviousForm/:formName/:formId" element={ <Login setAuthenticated={setAuthenticated} /> } />
           <Route exact path="/leave_student" element={ <Login setAuthenticated={setAuthenticated} /> } />

           <Route exact path="/availableForms" element={ <Login setAuthenticated={setAuthenticated} /> } />
  
         </Routes>
      )}


    </>

    
  );
}

export default App;
