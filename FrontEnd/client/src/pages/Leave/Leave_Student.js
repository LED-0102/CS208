import React, { useState, useEffect } from "react";
import axios from "axios";
import globalUrl from "../../components/url";

const Leave_Student = () => {

  const [userData,setUserData]=useState({})
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    note: "",
    receiver: 0,
    submitter: 0,
    date: "",
    leave_reason: "",
    start_date: "",
    end_date: "",
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

        console.log("ideaa",dataToBeSub)

        try {
    
            const storedCookie = document.cookie;
            console.log(storedCookie);
        // Create a custom set of headers
            const customHeaders = new Headers({
                'Content-Type': 'application/json', // You may need to adjust the content type based on your request
                'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
            });
            const headersObject = Object.fromEntries(customHeaders.entries());
            const response = await fetch(`${globalUrl}/v1/submit/Leave`, {
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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-7 rounded-lg shadow-md w-100">
        <h1 className="text-2xl font-semibold mb-4"><u>LEAVE REQUEST FORM</u></h1>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium">
             <b> Date</b>
            </label>
            <input
              type="date"
              name="date"
              placeholder="First Name Last Name"
              className="w-full border rounded-md p-2" onChange = {handleChange} value={formData.date} required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium">
             <b> Leave Reason</b>
            </label>
            <textarea  name="leave_reason" className="w-full border rounded-md p-2" rows="4" cols="50" onChange = {handleChange} value={formData.leave_reason} required>

            </textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium">
             <b> Leave Start Date</b>
            </label>
            <input
              type="date"
              name="start_date"
              placeholder="leave start date"
              className="w-full border rounded-md p-2" onChange = {handleChange} value={formData.start_date} required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium">
              <b>Leave End Date</b>
            </label>
            <input
              type="date"
              name="end_date"
              placeholder="leave end date"
              className="w-full border rounded-md p-2" onChange = {handleChange} value={formData.end_date} required
            />
          </div>

          <div className=''> 
          <div>
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
          </div>
          
          <button onClick={(e) => handleSubmit(e)}
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 w-full mt-4">
            Submit
          </button>
          </div>
          </div>
        </div></form>
      </div>
    </div>
  );
};

export default Leave_Student;