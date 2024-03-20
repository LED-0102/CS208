import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Navbar/Header';
import { Input } from "@nextui-org/react";
import "./ssform.css"
import axios from 'axios'
import globalUrl from "../../components/url";


const SS04form = () => {
  const [list_orders, setlist_orders] = useState([]);

  const addRow = (e) => {
    e.preventDefault();
    // Create a new row with a unique ID and serial number
    const newRow = { id: list_orders.length + 1, sno: list_orders.length + 1 };
    // Update the state to include the new row
    setlist_orders([...list_orders, newRow]);
  };

  const [formData, setFormData] = useState({
    StoreNo: "",
    financialyear: "",
    reqdate: "",
    custodian: "",
    department: "",
    location: "",
    contact: "",
    items_receiving_date: "",
    designation: "",
    inventoryNo: "",
    roomNo: "",
    email: "",
    total_amount: "",

  });
  const abc="newvar++";

  const handleChange = (evt) => {
    const changedField = evt.target.name;
    const newValue = evt.target.value;
    // console.log(changedField, newValue)

    setFormData((currData) => {
      currData[changedField] = newValue;
      return {
        ...currData,  //making copy by spread operator

      };
    });
  };

  const handleChangeTable = (event, index, key) => {
    const { value } = event.target;
    const updatedlist_orders = [...list_orders];
    updatedlist_orders[index][key] = value;
    setlist_orders(updatedlist_orders);
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log("formdata", formData);
    console.log("list_orders", list_orders);
    // console.log("formdata",formData.StoreNo);

    try {
      // Make POST request to your server endpoint
      const response = await axios.post(`${globalUrl}/v1/submit/SS04`, { formData, list_orders });
  
      // Handle the response, if needed
      console.log("Response from server:", response.data);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error:", error);
    }
  };


  return (
    <div>
      <Navbar />
      <Header />
      {/* <div></div> */}
      <div className='ml-56 border-2 border-black h-full'>
        <form>
          <div className='flex w-full p-4 '>
            <div className='w-2/3'>IITI logo and header left</div>
            <div>
              <div className=' border-2 border-black'>
                <div className='flex-col p-4'>
                  <h2>FORM NO:SS04</h2>
                  <table>
                    <thead>
                      <tr>
                        {/* Table headers */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <label htmlFor="StoreNo">Store Number/IN/IV/DP/NO. : </label>
                        </td>
                        <td>
                          <input type="text" id="StoreNo" name="StoreNo" placeholder="Store No" value={formData.StoreNo} onChange={handleChange} className="border-2 border-black" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="financialyear">Financial year : </label>
                        </td>
                        <td>
                          <input type="number" id="financialyear" name="financialyear" placeholder='financialyear' value={formData.financialyear} onChange={handleChange} className="border-2 border-black" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="reqdate">Date : </label>
                        </td>
                        <td>
                          <input type="date" id="reqdate" name="reqdate" value={formData.reqdate} onChange={handleChange} className="border-2 border-black" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p>(to be filled by store assistant)</p>
                </div>
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
                      <input type="text" id="custodian" name="custodian" value={formData.custodian} placeholder='custodian name' onChange={handleChange} className="border-2 border-black" /></td>
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
                      <td><label for="inventoryNo" htmlFor='inventoryNo'>Inventory No :</label></td>
                      <td><input type="number" id="inventoryNo" name="inventoryNo" value={formData.inventoryNo} onChange={handleChange} class="border-2 border-black" /></td>
                    </tr>
                    <tr>
                      <td><label className='font-bold' htmlFor='roomNo'>Room No :</label></td>
                      <td><input type="text" id="roomNo" name="roomNo" placeholder='room number' value={formData.roomNo} onChange={handleChange} className="border-2 border-black" /></td>
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
                  <th>Bill No & Date</th>
                  <th>Item Name and Specification</th>
                  <th>Qty</th>
                  <th>Con/Non-Con</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {list_orders.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sno}</td>
                    <td><input type="text" id={`supplier_${index}`} name={`supplier_${index}`} value={row.supplier} onChange={(e) => handleChangeTable(e, index, 'supplier')} placeholder="Supplier Name" className="border-2 border-black" /></td>
                    <td><input type="text" id={`billNo_${index}`} name={`billNo_${index}`} value={row.billNo} onChange={(e) => handleChangeTable(e, index, 'billNo')} placeholder="Bill No & Date" className="border-2 border-black" /></td>
                    <td><input type="text" id={`item_${index}`} name={`item_${index}`} value={row.item} onChange={(e) => handleChangeTable(e, index, 'item')} placeholder="Item Name and Specification" className="border-2 border-black" /></td>
                    <td><input type="text" id={`quantity_${index}`} name={`quantity_${index}`} value={row.quantity} onChange={(e) => handleChangeTable(e, index, 'quantity')} placeholder="Qty" className="border-2 border-black" /></td>
                    <td><input type="text" id={`con_n_con_${index}`} name={`con_n_con_${index}`} value={row.con_n_con} onChange={(e) => handleChangeTable(e, index, 'con_n_con')} placeholder="Con/Non-Con" className="border-2 border-black" /></td>
                    <td><input type="text" id={`unit_price_${index}`} name={`unit_price_${index}`} value={row.unit_price} onChange={(e) => handleChangeTable(e, index, 'unit_price')} placeholder="Unit Price" className="border-2 border-black" /></td>
                    <td><input type="text" id={`total_${index}`} name={`total_${index}`} value={row.total} onChange={(e) => handleChangeTable(e, index, 'total')} placeholder="Total" className="border-2 border-black" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex w-full gap-80 '>
              <div className='w-1/2 p-4'>
                <p className='text-2xl'>Total Amount (incl. 18% GST) :	<input type="number" id="total_amount" name="total_amount" value={formData.total_amount} onChange={handleChange} className="border-2 border-black" /></p>
              </div>
              <div>
                <button onClick={addRow}>Add Row</button></div>
            </div>
          </div>



          <div className='py-8'>
            Signatures section left
          </div>
          <div className='flex justify-center w-full mb-8'>
            <button onClick={(e) => handleSubmit(e)} >Submit</button>
          </div>
        </form>
      </div>




    </div>
  )
}

export default SS04form;
