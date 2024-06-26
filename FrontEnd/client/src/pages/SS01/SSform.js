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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const SS01form = () => {
    const [tabledata, setTabledata] = useState([]);
    const [userData, setUserData] = useState({});
    const [totalCost, setTotalCost] = useState(0);
    const [searchName, setSearchName] = useState("");
    const [error, setError] = useState("");
    const [selectedDesignation, setSelectedDesignation] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // StoreNo: "",
        // financialyear: "",
        // reqdate: "",
        note: "",
        receiver: 0,
        submitter: 0,
        date: "",
        name_of_custodian: "",
        department: "",
        location: "",
        // contact: "",
        // items_receiving_date: "",
        designation: "",
        inventory_no: "",
        room_no: "",
        // email: "",
        item_purchase_info: "",
        name_head: "",
        list_orders: [],
        total_amount: 0,
        supplier_name_address: "",
        po_no_date:"",
        budget_head_account:"",
        challan_no_date:"",
        invoice_no_date:"",
        invoice_amount:0,
        project_no:"",
        name_indenter: "",
        sign_date_indenter: "",
        sign_date_head: "",
        // issued_approved_name: "",
        // issued_approved_date: "", // Assuming the date could be null
        // items_received_name: "",
        // items_received_date: "",
        // items_issued_name: "",
        // items_issued_date: "", 
        // action_ledger_name: "",
        // action_ledger_date: "", 
        approval_status: "Pending",
        reason:""
    });

 
    const [info,setInfo] = useState({})
    useEffect(() => {
      const fetchData = async () => {
          try {
              
        // Create a custom set of headers
              const token = localStorage.getItem('token');
              const response = await fetch(`${globalUrl}/v1/profile`, {
                  method: 'GET',
                  headers: {
                    
                    'token': token

                  },
                });
              
            const responseData = await response.json();
            console.log('Parsed JSON response:', (responseData));
            setInfo(responseData)
                if (response.statusCode === 401) {
                  console.log("Failed");
                }
              } catch (error) {
                console.error("Error:", error);
              }
      };
  
      fetchData();
  },[]); 


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
        const newFormData = { ...formData, name_of_custodian: event.target.value };
        // Assuming you're using the JavaScript Date object
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1
            }/${currentDate.getDate()}`;
        newFormData.name_indenter = event.target.value; // Assigning custodian's value to name_indenter
        newFormData.sign_date_indenter = formattedDate; // Assigning current date to sign_date_indenter
        newFormData.date=formattedDate;

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

    const handleSubmit = async (e,  onSuccessRedirect,
        onFailureRedirect) => {
        e.preventDefault();
        // Calculate total cost
        const totalAmount = parseFloat(totalCost) || 0;
        const updatedFormData1 = { ...formData, total_amount: totalAmount };

        const listOrders = tabledata.map(row => ({
            si: parseInt(row.sno),
            item_name: row.item_name,
            item_specification: row.item_specification,
            con_n_con: row.con_n_con,
            // and_date: row.and_date,
            required_number: parseInt(row.required_number),
            issued: row.issued,
            cost: parseInt(row.cost)
        }));

        const updatedFormData = { ...formData, list_orders: listOrders };
        console.log("update form data:", updatedFormData)

        try {

         
      const token = localStorage.getItem('token');
      console.log("Token submit SS01: ", token);
            // const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
            const response = await fetch(`${globalUrl}/v1/submit/SS01`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'token': token
                },
                body: JSON.stringify(updatedFormData)
              });
            console.log(response)
         
      if (response.status === 200) {
        toast.success('Data submitted successfully', {
          onClose: () => onSuccessRedirect() // Redirect to success page after toast is fully closed
        });
      } else if (response.status === 401 || response.status === 400 ) {
        toast.error('Failed to submit data', {
          onClose: () => onFailureRedirect() // Redirect to failure page after toast is fully closed
        });
      }else{
        toast.error('Failed to submit data', {
          onClose: () => onFailureRedirect() // Redirect to failure page after toast is fully closed
        });
      }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
            console.log("Token receiver: ", token);
            const response = await fetch(`${globalUrl}/list/receiver`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'token': token
              }
            });
            const responseData = await response.json();
    
            // const response = await axios.get(`https://randomuser.me/api/`);
            // const datss=data
            // console.log("aadd",typeof(response.data))
            // console.log("aadd",typeof(data))
            setUserData(responseData);
            // console.log("dats",response.data)
            // console.log("dats++++++userData",userData)
          } catch (error) {
            setError(error);
          } finally {
            // setLoading(false);
          }
        };
    
        fetchData().then(r => console.log("Fetched and set"));
    
    
        return () => {
    
        };
      }, []);

    const handleSuccessRedirect = () => {
        navigate("/");
      };
    
      const handleFailureRedirect = () => {
        navigate("/SS01");
      };

      useEffect(() => {
        console.log("information", info);
        // Update the formData state with info data
        setFormData(prevState => ({
          ...prevState,
          name_of_applicant: info.username,
          designation: info.designation,
          department: info.department,
          location:info.location,
          contact:info.contact_number,
          email:info.email,
          room_no:info.room,
        }));
        console.log(formData)
      }, [info]);

    return (
        <div className="maxcbackground">
          
          
            <div className="">
                <div className="my-4  print-content">
                    <form>
                        <div className="w-11/12 border border-black  light-bg mx-auto">
                            {/* //custodian section  */}
                            <div className="  px-4 py-2   ">
                                <div className="flex flex-col  md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-center  py-2 w-full ">
                                    <div className="  px-20">
                                        <table className="">
                                            <tbody>
                                                <tr>
                                                    <td className="border-none">
                                                        <label className="font-bold" htmlFor="name_of_custodian">
                                                            Name of custodian of assets:
                                                        </label>
                                                    </td>
                                                    <td className="border-none">
                                                        {/* <!-- <span>Dr. Nisheeth K. Prasad</span> --> */}
                                                        <input
                                                            type="text"
                                                            id="name_of_custodian"
                                                            name="name_of_custodian"
                                                            value={formData.name_of_custodian}
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
                                                            defaultValue={formData.department}
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
                                                            defaultValue={formData.location}
                                                            onChange={handleChange}
                                                        // className="border-2 border-black"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className=" px-20">
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
                                                            defaultValue={formData.designation}
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
                                                            defaultValue={formData.room_no}
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
                                    {/* <span>GEMC-511687721925229, 511687798475376, 511687730521965, 511687713303241, 511687711267628, 511687759904295, 511687756904666 dt. 05-12-2023.</span> */}
                                    <textarea
                                        placeholder="Fill the item puerchase information"
                                        type="text"
                                        id="item_purchase_info"
                                        name="item_purchase_info"
                                        value={formData.item_purchase_info}
                                        onChange={handleChange}
                                        className="input-field"
                                    ></textarea>
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
                                                <td><input type="number" id={`required_number_${index}`} name={`required_number_${index}`} value={row.required_number} onChange={(e) => handleChangeTable(e, index, 'required_number')} placeholder="Qty" className="border-2 border-black" /></td>
                                                <td><input type="text" id={`issued_${index}`} name={`issued_${index}`} value={row.issued} onChange={(e) => handleChangeTable(e, index, 'issued')} placeholder="Unit Price" className="border-2 border-black" /></td>
                                                <td><input type="number" id={`cost_${index}`} name={`cost_${index}`} value={row.cost} onChange={(e) => handleChangeTable(e, index, 'cost')} placeholder="Total" className="border-2 border-black" /></td>
                                            </tr>
                                        ))}
                                        <tr>

                                            <td colSpan="6" className="font-bold text-right ">Total incl. GST@18%</td>
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
                                            {/* supplier_name_address */}
                                            <td><textarea
                                                placeholder="Fill the Supplier's Name & Address"
                                                type="text"
                                                id="supplier_name_address"
                                                name="supplier_name_address"
                                                value={formData.supplier_name_address}
                                                onChange={handleChange}
                                                className="input-field"></textarea></td>
                                            <th>2. PO No. & Date:</th>
                                            <td><textarea
                                            placeholder="Fill the PO No. & Date"
                                            type="text"
                                            id="po_no_date"
                                            name="po_no_date"
                                            value={formData.po_no_date}
                                            onChange={handleChange}
                                            className="input-field"
                                            ></textarea></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>3. Budget Head of Account:</th>
                                            <td><input 
                                            placeholder=" Budget Head of Account"
                                            type="text"
                                            id="budget_head_account"
                                            name="budget_head_account"
                                            value={formData.budget_head_account}
                                            onChange={handleChange}
                                            className="input-field" /></td>
                                            <th>4. Challan No. & Date:</th>
                                            <td><input 
                                             placeholder=" Challan No. & Date"
                                             type="text"
                                             id="challan_no_date"
                                             name="challan_no_date"
                                             value={formData.challan_no_date}
                                             onChange={handleChange}
                                             className="input-field" /></td>
                                        </tr>
                                        <tr>
                                            <th>5. Invoice No. & Date:</th>
                                            <td><textarea
                                            placeholder=" Invoice No. & Date"
                                            type="text"
                                            id="invoice_no_date"
                                            name="invoice_no_date"
                                            value={formData.invoice_no_date}
                                            onChange={handleChange}
                                            className="input-field"
                                            ></textarea></td>
                                            <th>6. Invoice amount:</th>
                                            <td><input 
                                            placeholder=" Invoice amount"
                                            type="number"
                                            id="invoice_amount"
                                            name="invoice_amount"
                                            value={formData.invoice_amount}
                                            onChange={handleChange}
                                            className="input-field"/></td>
                                        </tr>
                                        <tr>
                                            <th>7. Project No. (if applicable):</th>
                                            <td><input 
                                            placeholder="Project No."
                                            type="text"
                                            id="project_no"
                                            name="project_no"
                                            value={formData.project_no}
                                            onChange={handleChange}
                                            className="input-field" /></td>
                                            <th>8. Name of Indenter:</th>
                                            <td><input 
                                            placeholder="Name of Indenter"
                                            type="text"
                                            id="name_indenter"
                                            name="name_indenter"
                                            value={formData.name_indenter}
                                            onChange={handleChange}
                                            className="input-field"/></td>
                                        </tr>
                                    </tbody>
                                </table>




                            </div>

                        </div>
                        <div className='flex justify-center w-full mb-8'>
                        <button onClick={(e) => handleSubmit(e, handleSuccessRedirect, handleFailureRedirect)}>Submit</button>
                        <ToastContainer  />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SS01form;
