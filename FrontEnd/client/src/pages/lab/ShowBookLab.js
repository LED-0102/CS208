import React , {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import globalUrl from '../../components/url';

const ShowBookLab = () => {
  const {labName}=useParams();
  const [labNamea, setLabNamea] = useState('');
  const labBookings1 = [
    { name: 'Lab 1', startTime: '9:00 AM', endTime: '11:00 AM' },
    { name: 'Lab 2', startTime: '1:00 PM', endTime: '3:00 PM' },
  ];

  // useEffect( ()=> async (e,
  //   onSuccessRedirect,
  //   onFailureRedirect) => {
  //   e.preventDefault();
  //   const generatedLabName = `${date} - ${startTime} to ${endTime}`;
  //   setLabNamea(generatedLabName);
  //   const labInReq = labName.replace(/[\s-]/g, "_");
  //   const d=new Date();
  //   //const dateInReq = `${d.getFullYear()}_${d.getMonth()+1}_${d.getDate()}`;
  //   const dateInReq = `${d.getFullYear()}_${(d.getMonth() + 1).toString().padStart(2, '0')}_${d.getDate().toString().padStart(2, '0')}`;

  //   try {
  //       const bookinginfo={
  //           name: `${info.username}`,
  //           start: `${startTime}`,
  //           end : `${endTime}`
  //       }
  //       const customHeaders = new Headers({
  //         'Content-Type': 'application/json', // You may need to adjust the content type based on your request
  //         'Cookie': localStorage.getItem('token'), // Include the retrieved cookie in the 'Cookie' header
  //       });
  //       const headersObject = Object.fromEntries(customHeaders.entries());
  //       const response = await fetch(`${globalUrl}/v1/labs/book_schedule/${labInReq}/${dateInReq}`, {
  //         method: 'POST',
  //         credentials: 'include',
  //         headers: headersObject,
  //         body: JSON.stringify(bookinginfo), // Sending updated profile information
  //       });
  //       console.log("JSON string",JSON.stringify(bookinginfo))
  //       console.log(`${globalUrl}/v1/labs/book_schedule/${labInReq}/${dateInReq}`)
  //       if (response.status === 200) {
  //         toast.success('Booking successfully', {
  //           onClose: () => onSuccessRedirect() // Redirect to success page after toast is fully closed
  //         });
  //       } else if (response.status === 401 || response.status === 400 ) {
  //         toast.error('Failed to Book Lab', {
  //           onClose: () => onFailureRedirect() // Redirect to failure page after toast is fully closed
  //         });
  //       }else{
  //         toast.error('Failed to Book Lab', {
  //           onClose: () => onFailureRedirect() // Redirect to failure page after toast is fully closed
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  // },[])


  // const [labBookings1, setLabBookings1] = useState({});
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
      <h1 className="text-2xl font-bold mb-4">Lab Bookings for {`${labName}`}</h1>
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
