import React from 'react'
import {useEffect,useState} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import globalUrl from "../../components/url";
import {data} from "../../components/Search/data";
// import { useNavigate } from 'react-router-dom';

const DisplayPendingForm = () => {
    const [pendingFormData,setPendingFormData]=useState(null)
    const [reason, setReason] = useState('');
    const [error, setError] = useState("");
    // const [formData, setFormData] = useState({
    //   form_id:0,

    // })

    const handleFormClick = async (formId, formName, action) => {
      // Get the form details based on formId and formName
      // const formDetails = pendingFormData[formName].find(form => form.id === formId);
  
      // Prepare data to send to the backend
      const dataToSend = {
        // formDetails: formDetails,
        form_id:formId,
        form_type:formName,
        note: reason,
        // sender:"",
      
        decision:action === "accept" ? 1 : 0 ,
      };
      
      console.log("++++++++++++++++++datatosend",dataToSend)
 
      try {

        const storedCookie = document.cookie;
        console.log(storedCookie);
  // Create a custom set of headers
        const customHeaders = new Headers({
          'Content-Type': 'application/json', // You may need to adjust the content type based on your request
          'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
        });
        const headersObject = Object.fromEntries(customHeaders.entries());
        // const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
        const response = await fetch(`${globalUrl}/v1/approval`, {
          method: 'POST',
          credentials: 'include',  // Include credentials (cookies) in the request
          headers: headersObject,
          body: JSON.stringify(dataToSend)
        });
        console.log(response)
        if (response.statusCode === 401) {
          console.log("Failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
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
                const response = await fetch(`${globalUrl}/list/forms/pending`, {
                    method: 'GET',
                    credentials: 'include',  // Include credentials (cookies) in the request
                    headers: headersObject,
                    // body: JSON.stringify(updatedFormData)
                  });
                //   console.log(response)
                // console.log("aadd",typeof(data))
                // setPendingFormData(response.data);
                // console.log("aadd",typeof(pendingFormData))
                // console.log("aadd",pendingFormData)
                // console.log("aadd++++",response)
                   // Parsing JSON response
    const responseData = await response.json();
    // console.log('Parsed JSON response:', typeof(responseData));
    console.log('Parsed JSON response:', (responseData));
    setPendingFormData(responseData);
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

    console.log("++++++",pendingFormData)

    // const handleItemClick = (id) => {
    //     // Perform navigation when item is clicked, for example:
    //     navigate(`${globalUrl}/displayPendingForm/SS04/${id}`); // Navigate to a route with the item's id
    //   };

      const handleFormClickProceed = (formId,formName) => {
        // console.log('Clicked form with ID:', formId);
        navigate(`/displayPendingForm/${formName}/${formId}`);
        // Add your navigation or other logic here
      };

      const handleChange = (event) => {
        setReason(event.target.value);
      };
    

  return (
    <div className='flex flex-row border-2 border-black p-4 gap-4 text-center '>
    {pendingFormData && Object.entries(pendingFormData).map(([formName, forms]) => (
      <div key={formName} className="w-1/3">
        <h2>{formName}</h2>
        <ul>
          {forms.map(form => (
            <li key={form.id}>
              <p>ID: {form.id}</p>
              <p>Submitter: {form.submitter}</p>
              <p>Receiver: {form.receiver}</p>
              <p>Approval Status: {form.approval_status}</p>
              <button onClick={() => handleFormClickProceed(form.id,formName)}>Proceed</button>
              <button onClick={() => handleFormClick(form.id, formName, 'accept')}>Accept</button>
              <button onClick={() => handleFormClick(form.id, formName, 'reject')}>Reject</button>
            </li>
          ))}
        </ul>
      </div>
    ))}
    <div className='flex flex-col w-2/3'>
      <div className=''>
      <textarea className='border-2 border-black'
       placeholder=" Reason for acception and rejection"
      //  id="invoice_no_date"
      //  name="invoice_no_date"
      type="text"
      value={reason}
       onChange={handleChange}></textarea>
      </div>
      {/* <div className='flex flex-row gap-4 justify-center w-full'>
        <p>Accept</p>
        <p>Reject</p>
      </div> */}
    </div>
  </div>
  )
}

export default DisplayPendingForm