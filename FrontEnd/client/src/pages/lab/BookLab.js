import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import globalUrl from '../../components/url';


const BookLab = () => {
  const navigate = useNavigate()
  const handleLabDetail = async (labName) =>{
    const d=new Date();
    const dateInReq = `${d.getFullYear()}_${d.getMonth()+1}_${d.getDate()}`;
    console.log(dateInReq)
    const labInReq = labName.replace(/[\s-]/g, "_");
    console.log(`${globalUrl}/v1/labs/get_schedule/${labInReq}/${dateInReq}`)
    const customHeaders = new Headers({
      'Content-Type': 'application/json',
      'token': localStorage.getItem('token')
    });
    const headersObject = Object.fromEntries(customHeaders.entries());
    const labSchedule = await fetch(`${globalUrl}/v1/labs/get_schedule/${labInReq}/${dateInReq}`, {
      method: 'GET',
      credentials: 'include',  
      headers: headersObject,
    });
    console.log(labSchedule);
    navigate(`/showbooklab/${labInReq}`)
  }

  const proceedBook = (labname) =>{
    navigate(`/completebooklab/${labname}`)
  }

  const LabComponent = ({ labName, labLocation }) => {
    return (
      <div className="bg-gray-200 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-2">{labName}</h2>
        <p className="text-sm text-gray-600 mb-2">{labLocation}</p>
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={()=>{proceedBook(labName)}} >Book Lab</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-md" onClick={()=>{handleLabDetail(labName)}}>See Details</button>
        </div>
      </div>
    );
  };

  // Assuming you have an array of labs with name and location
  const labs = [
    { name: 'Advanced Functional Materials Research Group Lab', location: '1 D 104' },
    { name: 'Materials and Thin Film Devices Lab', location: '1 D 206 B' },
    { name: 'FESEM-EBSD-EDS Lab', location: '1 D 206 A' },
    { name: 'Energy and Sensor Lab', location: '1 D 204' },
    { name: 'Metal Forming & Surface Engineering Lab', location: '1 E 103 B' },
    { name: 'Polymer & Nanostructures for Device Fabrication Lab', location: '1 D 304' },
    { name: 'Mechanics of Material Lab', location: '1 D 103' },
    { name: 'Nano Materials and Energy Devices Lab', location: '1 D 204 A' },
    { name: 'Thin Films and Coatings Lab', location: '1 A 104 B' },
    { name: 'Materials Research Lab', location: '1 A 206' },
    { name: 'Corrosion Engineering Lab', location: '1 E 103 A' },
    { name: 'Soft Materials Research Lab', location: '1 D 102 B' },
    { name: 'Welding Engineering Laboratory', location: 'WS 106' },
    { name: 'Materials Joining and Mechanical Testing Laboratory', location: 'WS 106' },
    { name: 'Physical Metallurgy Laboratory', location: '1 D 203 A' },
    { name: 'Non-equilibrium Advanced Materials Engineering Lab', location: '1 D 203 B' },
    { name: 'Foundry Engineering Lab', location: 'WS 102' },
    { name: 'Solidification and Nanomaterials Lab', location: 'WS 107' },
    { name: 'Solid State Ioconics Lab', location: '1 D 102 A' },
    { name: 'Mirco Structure and Texture Lab', location: '1 B 502' },
    { name: 'Advanced Mechanical and Physical Metallurgy Lab', location: '1A 104 A' },
    { name: 'Integrated Computational Materials science and Engineering Lab', location: '1 B 502' },
    { name: 'High Performance Computing Facility', location: '' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Labs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {labs.map((lab, index) => (
          <LabComponent key={index} labName={lab.name} labLocation={lab.location} />
        ))}
      </div>
    </div>
  );
};

export default BookLab;
