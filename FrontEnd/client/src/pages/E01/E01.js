import React, { useState, useEffect } from 'react';
import "./e01.css";
import globalUrl from '../../components/url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const E01 = () => {
    const navigate=useNavigate();
    const [userData,setUserData]=useState({})
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        note: "",
        receiver: 1,
        submitter: 1,
        date:"",
        employee_id: "",
        hod_name: "",
        hod_signature_date: "",
        jr_name: "",
        jr_signature_date: "",
        approval_status: "Pending",
        reason: "",
    }); 
    
    const [searchName, setSearchName] = useState("");
    const [selectedDesignation, setSelectedDesignation] = useState("");
           
    const handleChange = (evt) => {
        const changedField = evt.target.name;
        let newValue = evt.target.value;
    
        setFormData((currData) => {
        
        currData[changedField] = newValue;
        console.log(currData[changedField])
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
                'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
            });
            const headersObject = Object.fromEntries(customHeaders.entries());
            const response = await fetch(`${globalUrl}/v1/submit/E01`, {
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

  const handleSuccessRedirect = () => {
    navigate("/");
  };

  const handleFailureRedirect = () => {
    navigate("/E01");
  };

  return (

    <div className="border-2 border-black h-full">
        <h1 className='text-center font-bold text-3xl'>Indian Institute of Technology Indore - Estate Section</h1>
        <p className='text-center font-bold mt-4 text-lg'>Civil/Electrical/Air Conditioning Work Requisition Form (E: 01)</p>
        <p className='text-center'>(For regular maintenance, do not use this form; instead use ticket generation service)</p>
        <form action="#">
            <div className="mb-4">
              <p className='text-center'><span className='font-bold'>Requisition submitted by: </span> [must be an employee (other than project employee) of the Institute]</p>
              <table>
                <tbody>
                <tr>
                  <td><label htmlFor="empId">Emp Id:</label></td>
                  <td><input type="text" id="empId" name="empId" className="p-2 border-2 border-black" onChange={handleChange} /></td>
                </tr>
                </tbody>
                
              </table>
            </div>
            <div className="mb-4 mx-2">
                <label htmlFor="reason">Provide Description</label>
                <input type="text" id="reason" name="reason" className="p-2 border-2 border-black" onChange={handleChange} />
            </div>
            {/* <div>
                <label>Does this work require new built-up area/covered area?</label><br />
                <input type="radio" name="new_area" value="yes" checked /> Yes
                <input type="radio" name="new_area" value="no" /> No
            </div>
            <div className="form-group">
                <label>Have you attached any sketch showing dimensions/requirements?</label><br />
                <input type="radio" name="sketch_attached" value="yes" checked /> Yes
                <input type="radio" name="sketch_attached" value="no" /> No
            </div>
            <div className="form-group">
                <label>Will this work create new usable space?</label><br />
                <input type="radio" name="new_space" value="yes" checked /> Yes
                <input type="radio" name="new_space" value="no" /> No
            </div>
            <div className="form-group">
                <label>Do you have any suggestion that can be used for this purpose (optional)?</label><br />
                <input type="radio" name="suggestion" value="yes" checked /> Yes
                <input type="radio" name="suggestion" value="no" /> No
            </div> */}
            {/* <div className='mt-3 mx-2'>
                <label className='font-bold'>Suggestions</label>
                <input type="text" id="suggestion" name="suggestion" className="p-2 border-2 border-black" onChange={handleChange} />
            </div> */}

            <div className="mb-4">
              
              <table>
                <tbody>
                <tr>
                  <td><label htmlFor="hod_name">HOD Name:</label></td>
                  <td><input type="text" id="hod_name" name="hod_name" className="p-2 border-2 border-black" onChange={handleChange} /></td>
                  <td><label htmlFor="hod_signature_date">HOD Signature Date:</label></td>
                  <td><input type="date" id="hod_signature_date" name="hod_signature_date" className="p-2 border-2 border-black" onChange={handleChange} /></td>
                </tr>
                
                <tr>
                  <td><label htmlFor="jr_name">JR Name:</label></td>
                  <td><input type="text" id="jr_name" name="jr_name" className="p-2 border-2 border-black" onChange={handleChange} /></td>
                  <td><label htmlFor="jr_signature_date">JR Signature Date:</label></td>
                  <td><input type="date" id="jr_signature_date" name="jr_signature_date" className="p-2 border-2 border-black" onChange={handleChange} /></td>
                </tr>
                </tbody>
              </table>
            </div>
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
            
            <button onClick={(e) => handleSubmit(e, handleSuccessRedirect, handleFailureRedirect)} className='bg-black text-white m-3'>Submit</button>
            <ToastContainer  />
        </form>
    </div>
  )
}

export default E01;
