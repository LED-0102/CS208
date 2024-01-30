import React, { useState, useEffect } from "react";
import ModalComponentSign from "../../components/authmodal/signupmodal";
import ModalComponentLogIn from "../../components/authmodal/loginmodal";
import TestComponent from "../../components/testComponent";

export default function LandingPage(){
return(
    <div>
        <ModalComponentSign></ModalComponentSign>
        <ModalComponentLogIn></ModalComponentLogIn>
        <TestComponent></TestComponent>
    </div>
);
}