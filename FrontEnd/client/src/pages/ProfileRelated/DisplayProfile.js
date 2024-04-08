import React, { useState,useEffect } from 'react';
import axios from 'axios';
import globalUrl from '../../components/url';

const DisplayProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

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
            const response = await fetch(`${globalUrl}/v1/profile`, {
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
console.log("asd")
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

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleEditClick}
        >
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Profile Information</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-bold" htmlFor="name">Name:</label>
          {isEditing ? <input type="text" id="name" defaultValue="Ram" /> : <p id="name">Ram</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="email">Email:</label>
          {isEditing ? <input type="email" id="email" defaultValue="ram@gmail.com" /> : <p id="email">ram@gmail.com</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="designation">Designation:</label>
          {isEditing ? <input type="text" id="designation" defaultValue="Proffesor" /> : <p id="designation">Proffesor</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="department">Department:</label>
          {isEditing ? <input type="text" id="department" defaultValue="MEMS" /> : <p id="department">MEMS</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="location">Location:</label>
          {isEditing ? <input type="text" id="location" defaultValue="Simrol" /> : <p id="location">Simrol</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="room-no">Room No:</label>
          {isEditing ? <input type="text" id="room-no" defaultValue="123" /> : <p id="room-no">123</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="contact-no">Contact No:</label>
          {isEditing ? <input type="text" id="contact-no" defaultValue="1234567890" /> : <p id="contact-no">1234567890</p>}
        </div>
      </div>
    </div>
  );
};

export default DisplayProfile;
