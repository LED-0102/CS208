import React from 'react'
import {useEffect,useState} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import globalUrl from "../../components/url";
import {data} from "../../components/Search/data";
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const DisplayPendingForm = () => {
    const [pendingFormData,setPendingFormData]=useState(null)
    const [reason, setReason] = useState('');
    const [error, setError] = useState("");
    // const [formData, setFormData] = useState({
    //   form_id:0,

    // })

    const handleFormClick = async (formId, formName, action,onSuccessRedirect,
      onFailureRedirect) => {
      // Get the form details based on formId and formName
      // const formDetails = pendingFormData[formName].find(form => form.id === formId);
  
      // Prepare data to send to the backend
      const dataToSend = {
        // formDetails: formDetails,
        form_id:formId,
        form_type:formName,
        note: reason,
        // sender:"",
      
        decision: action === "accept" ,
      };
      
      console.log("++++++++++++++++++datatosend",dataToSend)
 
      try {

        const token = localStorage.getItem('token');
        console.log("Token submit SS01: ", token);
        const response = await fetch(`${globalUrl}/v1/approval`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': token
          },
          body: JSON.stringify(dataToSend)
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
              const token = localStorage.getItem('token');
              console.log("Token submit SS01: ", token);
                const response = await fetch(`${globalUrl}/list/forms/pending`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'token': token
                  }
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

    console.log("pendinfformdata++++++",pendingFormData)

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
  
      const handleSuccessRedirect = () => {
        navigate("/");
      };
    
      const handleFailureRedirect = () => {
        navigate("/displayPendingForm");
      };

  return (
    <div className='flex flex-col border-2  p-4 gap-4 text-center '>
    {pendingFormData && Object.entries(pendingFormData).map(([formName, forms]) => (
      <div key={formName} className="">
        <ul>
          {forms.map(form => (
            <div className='flex flex-row justify-center gap-8 p-4 '>
              <div className=''>
              <h2>{formName}</h2>
            <li key={form.id}>
              <p>ID: {form.id}</p>
              <p>Submitter: {form.submitter}</p>
              <p>Receiver: {form.receiver}</p>
              <p>Approval Status: {form.approval_status}</p>
              <div className="flex flex-row gap-4">
              <button onClick={() => handleFormClickProceed(form.id,formName)}>Proceed</button>
              <button onClick={() => handleFormClick(form.id, formName, 'accept',handleSuccessRedirect, handleFailureRedirect)}>Accept</button>
              <button onClick={() => handleFormClick(form.id, formName, 'reject',handleSuccessRedirect, handleFailureRedirect)}>Reject</button>
              <ToastContainer  />
              </div>
            </li>
            </div>

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
          ))}
        </ul>
      </div>
    ))}
  
  </div>
  )
}

export default DisplayPendingForm