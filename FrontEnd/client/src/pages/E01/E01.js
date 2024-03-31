import React from 'react';
import "./e01.css";

const E01 = () => {
//   const [formData, setFormData] = useState({
//     purpose: "",
//     applicant_name: "",
//     designation: "",
//     department: "",
//     paymentForParty: "",
//     budgetHead: "",
//     otherBudgetHead: "",
//     project_sanction_no: "",
//     expenditureHead: "",
//     otherexpenditureHead: "",
//     amount_claimed: "",
//     recommending_authority: "",
//     note:"",
//     approval_status:"Pending",
//     date:"",
// });   
       
// const handleChange = (evt) => {
//     const changedField = evt.target.name;
//     const newValue = evt.target.value;

//     setFormData((currData) => {
//     currData[changedField] = newValue;
//     return {
//         ...currData,
//     };
//     });
// };
  
//   const designation = [
//   "HOD",
//   "Staff",
//   "Professor",
//   "Office",
//   "Student",
//   ];
  
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
//         const response = await fetch(`${globalUrl}/v1/submit/R1`, {
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


  return (

    <div className="border-2 border-black h-full">
        <h1 className='text-center font-bold text-3xl'>Indian Institute of Technology Indore - Estate Section</h1>
        <p className='text-center font-bold mt-4 text-lg'>Civil/Electrical/Air Conditioning Work Requisition Form (E: 01)</p>
        <p className='text-center'>(For regular maintenance, do not use this form; instead use ticket generation service)</p>
        <form action="#">
            <div className="mb-4">
              <label for="name"><p className='text-center'><span className='font-bold'>Requisition submitted by: </span> [must be an employee (other than project employee) of the Institute]</p></label>
              <table>
                <tr>
                  <td><label htmlFor='name'>Name</label></td>
                  <td><input type="text" id="name" name="name" className="p-2 border-2 border-black" /></td>
                  <td><label htmlFor="phone">Phone/Mobile No.:</label></td>
                  <td><input type="tel" id="phone" name="phone" className="p-2 border-2 border-black" /></td>
                </tr>
                <tr>
                  <td><label htmlFor="department">Dept./Section:</label></td>
                  <td><input type="text" id="department" name="department" className="p-2 border-2 border-black" /></td>
                  <td><label htmlFor="empId">Emp Id:</label></td>
                  <td><input type="text" id="empId" name="empId" className="p-2 border-2 border-black" /></td>
                  <td><label htmlFor="email">E-mail:</label></td>
                  <td><input type="text" id="email" name="email" className="p-2 border-2 border-black" /></td>
                </tr>
                <tr>
                  <td><label htmlFor="location">Location:</label></td>
                  <td><input type="text" id="location" name="location" className="p-2 border-2 border-black" /></td>
                </tr>
                
                
                
                
              </table>
            </div>
            <div className="mb-4">
                <label htmlFor="description">Provide Description</label>
                <input type="text" id="description" name="description" className="p-2 border-2 border-black" />
            </div>
            <div>
                <label>Does this work require new built-up area/covered area?</label><br />
                <input type="radio" name="new_area" value="yes" checked /> Yes
                <input type="radio" name="new_area" value="no" /> No
            </div>
            <div className="form-group">
                <label>Have you attached any sketch showing dimensions/requirements?</label><br />
                <input type="radio" name="sketch_attached" value="yes" checked /> Yes
                <input type="radio" name="sketch_attached" value="no" /> No
            </div>
            <div className="form-group">
                <label>Will this work create new usable space?</label><br />
                <input type="radio" name="new_space" value="yes" checked /> Yes
                <input type="radio" name="new_space" value="no" /> No
            </div>
            <div className="form-group">
                <label>Do you have any suggestion that can be used for this purpose (optional)?</label><br />
                <input className='a w-2' type="radio" name="suggestion" value="yes" checked /> Yes
                <input type="radio" name="suggestion" value="no" /> No
            </div>
            <div className='mt-3'>
                <label className='font-bold'>Suggestions</label>
                <input type="text" id="suggestion" name="suggestion" className="p-2 border-2 border-black" />
            </div>
            
            <input type="submit" value="Submit" />
        </form>
    </div>
  )
}

export default E01;
