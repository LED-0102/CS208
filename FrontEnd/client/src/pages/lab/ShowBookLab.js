import React , {useState} from 'react';


const ShowBookLab = () => {
  
//   const labBookings = [
//     { name: 'Lab 1', startTime: '9:00 AM', endTime: '11:00 AM' },
//     { name: 'Lab 2', startTime: '1:00 PM', endTime: '3:00 PM' },
//   ];

  const [labBookings1, setLabBookings1] = useState({});
  const LabBooking = ({ name, startTime, endTime }) => {
    return (
      <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p><span className="font-semibold">Start Time:</span> {startTime}</p>
        <p><span className="font-semibold">End Time:</span> {endTime}</p>
      </div>
    );
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lab Bookings</h1>
      {labBookings1.map((booking, index) => (
        <LabBooking
          key={index}
          name={booking.name}
          startTime={booking.startTime}
          endTime={booking.endTime}
        />
      ))}
    </div>
  );
};

export default ShowBookLab;
