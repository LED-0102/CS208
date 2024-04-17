// import "./A4Form.css"; 
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Navbar/Header";
// import "./ssform.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import globalUrl from "../../components/url";
// import {data} from "./data"
import SearchUserComp from "../../components/Search/search";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const FurnitureRequirementForm = () => {
  const navigate=useNavigate();
  const [info,setInfo] = useState({})
  useEffect(() => {
    const fetchData = async () => {
        try {
            
      // Create a custom set of headers
            const customHeaders = new Headers({
              'Content-Type': 'application/json', // You may need to adjust the content type based on your request
              'Cookie': localStorage.getItem('token'), // Include the retrieved cookie in the 'Cookie' header
            });
            const headersObject = Object.fromEntries(customHeaders.entries());
            const response = await fetch(`${globalUrl}/v1/profile`, {
                method: 'GET',
                credentials: 'include',  
                headers: headersObject,
              });
            
          const responseData = await response.json();
          console.log('Parsed JSON response:', (responseData));
          setInfo(responseData)
          if (response.statusCode === 401) {
            console.log("Failed");
          }
            } catch (error) {
              console.error("Error:", error);
            }
    };

    fetchData();
},[]); 


useEffect(() => {
  console.log("information", info);
}, [info]);


  const [userData,setUserData]=useState({})
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    note: "Sample Note",
    receiver: 0,
    submitter: 0,
    date: "",
    name_indenter: "",
    designation: "",
    discipline: "",
    budget_head: "",
    room_no: "",
    building: "",
    purpose: "",
    nature: "",
    present_availability: "",
    sign_date: "",
    approval_status: "Pending",
    reason: "",
  });
  const [searchName, setSearchName] = useState("");
    const [selectedDesignation, setSelectedDesignation] = useState("");
           
    const handleChange = (evt) => {
        const changedField = evt.target.name;
        let newValue = evt.target.value;
    
        setFormData((currData) => {
        if(changedField === "amount_claimed"){
            newValue=parseInt(newValue);
        }
        currData[changedField] = newValue;
        return {
            ...currData,
        };
        });
    };
      
      const designation = [
      "HOD",
      "Staff",
      "Professor",
      "Office",
      "Student",
      ];
      
    const handleSubmit = async (e,
      onSuccessRedirect,
      onFailureRedirect) => {
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
                'Cookie': localStorage.getItem('token'), // Include the retrieved cookie in the 'Cookie' header
            });
            const headersObject = Object.fromEntries(customHeaders.entries());
            const response = await fetch(`${globalUrl}/v1/submit/Furniture`, {
                method: 'POST',
                credentials: 'include',  // Include credentials (cookies) in the request
                headers: headersObject,
                body: JSON.stringify(dataToBeSub)
            });
            console.log(response)
            if (response.status === 200) {
              toast.success('Data submitted successfully', {
                onClose: () => onSuccessRedirect() // Redirect to success page after toast is fully closed
              });
            } else if (response.status === 401 || response.status === 400 ) {
              toast.error('Failed to submit data', {
                onClose: () => onFailureRedirect() // Redirect to failure page after toast is fully closed
              });
            }else{
              toast.error('Failed to submit data', {
                onClose: () => onFailureRedirect() // Redirect to failure page after toast is fully closed
              });
            }
            } catch (error) {
            console.error("Error:", error);
            }
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

  useEffect(() => {
    console.log("information", info);
    // Update the formData state with info data
    setFormData(prevState => ({
      ...prevState,
      designation: info.designation,
    }));
    console.log(formData)
  }, [info]);

  const handleSuccessRedirect = () => {
    navigate("/");
  };

  const handleFailureRedirect = () => {
    navigate("/Furniture");
  };

  return (
    <>
    
    <div className ="grid grid-cols-6">
    <div className="col-span-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">INDIAN INSTITUTE OF TECHNOLOGY INDORE</h1><br/>
        <h2 className="text-lg"><b>Form for Furniture Requirement</b></h2>
        <div className="font-bold underline" style={{ borderBottom: '1px solid black' }}></div>
      </div>
      <form>
      <div className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Name of the Indenter:</b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name_indenter" onChange = {handleChange} value={formData.name_indenter} required />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Designation:</b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="designation" onChange = {handleChange} value={formData.designation} required />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Discipline/Center/Office:</b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="discipline" onChange = {handleChange}  value={formData.discipline} required />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Budget head: (a) Institute/(b) Department/(c) Project (specify) (d) Other (Specify): </b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="budget_head" onChange = {handleChange} value={formData.budget_head} required />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Space availability:</b>Location such as Room No. </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="room_no" onChange = {handleChange} value={formData.room_no} required />
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Space availability:</b>Building no.  </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="building" onChange = {handleChange} value={formData.building} required />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Specification/s: </b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="specification" onChange = {handleChange} value={formData.specification} required  />
          </div>
        </div>

        {/* Table for furniture requirements */}
        <div className="mt-4">
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">S.No.</th>
                <th className="border px-4 py-2">Nomenclature /Description of Items</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Estimated Unit Cost (Rs.)</th>
                <th className="border px-4 py-2">Total Estimated Cost (Rs.)</th>
                <th className="border px-4 py-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">MS Almirah</td>
                <td className="border px-4 py-2">01 no.</td>
                <td className="border px-4 py-2">12,000</td>
                <td className="border px-4 py-2">12,000.00</td>
                <td className="border px-4 py-2" rowspan="2">For research laboratory </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">2</td>
                <td className="border px-4 py-2">Customized MS revolving stool</td>
                <td className="border px-4 py-2">02 nos.</td>
                <td className="border px-4 py-2">3,600.00</td>
                <td className="border px-4 py-2">7,200.00</td>
                </tr>
              <tr>
                <td className="border text-right px-4 py-2" colspan="4">Total (incl of 18% GST):</td>
                <td className="border px-4 py-2"><b>19,200.00</b></td>
                <td className="border px-4 py-2"></td>
                </tr>
            </tbody>
          </table>
        </div>
        <br/><br/>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Purpose/ justification of the requirement: </b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="purpose" onChange = {handleChange} value={formData.purpose} required />
          </div>
          <br/><br/>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Nature of the material indented*: (a) Proprietary / (b) Single Source / (c) LPC / (d) Other:  </b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="nature" onChange = {handleChange}  value={formData.nature} required />
          </div>
          <br/><br/>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Present availability of similar items with the Indenter:</b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  name="present_availability"  onChange = {handleChange}  value={formData.present_availability} required />
          </div>
          </div>
           <br/><br/><br/><br/>
        {/* Signature section */}
        <div className="flex justify-between items-center mt-8">
          <div className="flex flex-col items-center">
            <div className="border-t border-gray-300 w-64 text-center pt-2">
            Signature of Indenter
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="border-t border-gray-300 w-64 text-center pt-2">
            Head, MEMS Department<br/>Name: Dr. Ajay K. Kushwaha
            <label className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" name="sign_date" onChange = {handleChange} value={formData.sign_date}/>
            </div>
          </div>
        </div><br/><br/>
      </div>
      <div className='p-4'> 
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
        <b><h4 classname="block text-black-900 font-bold increased-font-size">To,<br/>Furniture Committee</h4></b>
      <button onClick={(e) => handleSubmit(e, handleSuccessRedirect, handleFailureRedirect)} className='text-white bg-black'>Submit</button>
      <ToastContainer  />
   </> </div>  </form>
      
    </div>
    </div>
    </>
  );
};

export default FurnitureRequirementForm;