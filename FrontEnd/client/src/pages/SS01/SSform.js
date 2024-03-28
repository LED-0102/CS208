// A4Form.js
import "./A4Form.css"; // Import CSS file
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Navbar/Header";
// import "./ssform.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import globalUrl from "../../components/url";
// import {data} from "./data"
import SearchUserComp from "../../components/Search/search";

const SS01form = () => {
    const [tabledata, setTabledata] = useState([]);
    const [userData, setUserData] = useState({});
    const [totalCost, setTotalCost] = useState(0);
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

    const handleUserSelect = (userId, userName) => {
        console.log("aaaa", userName)
        console.log("aaaa", userId)
        setFormData({
            ...formData,
            receiver: userId
        });

        if (userName) {
            setSearchName(userName);
        } else {
            setSearchName(''); // or any default value you prefer
        }
        console.log("search+++", searchName)
    };

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

    const filterUsers = () => {
        return userData.filter(
            (user) =>
                user.username.toLowerCase().includes(searchName.toLowerCase()) &&
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
    ];
    const addRow = (e) => {
        e.preventDefault();
        // Create a new row with a unique ID and serial number
        const newRow = { id: tabledata.length + 1, sno: tabledata.length + 1 };
        // Update the state to include the new row
        setTabledata([...tabledata, newRow]);
    };

    const handleChangeTable = (event, index, key) => {
        const { value } = event.target;
        const updatedListOrders = [...tabledata];
        updatedListOrders[index][key] = value;
        setTabledata(updatedListOrders);

        // Calculate the total cost for the entire table
        let totalCost = 0;
        updatedListOrders.forEach(row => {
            const cost = parseFloat(row.cost) || 0;
            totalCost += cost;
        });

        setTotalCost(totalCost);
        setTabledata(updatedListOrders);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const listOrders = tabledata.map(row => ({
            supplier: row.supplier,
            bill: row.bill,
            and_date: row.and_date,
            item: row.item,
            quantity: row.quantity,
            con_n_con: row.con_n_con,
            unit_price: row.unit_price,
            total: row.total
        }));

        const updatedFormData = { ...formData, list_orders: listOrders };
        console.log("update form data:", updatedFormData)

        try {

            const storedCookie = document.cookie;
            console.log(storedCookie);
            // Create a custom set of headers
            const customHeaders = new Headers({
                'Content-Type': 'application/json', // You may need to adjust the content type based on your request
                'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
            });
            const headersObject = Object.fromEntries(customHeaders.entries());
            // const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
            const response = await fetch(`${globalUrl}/v1/submit/SS04`, {
                method: 'POST',
                credentials: 'include',  // Include credentials (cookies) in the request
                headers: headersObject,
                body: JSON.stringify(updatedFormData)
            });
            console.log(response)
            if (response.statusCode === 401) {
                console.log("Failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${globalUrl}/list/receiver`);
                // const response = await axios.get(`https://randomuser.me/api/`);
                // const datss=data
                // console.log("aadd",typeof(response.data))
                // console.log("aadd",typeof(data))
                setUserData(response.data);
                // console.log("dats",response.data)
                // console.log("dats++++++userData",userData)
            } catch (error) {
                setError(error);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();


        return () => {

        };
    }, []);

    return (
        <div className="maxcbackground">
            <Navbar />
            <Header />
            <div className="">
                <div className=" ml-56 my-4  print-content">
                    <form>
                        <div className="w-11/12 border border-black  light-bg mx-auto">
                            {/* //custodian section  */}
                            <div className="  px-4 py-2   ">
                                <div className="flex flex-row  justify-center  py-2 w-full ">
                                    <div className="flex-col  px-20">
                                        <table className="">
                                            <tbody>
                                                <tr>
                                                    <td className="border-none">
                                                        <label className="font-bold" htmlFor="custodian">
                                                            Name of custodian of assets:
                                                        </label>
                                                    </td>
                                                    <td className="border-none">
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
                                    <div className="flex-col px-20">
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
                                                    <td className="border-none ">
                                                        <input
                                                            type="text"
                                                            id="room_no"
                                                            name="room_no"
                                                            placeholder="room number"
                                                            value={formData.room_no}
                                                            onChange={handleChange}
                                                            className="input-field"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <span className="flex flex-col justify text-xl">
                                    <span className="font-bold ">
                                        Item purchased under buy-back (No):- Item purchase information (GeM contract orders):
                                    </span>
                                    <span>GEMC-511687721925229, 511687798475376, 511687730521965, 511687713303241, 511687711267628, 511687759904295, 511687756904666 dt. 05-12-2023.</span>
                                    <span>Please issue following items for my office use to me the bearer Mr./Ms. NA whom I authorize to receive the stores on my behalf.</span>
                                </span>
                            </div>

                            {/* table section  */}
                            <div className='p-4 ' style={{ overflowX: 'auto' }}>
                                {/* <h1>Dynamic Table</h1> */}
                                <table>
                                    <thead>
                                        <tr>
                                            <th rowspan="2">SI No.</th>
                                            <th rowspan="2">Item Name</th>
                                            <th rowspan="2">Item Specification</th>
                                            <th rowspan="2">Con/N-Con</th>
                                            {/* <th rowspan="2">Item Name and Specification</th> */}
                                            <th className="text-center" colspan="2">Quantity</th>
                                            <th rowspan="2">Total</th>
                                        </tr>
                                        <tr>
                                            {/* <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th> */}
                                            <th>Reg.</th>
                                            <th>Issued</th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tabledata.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.sno}</td>
                                                <td><input type="text" id={`item_name_${index}`} name={`item_name_${index}`} value={row.item_name} onChange={(e) => handleChangeTable(e, index, 'item_name')} placeholder="Item Name and Specification" className="border-2 border-black" /></td>
                                                <td><input type="text" id={`item_specification_${index}`} name={`item_specification_${index}`} value={row.item_specification} onChange={(e) => handleChangeTable(e, index, 'item_specification')} placeholder="Supplier Name" className="border-2 border-black" /> </td>
                                                <td><input type="text" id={`con_n_con_${index}`} name={`con_n_con_${index}`} value={row.con_n_con} onChange={(e) => handleChangeTable(e, index, 'con_n_con')} placeholder="Con/Non-Con" className="border-2 border-black" /></td>
                                                {/* <td><input type="text" id={`and_date_${index}`} name={`and_date_${index}`} value={row.and_date} onChange={(e) => handleChangeTable(e, index, 'and_date')} placeholder="and_date No & Date" className="border-2 border-black" /></td> */}
                                                <td><input type="text" id={`required_number_${index}`} name={`required_number_${index}`} value={row.required_number} onChange={(e) => handleChangeTable(e, index, 'required_number')} placeholder="Qty" className="border-2 border-black" /></td>
                                                <td><input type="text" id={`issued_${index}`} name={`issued_${index}`} value={row.issued} onChange={(e) => handleChangeTable(e, index, 'issued')} placeholder="Unit Price" className="border-2 border-black" /></td>
                                                <td><input type="text" id={`cost_${index}`} name={`cost_${index}`} value={row.cost} onChange={(e) => handleChangeTable(e, index, 'cost')} placeholder="Total" className="border-2 border-black" /></td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="6" className="font-bold ">Total incl. GST@18%</td>
                                            <td>{totalCost}</td>
                                            {/* <td>{totalCost}</td> */}
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='flex w-full gap-80 '>
                                    {/* <div className='w-1/2 p-4'>
                                    <p className='text-2xl'>Total Amount (incl. 18% GST) :	<input type="number" id="total_amount" name="total_amount" value={formData.total_amount} onChange={handleChange} className="border-2 border-black" /></p>
                                </div> */}
                                    <div>
                                        <button onClick={addRow} id="addarowbtn">Add Row</button></div>
                                </div>
                            </div>
                            <div className='flex flex-wrap w-full px-4   '>
                                <div className='flex-col w-1/2 px-12 py-2'>
                                    <div className='flex flex-row justify-center text-xl font-semibold'>
                                        <h2>Issue Approved</h2>
                                    </div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><label className='font-bold' htmlFor="issued_approved_name">Name :</label></td>
                                                <td>
                                                    {/* <!-- <span>Dr. Nisheeth K. Prasad</span> --> */}
                                                    <input type="text" id="issued_approved_name" name="issued_approved_name" value={formData.issued_approved_name} placeholder='issued_approved_name ' onChange={handleCustodianChange} className="border-2 border-black" /></td>
                                            </tr>
                                            <tr>
                                                <td><label className='font-bold' htmlFor="issued_approved_date">Date :</label></td>
                                                <td>
                                                    {/* <!-- <span>MEMS</span> --> */}
                                                    <input type="text" id="issued_approved_date" name="issued_approved_date" value={formData.issued_approved_date} placeholder='issued_approved_date ' onChange={handleChange} className="border-2 border-black" /></td>
                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                                <div className='flex-col w-1/2 px-12 py-2'>
                                    <div className='flex flex-row justify-center text-xl font-semibold'>
                                        <h2>Items Recieved</h2>
                                    </div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><label className='font-bold' htmlFor="items_received_name">Name:</label></td>
                                                <td>
                                                    {/* <!-- <span>Dr. Nisheeth K. Prasad</span> --> */}
                                                    <input type="text" id="items_received_name" name="items_received_name" value={formData.items_received_name} placeholder='items_received_name name' onChange={handleChange} className="border-2 border-black" /></td>
                                            </tr>
                                            <tr>
                                                <td><label className='font-bold' htmlFor="items_received_date">Date :</label></td>
                                                <td>
                                                    {/* <!-- <span>MEMS</span> --> */}
                                                    <input type="text" id="items_received_date" name="items_received_date" value={formData.items_received_date} placeholder='items_received_date name' onChange={handleChange} className="border-2 border-black" /></td>
                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                                <div className='flex-col w-1/2 px-12 py-2'>
                                    <div className='flex flex-row justify-center text-xl font-semibold'>
                                        <h2>Items Issued</h2>
                                    </div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><label className='font-bold' htmlFor="items_issued_name">Name  :</label></td>
                                                <td>
                                                    {/* <!-- <span>Dr. Nisheeth K. Prasad</span> --> */}
                                                    <input type="text" id="items_issued_name" name="items_issued_name" value={formData.items_issued_name} placeholder='items_issued_name name' onChange={handleChange} className="border-2 border-black" /></td>
                                            </tr>
                                            <tr>
                                                <td><label className='font-bold' htmlFor="items_issued_date">Date :</label></td>
                                                <td>
                                                    {/* <!-- <span>MEMS</span> --> */}
                                                    <input type="text" id="items_issued_date" name="items_issued_date" value={formData.items_issued_date} placeholder='items_issued_date name' onChange={handleChange} className="border-2 border-black" /></td>
                                            </tr>


                                        </tbody>
                                    </table>

                                </div>
                                <div className='flex-col w-1/2 px-12 py-2'>
                                    <div className='flex flex-row justify-center text-xl font-semibold'>
                                        <h2>Actioned in Ledger</h2>
                                    </div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><label className='font-bold' htmlFor="action_ledger_name">Name:</label></td>
                                                <td>
                                                    {/* <!-- <span>Dr. Nisheeth K. Prasad</span> --> */}
                                                    <input type="text" id="action_ledger_name" name="action_ledger_name" value={formData.action_ledger_name} placeholder='action_ledger_name name' onChange={handleChange} className="border-2 border-black" /></td>
                                            </tr>
                                            <tr>
                                                <td><label className='font-bold' htmlFor="action_ledger_date">Date :</label></td>
                                                <td>
                                                    {/* <!-- <span>MEMS</span> --> */}
                                                    <input type="text" id="action_ledger_date" name="action_ledger_date" value={formData.action_ledger_date} placeholder='action_ledger_date name' onChange={handleChange} className="border-2 border-black" /></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>

                            <div className='p-4'>
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
                                                        onClick={() => handleUserSelect(user.id, user.username)}>

                                                        <td className="w-1/3 border-4 p-4 bg-white subpixel-antialiased text-teal-500 ">
                                                            {user.username}
                                                        </td>
                                                        <td className="w-1/3 border-4 p-4 bg-white text-center text-cyan-500">
                                                            {user.designation}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}


                                </div>


                            </div>
                            <div></div>
                            <div className='flex justify-center w-full mb-8'>
                                <button onClick={(e) => handleSubmit(e)} >Submit</button>
                            </div>

                        </div>
                        <div className="w-11/12 border border-black my-4 light-bg mx-auto">
                            <div>
                                Acceptance/Rejection Certificate
                            </div>
                            <div className="p-4">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>1. Supplier's Name & Address:</th>
                                            <td><textarea></textarea></td>
                                            <th>2. PO No. & Date:</th>
                                            <td><textarea></textarea></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>3. Budget Head of Account:</th>
                                            <td><input type='text' /></td>
                                            <th>4. Challan No. & Date:</th>
                                            <td><input type='text' /></td>
                                        </tr>
                                        <tr>
                                            <th>5. Invoice No. & Date:</th>
                                            <td><textarea></textarea></td>
                                            <th>6. Invoice amount:</th>
                                            <td><input type='text' /></td>
                                        </tr>
                                        <tr>
                                            <th>7. Project No. (if applicable):</th>
                                            <td><input type='text' /></td>
                                            <th>8. Name of Indenter:</th>
                                            <td><input type='text' /></td>
                                        </tr>
                                    </tbody>
                                </table>




                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SS01form;
