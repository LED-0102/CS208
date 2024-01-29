import React, { useState, useEffect } from "react";
import ModalComponentSign from "../../components/authmodal/signupmodal";
import ModalComponentLogIn from "../../components/authmodal/loginmodal";


export default function LandingPage(){
return(
    <div>
        <ModalComponentSign></ModalComponentSign>
        <ModalComponentLogIn></ModalComponentLogIn>
    </div>
);
}