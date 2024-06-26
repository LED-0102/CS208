import React from 'react'
import {useEffect,useState} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import globalUrl from "../../components/url";
import {data} from "../../components/Search/data";
// import { useNavigate } from 'react-router-dom';

const DisplaySeekingForm = () => {
    const [previousFormData,setpreviousFormData]=useState(null)
    const [error, setError] = useState("");
    // console.log("datais++++",data[0].name)
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
              const token = localStorage.getItem('token');
              console.log("Token submit SS01: ", token);
                const response = await fetch(`${globalUrl}/list/forms/seeking`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'token': token
                  }
                  });
                //   console.log(response)
                // console.log("aadd",typeof(data))
                // setpreviousFormData(response.data);
                // console.log("aadd",typeof(previousFormData))
                // console.log("aadd",previousFormData)
                // console.log("aadd++++",response)
                   // Parsing JSON response
    const responseData = await response.json();
    // console.log('Parsed JSON response:', typeof(responseData));
    console.log('Parsed JSON response:', (responseData));
    setpreviousFormData(responseData);
                //   console.log()
                  if (response.statusCode === 401) {
                    console.log("Failed");
                  }
                } catch (error) {
                  console.error("Error:", error);
                }
        };

        fetchData();


        return () => {

        };
    }, []);

    // console.log("++++++",previousFormData)

   
      const handleFormClick = (formId,formName) => {
        // console.log('Clicked form with ID:', formId);
        navigate(`/displaySeekingForm/${formName}/${formId}`);
        // Add your navigation or other logic here
      };

  return (
    <div className='flex flex-row justify-center gap-32 '>
    {previousFormData && Object.entries(previousFormData).map(([formName, forms]) => (
      <div key={formName}>
        <ul>
        <div  className="flex flex-col gap-16 justify-center ">
          {forms.map(form => (
            <li key={form.id} className="border-2 p-2 bg-pink-50 shadow-md rounded-lg">
              <h2>{formName}</h2>
              <p>ID: {form.id}</p>
              <p>Submitter: {form.submitter}</p>
              <p>Receiver: {form.receiver}</p>
              <p>Approval Status: {form.approval_status}</p>
              <button onClick={() => handleFormClick(form.id,formName)}>Proceed</button>
            </li>
          ))}
    </div>
        </ul>
      </div>
    ))}
      {/* <div className='bg-blue-700 h-64 border-black border-2'>
        <textarea className='h-32'></textarea>
      </div> */}
  </div>
  )
}

export default DisplaySeekingForm