import React, { useState,useEffect } from 'react';
import globalUrl from '../../components/url';

const DisplayProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  let info={}

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            
      // Create a custom set of headers
            const customHeaders = new Headers({
              'Content-Type': 'application/json', // You may need to adjust the content type based on your request
              'Cookie': localStorage.getItem('token'), // Include the retrieved cookie in the 'Cookie' header
            });
            const headersObject = Object.fromEntries(customHeaders.entries());
  
            const response = await fetch(`${globalUrl}/v1/profile`, {
                method: 'GET',
                credentials: 'include',  
                headers: headersObject,
              });
            
          const responseData = await response.json();
          console.log('Parsed JSON response:', (responseData));
          info=responseData
              if (response.statusCode === 401) {
                console.log("Failed");
              }
            } catch (error) {
              console.error("Error:", error);
            }
    };

    fetchData();
}); 

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
          {isEditing ? <input type="text" id="name" defaultValue="Ram" /> : <p id="name">{}</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="email">Email:</label>
          {isEditing ? <input type="email" id="email" defaultValue="ram@gmail.com" /> : <p id="email">{!(info) ? "":info.email}</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="designation">Designation:</label>
          {isEditing ? <input type="text" id="designation" defaultValue="Proffesor" /> : <p id="designation">{!(info) ? "":info.designation}</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="department">Department:</label>
          {isEditing ? <input type="text" id="department" defaultValue="MEMS" /> : <p id="department">{!(info) ? "":info.department}</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="location">Location:</label>
          {isEditing ? <input type="text" id="location" defaultValue="Simrol" /> : <p id="location">{!(info) ? "":info.location}</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="room-no">Room No:</label>
          {isEditing ? <input type="text" id="room-no" defaultValue="123" /> : <p id="room-no">{!(info) ? "":info.room}</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="contact-no">Contact No:</label>
          {isEditing ? <input type="text" id="contact-no" defaultValue="1234567890" /> : <p id="contact-no">{!(info) ? "":info.contact_number}</p>}
        </div>
      </div>
    </div>
  );
};

export default DisplayProfile;
