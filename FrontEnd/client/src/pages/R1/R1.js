import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import globalUrl from "../../components/url";
import axios from 'axios';
import "./r1.css";

const R1 = () => {

    const [formData, setFormData] = useState({
        purpose: "",
        applicant_name: "",
        designation: "",
        department: "",
        paymentForParty: "",
        budgetHead: "",
        otherBudgetHead: "",
        project_sanction_no: "",
        expenditureHead: "",
        otherexpenditureHead: "",
        amount_claimed: "",
        recommending_authority: "",
        note:"",
        approval_status:"Pending",
        date:"",
    });   
           
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
      
      const designation = [
      "HOD",
      "Staff",
      "Professor",
      "Office",
      "Student",
      ];
      
    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToBeSub={...formData};
        const date1=new Date();
        const formattedDate=`${date1.getFullYear()}/${date1.getMonth()+1}/${date1.getDate()}`;
        dataToBeSub.date=formattedDate;

        try {
    
            const storedCookie = document.cookie;
            console.log(storedCookie);
        // Create a custom set of headers
            const customHeaders = new Headers({
                'Content-Type': 'application/json', // You may need to adjust the content type based on your request
                'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
            });
            const headersObject = Object.fromEntries(customHeaders.entries());
            const response = await fetch(`${globalUrl}/v1/submit/R1`, {
                method: 'POST',
                credentials: 'include',  // Include credentials (cookies) in the request
                headers: headersObject,
                body: JSON.stringify(dataToBeSub)
            });
            console.log(response)
            if (response.statusCode === 401) {
                console.log("Failed");
            }
            } catch (error) {
            console.error("Error:", error);
            }
    };


  return (
    <div>
      <div className="">
        <div className="">
        <h1 className='font-bold text-center text-3xl'>INDIAN INSTITUTE OF TECHNOLOGY INDORE</h1>
        <h2 className='font-bold text-center text-xl'>GENERAL PAYMENT AGAINST DIRECT PURCHASE FORM (R & D)</h2>
        <div className="h-1 r1Spline bg-black"></div>
        <p className='text-md ml-3'>(Please use separate Form for TA-DA/Local Conveyance/General Advance settlement/Medical Expenses/ CPDA)</p>
        <form>
        <table>
            <tbody>
                <tr>
                    <th>1. Purpose of the Expenditure</th>
                    <td colSpan="5"><input type="text" name="purpose" id="purpose" onChange={handleChange} required /></td>
                </tr>
                <tr>
                    <th><label htmlFor='applicant_name'>2. Name of the Applicant</label></th>
                    <td><input type="text" name="applicant_name" id="applicant_name" onChange={handleChange} required /></td>
                    <th><label htmlFor='designation'>3. Designation</label></th>
                    <td><input type="text" name="designation" id='designation' onChange={handleChange} required /></td>
                    <th><label className='department'>4. Department</label></th>
                    <td><input type="text" name="department" id='department' onChange={handleChange} required /></td>
                </tr>
                <tr>
                    <th>5. Payment to be made in favor of</th>
                    <td colSpan="5">
                        <label htmlFor='paymentForParty' >Party</label>
                        <input type="checkbox" name="paymentForParty" id='paymentForParty' onChange={handleChange} required />
                    </td>
                </tr>
                <tr>
                    <th><label htmlFor='budgetHead'>6. Please specify the budget head for expenditure</label></th>
                    <td colSpan="5">
                        <select id="budgetHead" name="budgetHead" onChange={handleChange}>
                            <option value="RDF">RDF</option>
                            <option value="DDF">DDF</option>
                            <option value="Others">Others</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th><label htmlFor='otherBudgetHead'>7. If Other please specify (else leave blank)</label></th>
                    <td colSpan="5"><input type="text" name="otherBudgetHead" id='otherBudgetHead' defaultValue="" onChange={handleChange} /></td>
                </tr>
                <tr>
                    <th><label htmlFor='project_sanction_no'>8. Project Sanction No.</label></th>
                    <td><input type="text" name="project_sanction_no" id='project_sanction_no' onChange={handleChange} /></td>
                    <th><label htmlFor='expenditureHead'>9. Expenditure Head</label></th>
                    <td colSpan="3">
                        <select id="expenditureHead" name="expenditureHead" onChange={handleChange}>
                            <option value="Equipment">Equipment</option>
                            <option value="Consumable">Consumable</option>
                            <option value="Contingency">Contingency</option>
                            <option value="Other">Other</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th><label htmlFor='otherexpenditureHead'>10. If Other please specify (else leave blank)</label></th>
                    <td colSpan="5"><input type="text" name="otherexpenditureHead" id='otherexpenditureHead' defaultValue="" onChange={handleChange} /></td>
                </tr>
                <tr>
                    <th><label htmlFor='amount_claimed'>11. Amount Claimed (Rs)</label></th>
                    <td colSpan="5"><input type="text" name="amount_claimed" onChange={handleChange} required /></td>
                </tr>
                <tr>
                    <th><label htmlFor='recommending_authority'>12. Name of Recommending Authority:</label></th>
                    <td colSpan="5"><input type="text" name="recommending_authority" id="recommending_authority" onChange={handleChange} required /></td>
                </tr>
            </tbody>
        </table>

        <div>
            <p><strong>Note:</strong></p>
            <ol>
                <li>1. If the expenses from other, kindly specify in others.</li>
                <li>2. Form to be sent to Central Store for stock entry in the asset register in order to avoid time lag.</li>
                <li>3. The consumables purchased also to be entered in the stock register.</li>
                <li>4. Certified GEM report is mandatory for the purchase of goods/items.</li>
                <li>5. Invoice must be certified by the project Investigator.</li>
            </ol>
        </div>

        <button onClick={(e) => handleSubmit(e)} className='text-white bg-black'>Submit</button>
    </form>
    </div>
      </div>
    </div>
  )
}

export default R1
