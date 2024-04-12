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
                const storedCookie = document.cookie;
                console.log(storedCookie);
          // Create a custom set of headers
                const customHeaders = new Headers({
                  'Content-Type': 'application/json', // You may need to adjust the content type based on your request
                  'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
                });
                const headersObject = Object.fromEntries(customHeaders.entries());
      
                //  const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
                const response = await fetch(`${globalUrl}/list/forms/seeking`, {
                    method: 'GET',
                    credentials: 'include',  // Include credentials (cookies) in the request
                    headers: headersObject,
                    // body: JSON.stringify(updatedFormData)
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
    <div className='flex'>
    {previousFormData && Object.entries(previousFormData).map(([formName, forms]) => (
      <div key={formName}>
        <h2>{formName}</h2>
        <ul>
          {forms.map(form => (
            <li key={form.id}>
              <p>ID: {form.id}</p>
              <p>Submitter: {form.submitter}</p>
              <p>Receiver: {form.receiver}</p>
              <p>Approval Status: {form.approval_status}</p>
              <button onClick={() => handleFormClick(form.id,formName)}>Proceed</button>
            </li>
          ))}
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