import React, { useState,useEffect } from 'react';
import globalUrl from '../../components/url';

const DisplayProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [info,setInfo] = useState({})

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            console.log("Token not found?");
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

    fetchData().then(r => console.log("Data fetched"));
},[]); 


useEffect(() => {
  console.log("information", info);
}, [info]);


const handleSaveProfile = async () => {
  try {
    // Make a POST request to your backend endpoint with the updated profile information
    const editinginfo={
      location: `${info.location}`,
      room: `${info.room}`,
      contact_number: `${info.contact_number}`
    }
    console.log(editinginfo)
    const token = localStorage.getItem('token');
    console.log(token);
    console.log("Token not found?");
    const response = await fetch(`${globalUrl}/v1/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(editinginfo)
    });
    if (response.ok) {
      // If the request is successful, update the state or show a success message
      console.log('Profile information saved successfully!');
      setIsEditing(false)
      // You may want to update any local state here if needed
    } else {
      console.error('Failed to save profile information');
      setIsEditing(false)
      // Handle error scenarios, show error messages, etc.
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleChange = (e) => {
  // Update the corresponding field in the info state
  setInfo({ ...info, [e.target.id]: e.target.value });
};

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={isEditing ? handleSaveProfile : handleEditClick}
        >
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Profile Information</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-bold" htmlFor="username">Name:</label>
          {isEditing ? <input type="text" id="username" value={info.username || ''} onChange={handleChange} /> : <p id="username">{!(info) ? "" : info.username}</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="email">Email:</label>
          {isEditing ? <input type="email" id="email" value={info.email || ''} onChange={handleChange} /> : <p id="email">{!(info) ? "":info.email}</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="designation">Designation:</label>
          {isEditing ? <input type="text" id="designation" value={info.designation || ''} onChange={handleChange} /> : <p id="designation">{!(info) ? "":info.designation}</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="department">Department:</label>
          {isEditing ? <input type="text" id="department" value={info.department || ''} onChange={handleChange} /> : <p id="department">{!(info) ? "":info.department}</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="location">Location:</label>
          {isEditing ? <input type="text" id="location" value={info.location || ''} onChange={handleChange} /> : <p id="location">{!(info) ? "":info.location}</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="room">Room No:</label>
          {isEditing ? <input type="text" id="room" value={info.room || ''} onChange={handleChange} /> : <p id="room">{!(info) ? "":info.room}</p>}
        </div>
        <div>
          <label className="block mb-2 font-bold" htmlFor="contact_number">Contact No:</label>
          {isEditing ? <input type="text" id="contact_number" value={info.contact_number || ''} onChange={handleChange} /> : <p id="contact_number">{!(info) ? "":info.contact_number}</p>}
        </div>
      </div>
    </div>
  );
};

export default DisplayProfile;
