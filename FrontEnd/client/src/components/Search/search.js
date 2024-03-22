import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {data} from './data'

const Search = () => {

    const [searchName, setSearchName] = useState("");
    const [selectedDesignation, setSelectedDesignation] = useState("");

    console.log("reqdata+++",data)

    const handleUserSelect = (userId,userName) => {
        console.log("aaaa",userName)
        console.log("aaaa",userId)
        // setFormData({
        //   ...formData,
        //   receiver: userId
        // });
      
        if (userName) {
          setSearchName(userName);
        } else {
          setSearchName(''); // or any default value you prefer
        }
        console.log("search+++",searchName)
      };
    

    const filterUsers = () => {
        return data.filter(
          (user) =>
            user.name.toLowerCase().includes(searchName.toLowerCase()) &&
            user.designation
              .toLowerCase()
              .includes(selectedDesignation.toLowerCase())
            //   &&
            // user.roll_no.toLowerCase().includes(searchRollNo.toLowerCase())
        );
      };
    const designation = [
    "HOD",
    "Staff",
    "Professor",
    "Office",
    "Student",
    "Human Resources",
  ];

  return (
    <div>
         <div className="flex flex-col lg:flex-row mb-4 lg:mb-8 font-custom">
        <div className="mb-4 lg:mb-0 lg:mr-4 lg:w-full">
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="p-2 border w-full rounded-md search-input hover:bg-gray-200"
          />
        </div>
        <div className="mb-4 lg:mb-0 lg:mr-4 lg:w-full">
          <select
            value={selectedDesignation}
            onChange={(e) => setSelectedDesignation(e.target.value)}
            className="p-2 border w-full rounded-md text-white"
            style={{ backgroundColor: "rgb(30 41 59)" }}
          >
            <option value="">Select Department</option>
            {designation.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
        </div>
        {searchName.toLowerCase() !== '' && (
        <table className="w-full lg:w-full table-auto  border-collapse font-custom">
        <thead>
          <tr>
            <th className="w-1/3 border-4 p-2 text-center font-bold text-purple-900">
              Name
            </th>
            <th className="w-1/3 border-4 p-2 text-center font-bold text-purple-900">
              Designation
            </th>
          </tr>
        </thead>
        <tbody>
          {filterUsers().map((user, index) => (
            <tr
              key={user.id}
              className="bg-slate-950 hover:bg-slate-800 transition-all cursor-pointer"
              onClick={() => handleUserSelect(user.id,user.name)}>

              <td className="w-1/3 border-4 p-4 bg-white subpixel-antialiased text-teal-500 ">
                {user.name}
              </td>
              <td className="w-1/3 border-4 p-4 bg-white text-center text-cyan-500">
                {user.designation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        )}
        
        {/* <p className="text-black">hwlooooooooooooooooooooooooooooooooooooooooooo</p> */}
    </div>
  );
};

export default Search;