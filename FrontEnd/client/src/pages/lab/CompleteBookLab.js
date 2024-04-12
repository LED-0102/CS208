import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import globalUrl from '../../components/url';

const CompleteBookLab = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [labNamea, setLabNamea] = useState('');
  const {labName}=useParams();
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here you can add logic to determine the lab name based on the provided information
    // For demonstration, let's concatenate the date, start time, and end time
    const generatedLabName = `${date} - ${startTime} to ${endTime}`;
    setLabNamea(generatedLabName);
    const labInReq = labName.replace(/[\s-]/g, "_");
    const d=new Date();
    const dateInReq = `${d.getFullYear()}_${d.getMonth()+1}_${d.getDate()}`;
    try {
        const bookinginfo={
            name: `${labInReq}`,
            start: `${startTime}`,
            end : `${endTime}`
        }
        const customHeaders = new Headers({
          'Content-Type': 'application/json', // You may need to adjust the content type based on your request
          'Cookie': localStorage.getItem('token'), // Include the retrieved cookie in the 'Cookie' header
        });
        const headersObject = Object.fromEntries(customHeaders.entries());
        const response = await fetch(`${globalUrl}/v1/labs/book_schedule/${labInReq}/${dateInReq}`, {
          method: 'POST',
          credentials: 'include',
          headers: headersObject,
          body: JSON.stringify(bookinginfo), // Sending updated profile information
        });
        if (response.ok) {
          // If the request is successful, update the state or show a success message
          console.log('Profile information saved successfully!');
          // You may want to update any local state here if needed
        } else {
          console.error('Failed to save profile information');
          // Handle error scenarios, show error messages, etc.
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };
//   useEffect(() => {
    
//   }, []);
  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Book Lab "{labName}"</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
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
