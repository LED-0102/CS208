// import React , {useEffect, useState} from 'react';
// import { useParams } from 'react-router-dom';
// import globalUrl from '../../components/url';

// const ShowBookLab = () => {
//   const {labName}=useParams();
//   const [bookings, setBookings] = useState([]);

//   useEffect( ()=> async () => {
//     const labInReq = labName.replace(/[\s-]/g, "_");
//     const d=new Date();
//     //const dateInReq = `${d.getFullYear()}_${d.getMonth()+1}_${d.getDate()}`;
//     const dateInReq = `${d.getFullYear()}_${(d.getMonth() + 1).toString().padStart(2, '0')}_${d.getDate().toString().padStart(2, '0')}`;

//     try {
//         const customHeaders = new Headers({
//           'Content-Type': 'application/json', // You may need to adjust the content type based on your request
//           'Cookie': localStorage.getItem('token'), // Include the retrieved cookie in the 'Cookie' header
//         });
//         const headersObject = Object.fromEntries(customHeaders.entries());
//         const response = await fetch(`${globalUrl}/v1/labs/get_schedule/${labInReq}/${dateInReq}`, {
//           method: 'GET',
//           credentials: 'include',
//           headers: headersObject
//         });
//         const responsej=response.json()
//         console.log(responsej)
//         setBookings(responsej)
//       } catch (error) {
//         console.error('Error:', error);
//       }
//   },[])


//   // const [labBookings1, setLabBookings1] = useState({});
//   const LabBooking = ({ name, startTime, endTime }) => {
//     return (
//       <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
//         <h2 className="text-xl font-bold mb-2">{name}</h2>
//         <p><span className="font-semibold">Start Time:</span> {startTime}</p>
//         <p><span className="font-semibold">End Time:</span> {endTime}</p>
//       </div>
//     );
//   };
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Lab Bookings for {`${labName}`}</h1>
//       {bookings.length > 0 && bookings.map((booking, index) => (
//         <LabBooking
//           key={index}
//           name={booking.name}
//           startTime={booking.startTime}
//           endTime={booking.endTime}
//         />
//       ))}
//     </div>
//   );
// };

// export default ShowBookLab;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import globalUrl from '../../components/url';

const ShowBookLab = () => {
  const { labName } = useParams();
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (selectedDate !== '') {
      fetchBookings(selectedDate);
    }
  }, [selectedDate]);

  const fetchBookings = async (date) => {
    const labInReq = labName.replace(/[\s-]/g, "_");
    try {
      const customHeaders = new Headers({
        'Content-Type': 'application/json', 
        'Cookie': localStorage.getItem('token'), 
      });
      const headersObject = Object.fromEntries(customHeaders.entries());
      const response = await fetch(`${globalUrl}/v1/labs/get_schedule/${labInReq}/${date}`, {
        method: 'GET',
        credentials: 'include',
        headers: headersObject
      });
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

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
      <h1 className="text-2xl font-bold mb-4">Lab Bookings for {labName}</h1>
      <div className="mb-4">
        <label htmlFor="datePicker" className="mr-2 font-semibold">Select Date:</label>
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      {bookings && bookings.length > 0 && bookings.map((booking, index) => (
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
