// A4Form.js
import "./A4Form.css"; // Import CSS file
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Navbar/Header";
import { Input } from "@nextui-org/react";
// import "./ssform.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import globalUrl from "../../components/url";
// import {data} from "./data"
import SearchUserComp from "../../components/Search/search";

const SS01form = () => {
    const [userData, setUserData] = useState({});
    const [searchName, setSearchName] = useState("");
    const [error, setError] = useState("");
    const [selectedDesignation, setSelectedDesignation] = useState("");
    const [formData, setFormData] = useState({
        // StoreNo: "",
        // financialyear: "",
        // reqdate: "",
        custodian: "",
        department: "",
        location: "",
        contact: "",
        items_receiving_date: "",
        designation: "",
        inventory_no: "",
        room_no: "",
        email: "",
        total_amount: "",
        list_orders: [],
        name_indenter: "",
        sign_date_indenter: "",
        name_head: "",
        sign_date_head: "",
        issued_approved_name: "",
        issued_approved_date: "", // Assuming the date could be null
        items_received_name: "",
        items_received_date: "",
        items_issued_name: "",
        items_issued_date: "", // Assuming the date could be null
        action_ledger_name: "",
        action_ledger_date: "", // Assuming the date could be null
        receiver: "",
        submitter: 0,
        note: "",
        approval_status: "",
        date: "",
    });

    const handleCustodianChange = (event) => {
        const newFormData = { ...formData, custodian: event.target.value };
        // Assuming you're using the JavaScript Date object
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1
            }/${currentDate.getDate()}`;
        newFormData.name_indenter = event.target.value; // Assigning custodian's value to name_indenter
        newFormData.sign_date_indenter = formattedDate; // Assigning current date to sign_date_indenter

        newFormData.name_head = "";
        newFormData.sign_date_head = "";
        setFormData(newFormData);
    };

    const handleChange = (evt) => {
        const changedField = evt.target.name;
        const newValue = evt.target.value;

        setFormData((currData) => {
            currData[changedField] = newValue;
            return {
                ...currData,
            };
        });
    };

    return (
        <div>
            <Navbar />
            <Header />

            {/* <div className="container print-content">
        <h1>My A4 Sized Form</h1>
        <form>
         
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <br />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <br />
       
          <button type="submit">Submit</button>
        </form>
      </div> */}
            <div className="ml-56 ">
                <form>
                    <div className="  px-4 py-2 print-content  ">
                        <div className="flex flex-row  justify-center px-4 py-2 w-full ">
                            <div className="flex-col  px-12">
                                <table className="bg-white border-collapse">
                                    <tbody>
                                        <tr>
                                            <td className="border-none">
                                                <label className="font-bold" htmlFor="custodian">
                                                    Name of custodian of assets:
                                                </label>
                                            </td>
                                            <td  className="border-none">
                                                {/* <!-- <span>Dr. Nisheeth K. Prasad</span> --> */}
                                                <input
                                                    type="text"
                                                    id="custodian"
                                                    name="custodian"
                                                    value={formData.custodian}
                                                    placeholder="custodian name"
                                                    onChange={handleCustodianChange}
                                                    // className="border-2 border-black"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-none">
                                                <label className="font-bold" htmlFor="department">
                                                    Department/Project No.:
                                                </label>
                                            </td>
                                            <td className="border-none">
                                                {/* <!-- <span>MEMS</span> --> */}
                                                <input
                                                    type="text"
                                                    id="department"
                                                    name="department"
                                                    value={formData.department}
                                                    placeholder="department name"
                                                    onChange={handleChange}
                                                    // className="border-2 border-black"
                                                />
                                            </td >
                                        </tr>
                                        <tr>
                                            <td className="border-none">
                                                <label className="font-bold" htmlFor="location">
                                                    Location:
                                                </label>
                                            </td>
                                            <td className="border-none">
                                                <input
                                                    type="text"
                                                    id="location"
                                                    name="location"
                                                    placeholder="location"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    // className="border-2 border-black"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex-col px-12">
                                <table>
                                    <thead>
                                        <tr>
                                            {/* Table headers */}
                                            {/* Fill the Info */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border-none">
                                                <label className="font-bold" htmlFor="designation">
                                                    Designation:
                                                </label>
                                            </td>
                                            <td className="border-none">
                                                <input
                                                    type="text"
                                                    id="designation"
                                                    name="designation"
                                                    placeholder="designation"
                                                    value={formData.designation}
                                                    onChange={handleChange}
                                                    // className="border-2 border-black"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-none"> 
                                                <label className="font-bold" htmlFor="inventory_no">
                                                    Inventory No:
                                                </label>
                                            </td>
                                            <td className="border-none">
                                                <input
                                                    type="number"
                                                    id="inventory_no"
                                                    name="inventory_no"
                                                    placeholder="inventory no"
                                                    value={formData.inventory_no}
                                                    onChange={handleChange}
                                                    // className="border-2 border-black"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-none">
                                                <label className="font-bold" htmlFor="room_no">
                                                    Room No:
                                                </label>
                                            </td>
                                            <td className="border-none">
                                                <input
                                                    type="text"
                                                    id="room_no"
                                                    name="room_no"
                                                    placeholder="room number"
                                                    value={formData.room_no}
                                                    onChange={handleChange}
                                                    // className="border-2 border-black"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <span className="flex flex-col justify">
                            <span className="font-bold ">
                            Item purchased under buy-back (No):- Item purchase information (GeM contract orders):
                            </span>
                            <span>GEMC-511687721925229, 511687798475376, 511687730521965, 511687713303241, 511687711267628, 511687759904295, 511687756904666 dt. 05-12-2023.</span>
                            <span>Please issue following items for my office use to me the bearer Mr./Ms. NA whom I authorize to receive the stores on my behalf.</span>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SS01form;