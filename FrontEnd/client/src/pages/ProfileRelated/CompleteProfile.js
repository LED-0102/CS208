import React, { useState } from 'react';

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    location: '',
    room: '',
    contact_number: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, for example, sending data to the backend
    console.log(formData);
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            value={formData.location} 
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter office address"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="room" className="block text-gray-700 font-bold mb-2">Room</label>
          <input 
            type="text" 
            id="room" 
            name="room" 
            value={formData.room} 
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Room"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contact_number" className="block text-gray-700 font-bold mb-2">Contact Number</label>
          <input 
            type="text" 
            id="contact_number" 
            name="contact_number" 
            value={formData.contact_number} 
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Contact No"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Skip for now
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProfile;
