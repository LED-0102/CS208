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
    receiver: 1,
    submitter: 1,
    quotation_no: "",
    date: "",
    requester_name: "",
    amount: 0,
    amount_tax: 0,
    amount_words: "",
    name_member: "",
    designation_member: "",
    name_convener: "",
    To_Whom: "",
    approval_status: "Pending",
    reason: "",
  });


  const [searchName, setSearchName] = useState("");
    const [selectedDesignation, setSelectedDesignation] = useState("");

    const handleUserSelect = (userId,userName) => {
      console.log("aaaa",userName)
      console.log("aaaa",userId)
      setFormData({
        ...formData,
        receiver: userId
      });
    
      if (userName) {
        setSearchName(userName);
      } else {
        setSearchName(''); // or any default value you prefer
      }
      console.log("search+++",searchName)
    };

    
    const filterUsers = () => {
      return userData.filter(
        (user) =>
          user.username.toLowerCase().includes(searchName.toLowerCase()) &&
          user.designation
            .toLowerCase()
            .includes(selectedDesignation.toLowerCase())
          //   &&
          // user.roll_no.toLowerCase().includes(searchRollNo.toLowerCase())
      );
    };



    const designation = [
      "HOD",
      "Staff",
      "Professor",
      "Office",
      "Student",
      ];
           
    const handleChange = (evt) => {
        const changedField = evt.target.name;
        let newValue = evt.target.value;
    
        setFormData((currData) => {
        if(changedField === "amount_claimed"){
            newValue=parseInt(newValue);
        }
        if(changedField === "amount"){
            newValue=parseInt(newValue);
        }
        if(changedField === "amount_tax"){
            newValue=parseInt(newValue);
        }
        currData[changedField] = newValue;
        return {
            ...currData,
        };
        });
    };
      
     
      
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
            const response = await fetch(`${globalUrl}/v1/submit/MM04`, {
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
          <form>
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
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="quotation_no" onChange = {handleChange} value={formData.quotation_no} required/> 
            dated <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="date" onChange = {handleChange} required/> 
            of M/s. <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="requester_name" onChange = {handleChange} value={formData.requester_name} required/> for placing Purchase Order.</b>
            </p> <br/>
            <p classname="text-sm px-4">The total financial implications will be `
             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="amount" onChange = {handleChange}   required/><b>
            (Inclusive of Tax @ )<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="amount_tax" onChange = {handleChange}   required/>
    (In Words-) <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="amount_words" onChange = {handleChange}  value={formData.amount_words} required/></b>
    </p>
          </div>
    
         
    
          
          {/* <form> */}
          {/* <div className="flex items-center justify-between mb-4">
            
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name, Designation & Signature of Member 
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  name="name_member" onChange = {handleChange}  value={formData.name_member} required/>
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name, Designation & Signature of Member 
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="designation_member" onChange = {handleChange}  value={formData.designation_member} required/>
            </div>
          </div>
    
          <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
                Name, Designation & Signature of Convenor
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name_convener" onChange = {handleChange} value={formData.name_convener} required/>
          </div> */}
          
          {/* <div className="mb-4 lg:mb-0 lg:mr-4 lg:w-full">
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
          </div> */}
          <div className=''> 
          <>
          <div className='p-4'>
            <div>
              <div className="flex flex-col lg:flex-row mb-4 lg:mb-8 font-custom">
                <div className="mb-4 lg:mb-0 lg:mr-4 lg:w-full">
                  <input
                    type="text"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="p-2 border w-full rounded-md search-input hover:bg-gray-200"
                  />
                </div>
                <div className="mb-4 lg:mb-0 lg:mr-4 lg:w-full">
                  <select
                    value={selectedDesignation}
                    onChange={(e) => setSelectedDesignation(e.target.value)}
                    className="p-2 border w-full rounded-md text-white"
                    style={{ backgroundColor: "rgb(30 41 59)" }}
                  >
                    <option value="">Select Department</option>
                    {designation.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {searchName.toLowerCase() !== '' && (
                <table className="w-full lg:w-full table-auto  border-collapse font-custom">
                  <thead>
                    <tr>
                      <th className="w-1/3 border-4 p-2 text-center font-bold text-purple-900">
                        Name
                      </th>
                      <th className="w-1/3 border-4 p-2 text-center font-bold text-purple-900">
                        Designation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterUsers().map((user, index) => (
                      <tr
                        key={user.id}
                        className="bg-slate-950 hover:bg-slate-800 transition-all cursor-pointer"
                        onClick={() => handleUserSelect(user.id, user.username)}>

                        <td className="w-1/3 border-4 p-4 bg-white subpixel-antialiased text-teal-500 ">
                          {user.username}
                        </td>
                        <td className="w-1/3 border-4 p-4 bg-white text-center text-cyan-500">
                          {user.designation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* <p className="text-black">hwlooooooooooooooooooooooooooooooooooooooooooo</p> */}
            </div>


          </div>
        <div className="mb-6">
            <p className="text-xs italic text-center">
              *The certificate is as per GFR 2017 Rule No. 155.
            </p>
          </div>
        
          <div className="flex items-center justify-center">
            <button onClick={(e) => handleSubmit(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Submit
            </button>
          </div>
          </>
          </div>
          {/* </form> */}
          
        </div>
        </form>
        </div>
      );

}
export default MM04;