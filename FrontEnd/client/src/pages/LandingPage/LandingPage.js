import React, { useState, useEffect } from "react";
import ModalComponentSign from "../../components/authmodal/signupmodal";
import ModalComponentLogIn from "../../components/authmodal/loginmodal";
import TestComponent from "../../components/testComponent";
// import LoginSignup from "../../components/LoginSignup/LoginSignup";

export default function LandingPage(){
return(
    <div>
        {/* <ModalComponentSign></ModalComponentSign> */}
        <ModalComponentLogIn></ModalComponentLogIn>
        {/* <TestComponent></TestComponent> */}
        {/* <LoginSignup/> */}
    </div>
);
}
