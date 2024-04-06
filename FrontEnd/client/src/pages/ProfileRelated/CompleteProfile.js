import React, { useState } from 'react';

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    officeAddress: '',
    randomInput1: '',
    randomInput2: ''
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
          <label htmlFor="officeAddress" className="block text-gray-700 font-bold mb-2">Office Address</label>
          <input 
            type="text" 
            id="officeAddress" 
            name="officeAddress" 
            value={formData.officeAddress} 
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter office address"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="randomInput1" className="block text-gray-700 font-bold mb-2">Random Input 1</label>
          <input 
            type="text" 
            id="randomInput1" 
            name="randomInput1" 
            value={formData.randomInput1} 
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter random input 1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="randomInput2" className="block text-gray-700 font-bold mb-2">Random Input 2</label>
          <input 
            type="text" 
            id="randomInput2" 
            name="randomInput2" 
            value={formData.randomInput2} 
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter random input 2"
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
