import React, { useState,useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Navbar/Header';
// import "./ssform.css";
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import globalUrl from "../../components/url";
import DisplayPendingForm from './DisplayPendingForm';


// import React from 'react'

const SpecificDisplayPendingForm = () => {
  const { formName,formId } = useParams();

  let formComponent;

  switch(formName){
    case 'SS04':
      formComponent=<SS04form formId={formId} formName={formName}/>;
      break;
    case 'SS01':
      formComponent=<SS01form formId={formId} formName={formName}/>;
      break;
    case 'MM04':
      formComponent=<MM04form formId={formId} formName={formName}/>;
      break;
    case 'Furniture':
      formComponent=<Furnitureform formId={formId} formName={formName}/>;
      break;
    default:
      formComponent=<div>Unkmown Form</div>;
      break;
  }
  return (
    <div>{formComponent}</div>
  )
}

// export default SpecificDisplayPendingForm

const SS04form = () => {
  const [tabledata, setTabledata] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  const { formName,formId } = useParams();
  // const formId = id;

  

  const addRow = (e) => {
    // e.preventDefault();
    // // Create a new row with a unique ID and serial number
    // const newRow = { id: tabledata.length + 1, sno: tabledata.length + 1 };
    // // Update the state to include the new row
    // setTabledata([...tabledata, newRow]);
  };

  const [userData,setUserData]=useState({})
  const [searchName, setSearchName] = useState("");
  const [error, setError] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [formData, setFormData] = useState({
    // StoreNo: "",
    // financialyear: "",
    // reqdate: "",
    // note:"",
    // receiver:0,
    // submitter:0,
    // date:"",
    // custodian: "",
    // department: "",
    // location: "",
    // contact: "",
    // designation: "",
    // inventory_no: "",
    // room_no: "",
    // email: "",
    // items_receiving_date: "",
    // list_orders: [],
    // total_amount: 0,
    // name_indenter: "",
    // sign_date_indenter: "",
    // name_head: "",
    // sign_date_head: "",
    // issued_approved_name:"",
    // issued_approved_date:"", // Assuming the date could be null
    // items_received_name:"" ,
    // items_received_date:"" ,
    // items_issued_name: "",
    // items_issued_date:"", // Assuming the date could be null
    // action_ledger_name:"", 
    // action_ledger_date:"",  // Assuming the date could be null
    // approval_status:"Pending",




  });

  // const [formData, setFormData] = useState(null);

  const handleUserSelect = (userId,userName) => {
    // console.log("aaaa",userName)
    // console.log("aaaa",userId)
    // setFormData({
    //   ...formData,
    //   receiver: userId
    // });
  
    // if (userName) {
    //   setSearchName(userName);
    // } else {
    //   setSearchName(''); // or any default value you prefer
    // }
    // console.log("search+++",searchName)
  };

  const handleCustodianChange = (event) => {
    // const newFormData = { ...formData, custodian: event.target.value };
    // // Assuming you're using the JavaScript Date object
    // const currentDate = new Date();
    // const formattedDate = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`;
    // newFormData.name_indenter = event.target.value; // Assigning custodian's value to name_indenter
    // newFormData.sign_date_indenter = formattedDate; // Assigning current date to sign_date_indenter

    // newFormData.name_head = "";
    // newFormData.sign_date_head = "";
    // setFormData(newFormData);
  };



  const handleChange = (evt) => {
    // const changedField = evt.target.name;
    // const newValue = evt.target.value;

    // setFormData((currData) => {
    //   currData[changedField] = newValue;
    //   return {
    //     ...currData,
    //   };
    // });
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

const handleChangeTable = (event, index, key) => {
//   const { value } = event.target;
//   const updatedListOrders = [...tabledata];
//   updatedListOrders[index][key] = value;
//   setTabledata(updatedListOrders);

//   // Calculate the total cost for the entire table
//   let totalCost = 0;
//   updatedListOrders.forEach(row => {
//       const cost = parseFloat(row.total) || 0;
//       totalCost += cost;
//   });

//   setTotalCost(totalCost);
//   setTabledata(updatedListOrders);
};

  const handleSubmit = async (e) => {
//     e.preventDefault();

//     const totalAmount = parseFloat(totalCost) || 0;
//     const updatedFormData1 = { ...formData, total_amount: totalAmount };


//     const listOrders = tabledata.map(row => ({
//       supplier: row.supplier,
//       bill: row.bill,
//       and_date: row.and_date,
//       item: row.item,
//       quantity: row.quantity,
//       con_n_con: row.con_n_con,
//       unit_price: row.unit_price,
//       total: row.total
//     }));

//     const updatedFormData = { ...formData, list_orders: listOrders };
//     console.log("update form data:", updatedFormData)

//     try {

//       const storedCookie = document.cookie;
//       console.log(storedCookie);
// // Create a custom set of headers
//       const customHeaders = new Headers({
//         'Content-Type': 'application/json', // You may need to adjust the content type based on your request
//         'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
//       });
//       const headersObject = Object.fromEntries(customHeaders.entries());
//       // const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
//       const response = await fetch(`${globalUrl}/v1/${formName}/${formId}`, {
//         method: 'GET',
//         credentials: 'include',  // Include credentials (cookies) in the request
//         headers: headersObject,
//         // body: JSON.stringify(updatedFormData)
//       });
//       console.log(response)
//       if (response.statusCode === 401) {
//         console.log("Failed");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const storedCookie = document.cookie;
            console.log(storedCookie);
      // Create a custom set of headers
            const customHeaders = new Headers({
              'Content-Type': 'application/json', // You may need to adjust the content type based on your request
              'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
            });
            const headersObject = Object.fromEntries(customHeaders.entries());
  
            //  const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
            const response = await fetch(`${globalUrl}/v1/${formName}/${formId}`, {
                method: 'GET',
                credentials: 'include',  // Include credentials (cookies) in the request
                headers: headersObject,
                // body: JSON.stringify(updatedFormData)
              });
            //   console.log(response)
            // console.log("aadd",typeof(data))
            // setPendingFormData(response.data);
            // console.log("aadd",typeof(pendingFormData))
            // console.log("aadd",pendingFormData)
            // console.log("aadd++++",response)
               // Parsing JSON response
const responseData = await response.json();
// console.log('Parsed JSON response:', typeof(responseData));
console.log('Parsed JSON response:', (responseData));
setFormData(responseData);
setTabledata(responseData.list_orders)
            //   console.log()
              if (response.statusCode === 401) {
                console.log("Failed");
              }
            } catch (error) {
              console.error("Error:", error);
            }
    };

    fetchData();


    return () => {

    };
}, []);

console.log("formData++++",formData)

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
    <div>
      {/* <div></div> */}
      <div className='border-2 border-black h-full'>
        <form>
          <div className='flex w-full p-4 '>
            <div className='w-2/3'>IITI logo and header left</div>
            <div>
              <div className=' border-2 border-black'>
              
              </div>

            </div>
          </div>
          <div className=' w-full px-4 py-2  '>
            <span className='flex justify'>
              <span className='mx-auto'>(To be prepared in duplicate. One copy will be forwarded to Finance, and one held with Store Office.)</span>
            </span>
            {/* <div className='flex w-full px-4 py-2  border-4 border-red-300'> */}
            <div className='flex w-full px-4 py-2  '>
              <div className='flex-col w-1/2 px-12'>
                <table>
                  <tbody>
                    <tr>
                      <td><label className='font-bold' htmlFor="custodian">Name of custodian of assets :</label></td>
                      <td>
                        {/* <!-- <span>Dr. Nisheeth K. Prasad</span> --> */}
                        <input type="text" id="custodian" name="custodian" value={formData.custodian} placeholder='custodian name' onChange={handleCustodianChange} className="border-2 border-black" readOnly /></td>
                    </tr>
                    <tr>
                      <td><label className='font-bold' htmlFor="department">Department/Project No. :</label></td>
                      <td>
                        {/* <!-- <span>MEMS</span> --> */}
                        <input type="text" id="department" name="department" value={formData.department} placeholder='department name' onChange={handleChange} className="border-2 border-black" /></td>
                    </tr>
                    <tr>
                      <td><label className='font-bold' htmlFor="location">Location :</label></td>
                      <td><input type="text" id="location" name="location" placeholder='location' value={formData.location} onChange={handleChange} className="border-2 border-black" /></td>
                    </tr>
                    <tr>
                      <td><label className='font-bold' htmlFor="contact">Contact No :</label></td>
                      <td><input type="number" id="contact" name="contact" placeholder='contact' value={formData.contact} onChange={handleChange} className="border-2 border-black" /></td>
                    </tr>
                    <tr>
                      <td><label className='font-bold' htmlFor="items_receiving_date">Item Receiving Date: </label></td>
                      <td><input type="date" id="items_receiving_date" name="items_receiving_date" placeholder='date' value={formData.items_receiving_date} onChange={handleChange} className="border-2 border-black" /></td>
                    </tr>
                  </tbody>
                </table>

              </div>
              <div className='flex-col w-1/2 px-12'>
                <table>
                  <thead>
                    <tr>
                      {/* Table headers */}
                      {/* Fill the Info */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><label className='font-bold' htmlFor='designation'>Designation :</label></td>
                      <td><input type="text" id="designation" name="designation" placeholder='designation' value={formData.designation} onChange={handleChange} className="border-2 border-black" /></td>
                    </tr>
                    <tr>
                      <td><label for="inventory_no" htmlFor='inventory_no'>Inventory No :</label></td>
                      <td><input type="number" id="inventory_no" name="inventory_no" value={formData.inventory_no} onChange={handleChange} class="border-2 border-black" /></td>
                    </tr>
                    <tr>
                      <td><label className='font-bold' htmlFor='room_no'>Room No :</label></td>
                      <td><input type="text" id="room_no" name="room_no" placeholder='room number' value={formData.room_no} onChange={handleChange} className="border-2 border-black" /></td>
                    </tr>
                    <tr>
                      <td><label className='font-bold' htmlFor='email'>Email id :</label></td>
                      <td><input type="email" id="email" name="email" placeholder='email' value={formData.email} onChange={handleChange} className="border-2 border-black" /></td>
                    </tr>
                  </tbody>
                </table>


              </div>
            </div>
            <span className='flex justify'>
              <span className='mx-auto '>If Item purchased under buy-back (No) & Item purchase information GeM Contract No.: DP</span>

            </span>

          </div>
          <div className='p-4 ' style={{ overflowX: 'auto' }}>
            {/* <h1>Dynamic Table</h1> */}
            <table>
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Name of Supplier </th>
                  <th>Bill No</th>
                  <th>Date</th>
                  <th>Item Name and Specification</th>
                  <th>Qty</th>
                  <th>Con/Non-Con</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {tabledata.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sno}</td>
                    <td><input type="text" id={`supplier_${index}`} name={`supplier_${index}`} value={row.supplier} onChange={(e) => handleChangeTable(e, index, 'supplier')} placeholder="Supplier Name" className="border-2 border-black" /></td>
                    <td><input type="text" id={`bill${index}`} name={`bill${index}`} value={row.bill} onChange={(e) => handleChangeTable(e, index, 'bill')} placeholder="Bill No & Date" className="border-2 border-black" /></td>
                    <td><input type="text" id={`and_date_${index}`} name={`and_date_${index}`} value={row.and_date} onChange={(e) => handleChangeTable(e, index, 'and_date')} placeholder="and_date No & Date" className="border-2 border-black" /></td>
                    <td><input type="text" id={`item_${index}`} name={`item_${index}`} value={row.item} onChange={(e) => handleChangeTable(e, index, 'item')} placeholder="Item Name and Specification" className="border-2 border-black" /></td>
                    <td><input type="text" id={`quantity_${index}`} name={`quantity_${index}`} value={row.quantity} onChange={(e) => handleChangeTable(e, index, 'quantity')} placeholder="Qty" className="border-2 border-black" /></td>
                    <td><input type="text" id={`con_n_con_${index}`} name={`con_n_con_${index}`} value={row.con_n_con} onChange={(e) => handleChangeTable(e, index, 'con_n_con')} placeholder="Con/Non-Con" className="border-2 border-black" /></td>
                    <td><input type="text" id={`unit_price_${index}`} name={`unit_price_${index}`} value={row.unit_price} onChange={(e) => handleChangeTable(e, index, 'unit_price')} placeholder="Unit Price" className="border-2 border-black" /></td>
                    <td><input type="text" id={`total_${index}`} name={`total_${index}`} value={row.total} onChange={(e) => handleChangeTable(e, index, 'total')} placeholder="Total" className="border-2 border-black" /></td>
                  </tr>
                ))}
                <tr>

            <td colSpan="8" className="font-bold text-right ">Total incl. GST@18%</td>
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
                <button onClick={addRow}>Add Row</button></div>
            </div>
          </div>



          <div className='py-8 flex-col w-full p-4'>
            {/* Signatures section left */}
            <div className='flex flex-col gap-4'>
              <div className='flex flex-row justify-center'>
                <h2 className='text-2xl font-semibold underline decoration-solid'>CERTIFICATION BY USER DEPARTMENT</h2>
              </div>
              <p>1.	Certified that the items mentioned in the form have been inspected and found acceptable by the undersigned in accordance with the quality and quantity and specification(s) and price. </p>
              <p>2.	A demand for goods is not divided into small quantities to make piecemeal purchases to avoid the necessity of obtaining the sanction of higher authority required with reference to the estimated value of the total demand (As per GFR 2017 Rule No. 157)</p>
            </div>
            {/* <div className='flex flex-row '>
              <div>

              </div>
              <div></div>
            </div> */}
          </div>
          <div className='flex flex-wrap w-full px-4 py-2  '>
            <div className='flex-col w-1/2 px-12 py-12'>
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
            <div className='flex-col w-1/2 px-12 py-12'>
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
            <div className='flex-col w-1/2 px-12 py-12'>
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
            <div className='flex-col w-1/2 px-12 py-12'>
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
        
          {/* <div className='flex justify-center w-full mb-8'>
            <button onClick={(e) => handleSubmit(e)} >Submit</button>
          </div> */}
        </form>
      </div>




    </div>
  )
}



const SS01form = () => {
  const { formName,formId } = useParams();
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

  const handleSubmit = async (e) => {
      // e.preventDefault();
      // // Calculate total cost
      // const totalAmount = parseFloat(totalCost) || 0;
      // const updatedFormData1 = { ...formData, total_amount: totalAmount };

      // const listOrders = tabledata.map(row => ({
      //     si: parseInt(row.sno),
      //     item_name: row.item_name,
      //     item_specification: row.item_specification,
      //     con_n_con: row.con_n_con,
      //     // and_date: row.and_date,
      //     required_number: parseInt(row.required_number),
      //     issued: row.issued,
      //     cost: parseInt(row.cost)
      // }));

      // const updatedFormData = { ...formData, list_orders: listOrders };
      // console.log("update form data:", updatedFormData)

      // try {

      //     const storedCookie = document.cookie;
      //     console.log(storedCookie);
      //     // Create a custom set of headers
      //     const customHeaders = new Headers({
      //         'Content-Type': 'application/json', // You may need to adjust the content type based on your request
      //         'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
      //     });
      //     const headersObject = Object.fromEntries(customHeaders.entries());
      //     // const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
      //     const response = await fetch(`${globalUrl}/v1/submit/SS01`, {
      //         method: 'POST',
      //         credentials: 'include',  // Include credentials (cookies) in the request
      //         headers: headersObject,
      //         body: JSON.stringify(updatedFormData)
      //     });
      //     console.log(response)
      //     if (response.statusCode === 401) {
      //         console.log("Failed");
      //     }
      // } catch (error) {
      //     console.error("Error:", error);
      // }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const storedCookie = document.cookie;
            console.log(storedCookie);
      // Create a custom set of headers
            const customHeaders = new Headers({
              'Content-Type': 'application/json', // You may need to adjust the content type based on your request
              'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
            });
            const headersObject = Object.fromEntries(customHeaders.entries());
  
            //  const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
            const response = await fetch(`${globalUrl}/v1/${formName}/${formId}`, {
                method: 'GET',
                credentials: 'include',  // Include credentials (cookies) in the request
                headers: headersObject,
                // body: JSON.stringify(updatedFormData)
              });
            //   console.log(response)
            // console.log("aadd",typeof(data))
            // setPendingFormData(response.data);
            // console.log("aadd",typeof(pendingFormData))
            // console.log("aadd",pendingFormData)
            // console.log("aadd++++",response)
               // Parsing JSON response
const responseData = await response.json();
// console.log('Parsed JSON response:', typeof(responseData));
console.log('Parsed JSON response:', (responseData));
setFormData(responseData);
setTabledata(responseData.list_orders)
            //   console.log()
              if (response.statusCode === 401) {
                console.log("Failed");
              }
            } catch (error) {
              console.error("Error:", error);
            }
    };

    fetchData();


    return () => {

    };
}, []);

console.log("formData++++",formData)

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
        
        
          <div className="">
              <div className="my-4  print-content">
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
                                          type="text"
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
               
                  </form>
              </div>
          </div>
      </div>
  );
}

const MM04form=()=>{
  const { formName,formId } = useParams();
  const [userData,setUserData]=useState({})
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    note: "",
    receiver: 1,
    submitter: 1,
    quotation_no: "",
    date: "",
    requester_name: "",
    amount: 0,
    amount_tax: 0,
    amount_words: "",
    name_member: "",
    designation_member: "",
    name_convener: "",
    To_Whom: "",
    approval_status: "Pending",
    reason: "",
  });


  const [searchName, setSearchName] = useState("");
    const [selectedDesignation, setSelectedDesignation] = useState("");

    const handleUserSelect = (userId,userName) => {
      console.log("aaaa",userName)
      console.log("aaaa",userId)
      setFormData({
        ...formData,
        receiver: userId
      });
    
      if (userName) {
        setSearchName(userName);
      } else {
        setSearchName(''); // or any default value you prefer
      }
      console.log("search+++",searchName)
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
           
    const handleChange = (evt) => {
        const changedField = evt.target.name;
        let newValue = evt.target.value;
    
        setFormData((currData) => {
        if(changedField === "amount_claimed"){
            newValue=parseInt(newValue);
        }
        currData[changedField] = newValue;
        return {
            ...currData,
        };
        });
    };
      
     
      
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const dataToBeSub={...formData};
    //     const date1=new Date();
    //     const formattedDate=`${date1.getFullYear()}/${date1.getMonth()+1}/${date1.getDate()}`;
    //     dataToBeSub.date=formattedDate;

    //     try {
    
    //         const storedCookie = document.cookie;
    //         console.log(storedCookie);
    //     // Create a custom set of headers
    //         const customHeaders = new Headers({
    //             'Content-Type': 'application/json', // You may need to adjust the content type based on your request
    //             'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
    //         });
    //         const headersObject = Object.fromEntries(customHeaders.entries());
    //         const response = await fetch(`${globalUrl}/v1/submit/MM04`, {
    //             method: 'POST',
    //             credentials: 'include',  // Include credentials (cookies) in the request
    //             headers: headersObject,
    //             body: JSON.stringify(dataToBeSub)
    //         });
    //         console.log(response)
    //         if (response.statusCode === 401) {
    //             console.log("Failed");
    //         }
    //         } catch (error) {
    //         console.error("Error:", error);
    //         }
    // };
    useEffect(() => {
      const fetchData = async () => {
          try {
              const storedCookie = document.cookie;
              console.log(storedCookie);
        // Create a custom set of headers
              const customHeaders = new Headers({
                'Content-Type': 'application/json', // You may need to adjust the content type based on your request
                'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
              });
              const headersObject = Object.fromEntries(customHeaders.entries());
    
              //  const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
              const response = await fetch(`${globalUrl}/v1/${formName}/${formId}`, {
                  method: 'GET',
                  credentials: 'include',  // Include credentials (cookies) in the request
                  headers: headersObject,
                  // body: JSON.stringify(updatedFormData)
                });
              //   console.log(response)
              // console.log("aadd",typeof(data))
              // setPendingFormData(response.data);
              // console.log("aadd",typeof(pendingFormData))
              // console.log("aadd",pendingFormData)
              // console.log("aadd++++",response)
                 // Parsing JSON response
  const responseData = await response.json();
  // console.log('Parsed JSON response:', typeof(responseData));
  console.log('Parsed JSON response:', (responseData));
  setFormData(responseData);
  // setTabledata(responseData.list_orders)
              //   console.log()
                if (response.statusCode === 401) {
                  console.log("Failed");
                }
              } catch (error) {
                console.error("Error:", error);
              }
      };
  
      fetchData();
  
  
      return () => {
  
      };
  }, []);
      


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${globalUrl}/list/receiver`);
            setUserData(response.data);
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
        <div>
          <form>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
          <img src="/path-to-your-header-image.jpg" alt="Header" className="mx-auto mb-4" />
    
          <h1 className="text-3xl text-center font-bold mb-6">Certificate</h1>
          <h2 className="text-xl text-center font-bold mb-6">Purchase of Goods By Local Purchase Committee</h2>
          <h3 className="text-xl text-center font-bold mb-6">For purchase of goods valuing between
     Rs. 25,000/- (Twenty-Five Thousand Only) to Rs. 2,50,000/- (Two Lakh Fifty Thousand Only)
    </h3>
    
    
          <div className="border-t border-b py-4 mb-6">
            <p className="text-sm px-4">
            Certified that we, the members of the Purchase Committee are jointly and individually satisfied that the goods recommended for Purchase are <b>of the requisite specification and quality, priced reasonably at the prevailing market rates and the supplier recommended is reliable and competent to supply the goods in question, and it is not debarred by Department of Commerce or Ministry/ Department concerned. Accordingly, 
            we enclose the quotation no.
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="quotation_no" onChange = {handleChange} value={formData.quotation_no} required/> 
            dated <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="date" onChange = {handleChange} value={formData.date} required/> 
            of M/s. <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="requester_name" onChange = {handleChange} value={formData.requester_name} required/> for placing Purchase Order.</b>
            </p> <br/>
            <p classname="text-sm px-4">The total financial implications will be `
             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="amount" onChange = {handleChange} value={formData.amount} required/><b>
            (Inclusive of Tax @ )<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="amount_tax" onChange = {handleChange} value={formData.amount_tax} required/>
    (In Words-) <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="amount_words" onChange = {handleChange} value={formData.amount_words} required/></b>
    </p>
          </div>
    
         
    
          
          {/* <form> */}
          {/* <div className="flex items-center justify-between mb-4">
            
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name, Designation & Signature of Member 
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  name="name_member" onChange = {handleChange} required/>
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name, Designation & Signature of Member 
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="designation_member" onChange = {handleChange} required/>
            </div>
          </div>
    
          <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
                Name, Designation & Signature of Convenor
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name_convener" onChange = {handleChange} required/>
          </div> */}
          
          {/* <div className="mb-4 lg:mb-0 lg:mr-4 lg:w-full">
          <select
            value={selectedDesignation}
            onChange={(e) => setSelectedDesignation(e.target.value)}
            className="p-2 border w-full rounded-md text-white"
            style={{ backgroundColor: "rgb(10 11 19)" }}
          >
            <option value="">Select Department</option>
            {designation.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          </div> */}
          <div className=''> 
          <>
         
        <div className="mb-6">
            <p className="text-xs italic text-center">
              *The certificate is as per GFR 2017 Rule No. 155.
            </p>
          </div>

          </>
          </div>
          {/* </form> */}
          
        </div>
        </form>
        </div>
      );

}

const Furnitureform=()=>{
  const { formName,formId } = useParams();
const navigate=useNavigate();
  const [info,setInfo] = useState({})
  useEffect(() => {
    const fetchData = async () => {
        try {
            
      // Create a custom set of headers
            const customHeaders = new Headers({
              'Content-Type': 'application/json', // You may need to adjust the content type based on your request
              'Cookie': localStorage.getItem('token'), // Include the retrieved cookie in the 'Cookie' header
            });
            const headersObject = Object.fromEntries(customHeaders.entries());
            const response = await fetch(`${globalUrl}/v1/profile`, {
                method: 'GET',
                credentials: 'include',  
                headers: headersObject,
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


useEffect(() => {
  console.log("information", info);
}, [info]);


  const [userData,setUserData]=useState({})
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    note: "Sample Note",
    receiver: 0,
    submitter: 0,
    date: "",
    name_indenter: "",
    designation: "",
    discipline: "",
    budget_head: "",
    room_no: "",
    building: "",
    purpose: "",
    nature: "",
    present_availability: "",
    sign_date: "",
    approval_status: "Pending",
    reason: "",
  });
  const [searchName, setSearchName] = useState("");
    const [selectedDesignation, setSelectedDesignation] = useState("");
           
    const handleChange = (evt) => {
        const changedField = evt.target.name;
        let newValue = evt.target.value;
    
        setFormData((currData) => {
        if(changedField === "amount_claimed"){
            newValue=parseInt(newValue);
        }
        currData[changedField] = newValue;
        return {
            ...currData,
        };
        });
    };
      
      const designation = [
      "HOD",
      "Staff",
      "Professor",
      "Office",
      "Student",
      ];
      
    const handleSubmit = async (e,
      // onSuccessRedirect,
      onFailureRedirect) => {
      //   e.preventDefault();

      //   const dataToBeSub={...formData};
      //   const date1=new Date();
      //   const formattedDate=`${date1.getFullYear()}/${date1.getMonth()+1}/${date1.getDate()}`;
      //   dataToBeSub.date=formattedDate;

      //   try {
    
      //       const storedCookie = document.cookie;
      //       console.log(storedCookie);
      //   // Create a custom set of headers
      //       const customHeaders = new Headers({
      //           'Content-Type': 'application/json', // You may need to adjust the content type based on your request
      //           'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
      //       });
      //       const headersObject = Object.fromEntries(customHeaders.entries());
      //       const response = await fetch(`${globalUrl}/v1/submit/Furniture`, {
      //           method: 'POST',
      //           credentials: 'include',  // Include credentials (cookies) in the request
      //           headers: headersObject,
      //           body: JSON.stringify(dataToBeSub)
      //       });
      //       console.log(response)
      //       if (response.status === 200) {
      //         toast.success('Data submitted successfully', {
      //           onClose: () => onSuccessRedirect() // Redirect to success page after toast is fully closed
      //         });
      //       } else if (response.status === 401 || response.status === 400 ) {
      //         toast.error('Failed to submit data', {
      //           onClose: () => onFailureRedirect() // Redirect to failure page after toast is fully closed
      //         });
      //       }else{
      //         toast.error('Failed to submit data', {
      //           onClose: () => onFailureRedirect() // Redirect to failure page after toast is fully closed
      //         });
      //       }
      //       } catch (error) {
      //       console.error("Error:", error);
      //       }
    };
    useEffect(() => {
      const fetchData = async () => {
          try {
              const storedCookie = document.cookie;
              console.log(storedCookie);
        // Create a custom set of headers
              const customHeaders = new Headers({
                'Content-Type': 'application/json', // You may need to adjust the content type based on your request
                'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
              });
              const headersObject = Object.fromEntries(customHeaders.entries());
    
              //  const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
              const response = await fetch(`${globalUrl}/v1/${formName}/${formId}`, {
                  method: 'GET',
                  credentials: 'include',  // Include credentials (cookies) in the request
                  headers: headersObject,
                  // body: JSON.stringify(updatedFormData)
                });
              //   console.log(response)
              // console.log("aadd",typeof(data))
              // setPendingFormData(response.data);
              // console.log("aadd",typeof(pendingFormData))
              // console.log("aadd",pendingFormData)
              // console.log("aadd++++",response)
                 // Parsing JSON response
  const responseData = await response.json();
  // console.log('Parsed JSON response:', typeof(responseData));
  console.log('Parsed JSON response:', (responseData));
  setFormData(responseData);
  // setTabledata(responseData.list_orders)
              //   console.log()
                if (response.statusCode === 401) {
                  console.log("Failed");
                }
              } catch (error) {
                console.error("Error:", error);
              }
      };
  
      fetchData();
  
  
      return () => {
  
      };
  }, []);
  
  console.log("formData++++",formData)
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


      const handleUserSelect = (userId,userName) => {
        console.log("aaaa",userName)
        console.log("aaaa",userId)
        setFormData({
          ...formData,
          receiver: userId
        });
      
        if (userName) {
          setSearchName(userName);
        } else {
          setSearchName(''); // or any default value you prefer
        }
        console.log("search+++",searchName)
      };


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${globalUrl}/list/receiver`);
            setUserData(response.data);
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

  useEffect(() => {
    console.log("information", info);
    // Update the formData state with info data
    setFormData(prevState => ({
      ...prevState,
      designation: info.designation,
    }));
    console.log(formData)
  }, [info]);

  const handleSuccessRedirect = () => {
    navigate("/");
  };

  const handleFailureRedirect = () => {
    navigate("/Furniture");
  };

  return (
    <>
    
    <div className ="grid grid-cols-6">
    <div className="col-span-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">INDIAN INSTITUTE OF TECHNOLOGY INDORE</h1><br/>
        <h2 className="text-lg"><b>Form for Furniture Requirement</b></h2>
        <div className="font-bold underline" style={{ borderBottom: '1px solid black' }}></div>
      </div>
      <form>
      <div className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Name of the Indenter:</b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name_indenter" onChange = {handleChange} value={formData.name_indenter} required />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Designation:</b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="designation" onChange = {handleChange} value={formData.designation} required />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Discipline/Center/Office:</b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="discipline" onChange = {handleChange}  value={formData.discipline} required />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Budget head: (a) Institute/(b) Department/(c) Project (specify) (d) Other (Specify): </b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="budget_head" onChange = {handleChange} value={formData.budget_head} required />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Space availability:</b>Location such as Room No. </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="room_no" onChange = {handleChange} value={formData.room_no} required />
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Space availability:</b>Building no.  </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="building" onChange = {handleChange} value={formData.building} required />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Specification/s: </b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="specification" onChange = {handleChange} value={formData.specification} required  />
          </div>
        </div>

        {/* Table for furniture requirements */}
        <div className="mt-4">
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">S.No.</th>
                <th className="border px-4 py-2">Nomenclature /Description of Items</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Estimated Unit Cost (Rs.)</th>
                <th className="border px-4 py-2">Total Estimated Cost (Rs.)</th>
                <th className="border px-4 py-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">MS Almirah</td>
                <td className="border px-4 py-2">01 no.</td>
                <td className="border px-4 py-2">12,000</td>
                <td className="border px-4 py-2">12,000.00</td>
                <td className="border px-4 py-2" rowspan="2">For research laboratory </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">2</td>
                <td className="border px-4 py-2">Customized MS revolving stool</td>
                <td className="border px-4 py-2">02 nos.</td>
                <td className="border px-4 py-2">3,600.00</td>
                <td className="border px-4 py-2">7,200.00</td>
                </tr>
              <tr>
                <td className="border text-right px-4 py-2" colspan="4">Total (incl of 18% GST):</td>
                <td className="border px-4 py-2"><b>19,200.00</b></td>
                <td className="border px-4 py-2"></td>
                </tr>
            </tbody>
          </table>
        </div>
        <br/><br/>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Purpose/ justification of the requirement: </b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="purpose" onChange = {handleChange} value={formData.purpose} required />
          </div>
          <br/><br/>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Nature of the material indented*: (a) Proprietary / (b) Single Source / (c) LPC / (d) Other:  </b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="nature" onChange = {handleChange}  value={formData.nature} required />
          </div>
          <br/><br/>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2"><b>Present availability of similar items with the Indenter:</b></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  name="present_availability"  onChange = {handleChange}  value={formData.present_availability} required />
          </div>
          </div>
           <br/><br/><br/><br/>
        {/* Signature section */}
        <div className="flex justify-between items-center mt-8">
          <div className="flex flex-col items-center">
            <div className="border-t border-gray-300 w-64 text-center pt-2">
            Signature of Indenter
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="border-t border-gray-300 w-64 text-center pt-2">
            Head, MEMS Department<br/>Name: Dr. Ajay K. Kushwaha
            <label className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" name="sign_date" onChange = {handleChange} value={formData.sign_date}/>
            </div>
          </div>
        </div><br/><br/>
      </div>
      <div className='p-4'> 
          <>
          <div className='p-4'>
            {/* <div>
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
 */}

          </div>
        <b><h4 classname="block text-black-900 font-bold increased-font-size">To,<br/>Furniture Committee</h4></b>
      {/* <button onClick={(e) => handleSubmit(e, handleSuccessRedirect, handleFailureRedirect)} className='text-white bg-black'>Submit</button> */}
      {/* <ToastContainer  /> */}
   </> </div> 
    </form>
      
    </div>
    </div>
    </>
  );
}

// export default SpecificDisplayPendingForm


export default SpecificDisplayPendingForm ;
