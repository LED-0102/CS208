import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import globalUrl from "../../components/url";
import axios from 'axios';
import "./r1.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const R1 = () => {
  const navigate=useNavigate();
  const [info,setInfo] = useState({})
  useEffect(() => {
    const fetchData = async () => {
        try {
            
      // Create a custom set of headers
      const token = localStorage.getItem('token');
            const customHeaders = new Headers({
              'Content-Type': 'application/json', // You may need to adjust the content type based on your request
              'token': token, // Include the retrieved cookie in the 'Cookie' header
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
        note: "",
        receiver: 2,
        submitter: 0,
        date:"",
        purpose_of_expenditure: "",
        name_of_applicant: "",
        designation: "",
        department: "",
        payment_favour: "",
        budget_head_expenditure: "RDF",
        // otherBudgetHead: "",
        project_sanction_no: "",
        expenditure_head: "",
        // otherexpenditureHead: "",
        amount_claimed: 0,
        recommending_authority_name: "",
        approving_authority_name: "",
        approval_status:"Pending",
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
    
            const token = localStorage.getItem('token');
        // Create a custom set of headers
            const customHeaders = new Headers({
                'Content-Type': 'application/json', // You may need to adjust the content type based on your request
                'token': token, // Include the retrieved cookie in the 'Cookie' header
            });
            const headersObject = Object.fromEntries(customHeaders.entries());
            const response = await fetch(`${globalUrl}/v1/submit/R1`, {
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
            const token = localStorage.getItem('token');
            console.log("Token receiver: ", token);
            const response = await fetch(`${globalUrl}/list/receiver`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'token': token
              }
            });
            const responseData = await response.json();
    
            // const response = await axios.get(`https://randomuser.me/api/`);
            // const datss=data
            // console.log("aadd",typeof(response.data))
            // console.log("aadd",typeof(data))
            setUserData(responseData);
            // console.log("dats",response.data)
            // console.log("dats++++++userData",userData)
          } catch (error) {
            setError(error);
          } finally {
            // setLoading(false);
          }
        };
    
        fetchData().then(r => console.log("Fetched and set"));
    
    
        return () => {
    
        };
      }, []);

  useEffect(() => {
    console.log("information", info);
    // Update the formData state with info data
    setFormData(prevState => ({
      ...prevState,
      name_of_applicant: info.username,
      designation: info.designation,
      department: info.department,
    }));
    console.log(formData)
  }, [info]);

  const handleSuccessRedirect = () => {
    navigate("/");
  };

  const handleFailureRedirect = () => {
    navigate("/R1");
  };

  return (
    <div>
      <div className="">
        <div className="">
        <h1 className='font-bold text-center text-3xl'>INDIAN INSTITUTE OF TECHNOLOGY INDORE</h1>
        <h2 className='font-bold text-center text-xl'>GENERAL PAYMENT AGAINST DIRECT PURCHASE FORM (R & D)</h2>
        <div className="h-1 r1Spline bg-black"></div>
        <p className='text-md ml-3'>(Please use separate Form for TA-DA/Local Conveyance/General Advance settlement/Medical Expenses/ CPDA)</p>
        <form>
        <table>
            <tbody>
                <tr>
                    <th>1. Purpose of the Expenditure</th>
                    <td colSpan="5"><input type="text" name="purpose_of_expenditure" id="_of_expenditure" onChange={handleChange} required /></td>
                </tr>
                <tr>
                    <th><label htmlFor='name_of_applicant'>2. Name of the Applicant</label></th>
                    <td><input type="text" name="name_of_applicant" id="name_of_applicant" onChange={handleChange} defaultValue={formData.name_of_applicant} required /></td>
                    <th><label htmlFor='designation'>3. Designation</label></th>
                    <td><input type="text" name="designation" id='designation' onChange={handleChange} defaultValue={formData.designation} required /></td>
                    <th><label className='department'>4. Department</label></th>
                    <td><input type="text" name="department" id='department' onChange={handleChange} defaultValue={formData.department} required /></td>
                </tr>
                <tr>
                    <th>5. Payment to be made in favor of</th>
                    <td colSpan="5">
                        <label htmlFor='payment_favour' >Party</label>
                        <input type="checkbox" name="payment_favour" id='payment_favour' onChange={handleChange} required />
                    </td>
                </tr>
                <tr>
                    <th><label htmlFor='budget_head_expenditure'>6. Please specify the budget head for expenditure</label></th>
                    <td colSpan="5">
                        <select id="budget_head_expenditure" name="budget_head_expenditure" onChange={handleChange}>
                            <option value="RDF">RDF</option>
                            <option value="DDF">DDF</option>
                            <option value="Others">Others</option>
                        </select>
                    </td>
                </tr>
                {/* <tr>
                    <th><label htmlFor='otherBudgetHead'>7. If Other please specify (else leave blank)</label></th>
                    <td colSpan="5"><input type="text" name="otherBudgetHead" id='otherBudgetHead' defaultValue="" onChange={handleChange} /></td>
                </tr> */}
                <tr>
                    <th><label htmlFor='project_sanction_no'>7. Project Sanction No.</label></th>
                    <td><input type="text" name="project_sanction_no" id='project_sanction_no' onChange={handleChange} /></td>
                    <th><label htmlFor='expenditure_head'>8. Expenditure Head</label></th>
                    <td colSpan="3">
                        <select id="expenditure_head" name="expenditure_head" defaultValue="Equipment" onChange={handleChange}>
                            <option value="Equipment">Equipment</option>
                            <option value="Consumable">Consumable</option>
                            <option value="Contingency">Contingency</option>
                            <option value="Other">Other</option>
                        </select>
                    </td>
                </tr>
                {/* <tr>
                    <th><label htmlFor='otherexpenditureHead'>10. If Other please specify (else leave blank)</label></th>
                    <td colSpan="5"><input type="text" name="otherexpenditureHead" id='otherexpenditureHead' defaultValue="" onChange={handleChange} /></td>
                </tr> */}
                <tr>
                    <th><label htmlFor='amount_claimed'>9. Amount Claimed (Rs)</label></th>
                    <td colSpan="5"><input type="number" name="amount_claimed" onChange={handleChange} required /></td>
                </tr>
                <tr>
                    <th><label htmlFor='_name'>10. Name of Recommending Authority:</label></th>
                    <td colSpan="5"><input type="text" name="recommending_authority_name" id="recommending_authority_name" onChange={handleChange} required /></td>
                </tr>
            </tbody>
        </table>

        <div>
            <p><strong>Note:</strong></p>
            <ol>
                <li>1. If the expenses from other, kindly specify in others.</li>
                <li>2. Form to be sent to Central Store for stock entry in the asset register in order to avoid time lag.</li>
                <li>3. The consumables purchased also to be entered in the stock register.</li>
                <li>4. Certified GEM report is mandatory for the purchase of goods/items.</li>
                <li>5. Invoice must be certified by the project Investigator.</li>
            </ol>
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
              onClick={() => handleUserSelect(user.id,user.username)}>

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
        
    </div>

           
            </div>

        <button onClick={(e) => handleSubmit(e, handleSuccessRedirect, handleFailureRedirect)} className='text-white bg-black'>Submit</button>
        <ToastContainer  />
    </form>
    </div>
      </div>
    </div>
  )
}

export default R1
