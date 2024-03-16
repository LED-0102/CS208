import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Navbar/Header';
import { Input } from "@nextui-org/react";
import "./ssform.css"


const SS04form = () => {
  const [rows, setRows] = useState([]);

  const addRow = (e) => {
    e.preventDefault();
    // Create a new row with a unique ID and serial number
    const newRow = { id: rows.length + 1, sno: rows.length + 1 };
    // Update the state to include the new row
    setRows([...rows, newRow]);
  };

  const [formData, setFormData] = useState({
    StoreNo: "",
    financialyear: "",
    reqdate: "",
    custodian: "",
    department: "",
    location: "",
    contact: "",
    dateItem: "",
    designation: "",
    inventoryNo: "",
    roomNo: "",
    email: "",
    totalAmt: "",

  });

  const handleChange = (evt) => {
    const changedField = evt.target.name;
    const newValue = evt.target.value;
    console.log(changedField, newValue)

    setFormData((currData) => {
      currData[changedField] = newValue;
      return {
        ...currData,  //making copy by spread operator

      };
    });
  };

  const handleChangeTable = (event, index, key) => {
    const { value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };


  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("formdata", formData);
    console.log("tabledata", rows);
    // console.log("formdata",StoreNo);
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
                    <td><label className='font-bold' htmlFor="dateItem">Item Receiving Date: </label></td>
                    <td><input type="date" id="dateItem" name="dateItem" placeholder='date' value={formData.dateItem} onChange={handleChange} className="border-2 border-black" /></td>
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
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sno}</td>
                    <td><input type="text" id={`supplierName_${index}`} name={`supplierName_${index}`} value={row.supplierName} onChange={(e) => handleChangeTable(e, index, 'supplierName')} placeholder="Supplier Name" className="border-2 border-black" /></td>
                    <td><input type="text" id={`billNo_${index}`} name={`billNo_${index}`} value={row.billNo} onChange={(e) => handleChangeTable(e, index, 'billNo')} placeholder="Bill No & Date" className="border-2 border-black" /></td>
                    <td><input type="text" id={`itemName_${index}`} name={`itemName_${index}`} value={row.itemName} onChange={(e) => handleChangeTable(e, index, 'itemName')} placeholder="Item Name and Specification" className="border-2 border-black" /></td>
                    <td><input type="text" id={`qty_${index}`} name={`qty_${index}`} value={row.qty} onChange={(e) => handleChangeTable(e, index, 'qty')} placeholder="Qty" className="border-2 border-black" /></td>
                    <td><input type="text" id={`conNonCon_${index}`} name={`conNonCon_${index}`} value={row.conNonCon} onChange={(e) => handleChangeTable(e, index, 'conNonCon')} placeholder="Con/Non-Con" className="border-2 border-black" /></td>
                    <td><input type="text" id={`unitPrice_${index}`} name={`unitPrice_${index}`} value={row.unitPrice} onChange={(e) => handleChangeTable(e, index, 'unitPrice')} placeholder="Unit Price" className="border-2 border-black" /></td>
                    <td><input type="text" id={`total_${index}`} name={`total_${index}`} value={row.total} onChange={(e) => handleChangeTable(e, index, 'total')} placeholder="Total" className="border-2 border-black" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex w-full gap-80 '>
              <div className='w-1/2 p-4'>
                <p className='text-2xl'>Total Amount (incl. 18% GST) :	<input type="number" id="totalAmt" name="totalAmt" value={formData.totalAmt} onChange={handleChange} className="border-2 border-black" /></p>
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
