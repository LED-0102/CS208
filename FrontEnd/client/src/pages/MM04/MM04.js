import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Navbar/Header";
// import "./ssform.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import globalUrl from "../../components/url";

const MM04 =  () => {

  const [userData,setUserData]=useState({})
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    note: "",
    receiver: 2,
    submitter: 0,
    quotation_no: "",
    date: "",
    requester_name: "",
    amount: "",
    amount_tax: "",
    amount_words: "",
    name_member: "",
    designation_member: "",
    name_convener: "",
    approval_status: "Approved",
    reason: "",
  });

  const [searchName, setSearchName] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
         
  const handleChange = (evt) => {
      const changedField = evt.target.name;
      let newValue = evt.target.value;
  };
    
    const designation = [
    "HOD",
    "Staff",
    "Professor",
    "Office",
    "Student",
    ];
    
  const handleSubmit = async (e) => {
      e.preventDefault();

      const dataToBeSub={...formData};
      const date1=new Date();
      const formattedDate=`${date1.getFullYear()}/${date1.getMonth()+1}/${date1.getDate()}`;
      dataToBeSub.date=formattedDate;

      try {
  
          const storedCookie = document.cookie;
          console.log(storedCookie);
      // Create a custom set of headers
          const customHeaders = new Headers({
              'Content-Type': 'application/json', // You may need to adjust the content type based on your request
              'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
          });
          const headersObject = Object.fromEntries(customHeaders.entries());
          const response = await fetch(`${globalUrl}/v1/submit/R1`, {
              method: 'POST',
              credentials: 'include',  // Include credentials (cookies) in the request
              headers: headersObject,
              body: JSON.stringify(dataToBeSub)
          });
          console.log(response)
          if (response.statusCode === 401) {
              console.log("Failed");
          }
          } catch (error) {
          console.error("Error:", error);
          }
  };

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${globalUrl}/list/receiver`);
          setUserData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          // setLoading(false);
        }
      };
  
      fetchData();
      

  return () => {
    
  };
}, []); 


    return (
        <div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
          <img src="/path-to-your-header-image.jpg" alt="Header" className="mx-auto mb-4" />
    
          <h1 className="text-3xl text-center font-bold mb-6">Certificate</h1>
          <h2 className="text-xl text-center font-bold mb-6">Purchase of Goods By Local Purchase Committee</h2>
          <h3 className="text-xl text-center font-bold mb-6">For purchase of goods valuing between
     Rs. 25,000/- (Twenty-Five Thousand Only) to Rs. 2,50,000/- (Two Lakh Fifty Thousand Only)
    </h3>
    
    
          <div className="border-t border-b py-4 mb-6">
            <p className="text-sm px-4">
            Certified that we, the members of the Purchase Committee are jointly and individually satisfied that the goods recommended for Purchase are <b>of the requisite specification and quality, priced reasonably at the prevailing market rates and the supplier recommended is reliable and competent to supply the goods in question, and it is not debarred by Department of Commerce or Ministry/ Department concerned. Accordingly, 
            we enclose the quotation no.
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="quotation_no" onChange = {handleChange}/> 
            dated <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="date" onChange = {handleChange}/> 
            of M/s. <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="requester_name" onChange = {handleChange}/> for placing Purchase Order.</b>
            </p> <br/>
            <p classname="text-sm px-4">The total financial implications will be `
             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="amount" onChange = {handleChange}/><b>
            (Inclusive of Tax @ )<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="amount_tax" onChange = {handleChange}/>
    (In Words-) <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="amount_words" onChange = {handleChange}/></b>
    </p>
          </div>
    
         
    
          
          <form>
          <div className="flex items-center justify-between mb-4">
            
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name, Designation & Signature of Member 
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  name="name_member" onChange = {handleChange}/>
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name, Designation & Signature of Member 
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="designation_member" onChange = {handleChange}/>
            </div>
          </div>
    
          <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
                Name, Designation & Signature of Convenor
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name_convener" onChange = {handleChange}/>
          </div>
          <div className="mb-6">
            <p className="text-xs italic text-center">
              *The certificate is as per GFR 2017 Rule No. 155.
            </p>
          </div>
          <div className="mb-4 lg:mb-0 lg:mr-4 lg:w-full">
          <select
            value={selectedDesignation}
            onChange={(e) => setSelectedDesignation(e.target.value)}
            className="p-2 border w-full rounded-md text-white"
            style={{ backgroundColor: "rgb(10 11 19)" }}
          >
            <option value="">Select Department</option>
            {designation.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          </div>
    
          <div className="flex items-center justify-center">
            <button onClick={(e) => handleSubmit(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Submit
            </button>
          </div>
          </form>
        </div>
        </div>
      );

}
export default MM04;