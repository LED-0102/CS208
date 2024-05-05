import React, { useState } from 'react';

const DateInput = ({ onDateSelected }) => {
  const [date, setDate] = useState('');

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();
    onDateSelected(date);
  };

  return (
    <form onSubmit={handleDateSubmit}>
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="border border-gray-300 rounded-md px-3 py-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
        Submit
      </button>
    </form>
  );
};

export default DateInput;
