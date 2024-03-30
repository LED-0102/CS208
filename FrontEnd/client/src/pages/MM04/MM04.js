import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Navbar/Header";
// import "./ssform.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import globalUrl from "../../components/url";

const MM04 =  () => {
    return (
        <div>
        <Navbar />
        <Header />
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
          <img src="/path-to-your-header-image.jpg" alt="Header" className="mx-auto mb-4" />
    
          <h1 className="text-3xl text-center font-bold mb-6">Certificate</h1>
          <h2 className="text-xl text-center font-bold mb-6">Purchase of Goods By Local Purchase Committee</h2>
          <h3 className="text-xl text-center font-bold mb-6">For purchase of goods valuing between
     Rs. 25,000/- (Twenty-Five Thousand Only) to Rs. 2,50,000/- (Two Lakh Fifty Thousand Only)
    </h3>
    
    
          <div className="border-t border-b py-4 mb-6">
            <p className="text-sm px-4">
            Certified that we, the members of the Purchase Committee are jointly and individually satisfied that the goods recommended for Purchase are <b>of the requisite specification and quality, priced reasonably at the prevailing market rates and the supplier recommended is reliable and competent to supply the goods in question, and it is not debarred by Department of Commerce or Ministry/ Department concerned. Accordingly, we enclose the quotation no._______  dated  ______________ of M/s. ______________________________________ for placing Purchase Order.</b>
            </p> <br/>
            <p classname="text-sm px-4">The total financial implications will be ` __________ <b>(Inclusive of Tax @_________)
    (In Words- _________________________________________________________)</b>
    </p>
          </div>
    
         
    
          
    
          <div className="flex items-center justify-between mb-4">
            
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name, Designation & Signature of Member 
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name, Designation & Signature of Member 
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
            </div>
          </div>
    
          <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
                Name, Designation & Signature of Convenor
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
          </div>
          <div className="mb-6">
            <p className="text-xs italic text-center">
              *The certificate is as per GFR 2017 Rule No. 155.
            </p>
          </div>
    
          <div className="flex items-center justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Submit
            </button>
          </div>
        </div>
        </div>
      );

}
export default MM04;