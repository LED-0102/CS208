import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import globalUrl from '../../components/url';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const CompleteBookLab = () => {
  const navigate=useNavigate();
  const [info,setInfo] = useState({});
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bookDate, setBookDate] = useState('');
  const [labNamea, setLabNamea] = useState('');
  const {labName}=useParams();



useEffect(() => {
  const fetchData = async () => {
      try {
          
    // Create a custom set of headers
          const token = localStorage.getItem('token');
          const response = await fetch(`${globalUrl}/v1/profile`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'token': token
              }
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

  // Function to handle form submission
  const handleSubmit = async (e,
    onSuccessRedirect,
    onFailureRedirect) => {
    e.preventDefault();

    // Here you can add logic to determine the lab name based on the provided information
    // For demonstration, let's concatenate the date, start time, and end time
    const generatedLabName = `${date} - ${startTime} to ${endTime}`;
    setLabNamea(generatedLabName);
    const labInReq = labName.replace(/[\s-]/g, "_");
    const d=new Date();
    //const dateInReq = `${d.getFullYear()}_${d.getMonth()+1}_${d.getDate()}`;
    const dateInReq = `${d.getFullYear()}_${(d.getMonth() + 1).toString().padStart(2, '0')}_${d.getDate().toString().padStart(2, '0')}`;
      console.log(bookDate)
      const dateSetInReq=(`${bookDate}`).replace(/-/g, '_')
      console.log(dateSetInReq)
    try {
        const bookinginfo={
            name: `${info.username}`,
            start: `${startTime}`,
            end : `${endTime}`
        }
        const customHeaders = new Headers({
          'Content-Type': 'application/json', // You may need to adjust the content type based on your request
          'Cookie': localStorage.getItem('token'), // Include the retrieved cookie in the 'Cookie' header
        });
        const headersObject = Object.fromEntries(customHeaders.entries());
        const response = await fetch(`${globalUrl}/v1/labs/book_schedule/${labInReq}/${dateSetInReq}`, {
          method: 'POST',
          credentials: 'include',
          headers: headersObject,
          body: JSON.stringify(bookinginfo), // Sending updated profile information
        });
        console.log("JSON string",JSON.stringify(bookinginfo))
        console.log(`${globalUrl}/v1/labs/book_schedule/${labInReq}/${dateSetInReq}`)
        if (response.status === 200) {
          toast.success('Booking successfully', {
            onClose: () => onSuccessRedirect() // Redirect to success page after toast is fully closed
          });
        } else if (response.status === 401 || response.status === 400 ) {
          toast.error('Failed to Book Lab', {
            onClose: () => onFailureRedirect() // Redirect to failure page after toast is fully closed
          });
        }else{
          toast.error('Failed to Book Lab', {
            onClose: () => onFailureRedirect() // Redirect to failure page after toast is fully closed
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };
  const handleSuccessRedirect = () => {
    navigate("/BookLab");
  };

  const handleFailureRedirect = () => {
    navigate("/BookLab");
  };
  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Book Lab "{labName}"</h1>
      <form onSubmit={(e)=>{handleSubmit(e, handleSuccessRedirect, handleFailureRedirect)}}>
        
        <div className="mb-4">
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bookDate" className="block text-sm font-medium text-gray-700">Book Date</label>
          <input
            type="date"
            id="bookDate"
            value={bookDate}
            onChange={(e) => setBookDate(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
        <ToastContainer  />
      </form>
      {labNamea && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Lab Name:</h2>
          <p className="mt-2">{labNamea}</p>
        </div>
      )}
    </div>
  );
};

export default CompleteBookLab;
