import React from 'react'
import "./r1.css"

const R1 = () => {
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
            <tr>
                <th>1. Purpose of the Expenditure</th>
                <td colspan="5"><textarea name="purpose" required></textarea></td>
            </tr>
            <tr>
                <th><label htmlFor='applicant_name'>2. Name of the Applicant</label></th>
                <td><input type="text" name="applicant_name" id="applicant_name" required /></td>
                <th><label htmlFor='designation'>3. Designation</label></th>
                <td><input type="text" name="designation" id='designation' required /></td>
                <th><label className='department'>4. Department</label></th>
                <td><input type="text" name="department" id='department' required /></td>
            </tr>
            <tr>
                <th>5. Payment to be made in favor of</th>
                <td colspan="5">
                    <label htmlFor='paymentForParty' >Party</label>
                    <input type="checkbox" name="paymentForParty" id='paymentForParty' required />
                </td>
            </tr>
            <tr>
                <th><label htmlFor='budgetHead'>6. Please specify the budget head for expenditure</label></th>
                <td colspan="5">
                    <select id="budgetHead" name="budgetHead">
                        <option value="RDF">RDF</option>
                        <option value="DDF">DDF</option>
                        <option value="Others">Others</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label htmlFor='otherBudgetHead'>7. If Other please specify (else leave blank)</label></th>
                <td colSpan="5"><input type="text" name="otherBudgetHead" id='otherBudgetHead' defaultValue="" /></td>
            </tr>
            <tr>
                <th><label htmlFor='project_sanction_no'>8. Project Sanction No.</label></th>
                <td><input type="text" name="project_sanction_no" id='project_sanction_no' /></td>
                <th><label htmlFor='expenditureHead'>9. Expenditure Head</label></th>
                <td colspan="3">
                    <select id="expenditureHead" name="expenditureHead">
                        <option value="Equipment">Equipment</option>
                        <option value="Consumable">Consumable</option>
                        <option value="Contingency">Contingency</option>
                        <option value="Other">Other</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label htmlFor='otherexpenditureHead'>10. If Other please specify (else leave blank)</label></th>
                <td colSpan="5"><input type="text" name="otherexpenditureHead" id='otherexpenditureHead' defaultValue="" /></td>
            </tr>
            <tr>
                <th><label htmlFor='amount_claimed'>11. Amount Claimed (Rs)</label></th>
                <td colspan="5"><input type="text" name="amount_claimed" required /></td>
            </tr>
            <tr>
                <th><label htmlFor='recommending_authority'>12. Name of Recommending Authority:</label></th>
                <td colspan="5"><input type="text" name="recommending_authority" id="recommending_authority" required /></td>
            </tr>
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

        <button type="submit">Submit</button>
    </form>
    </div>
      </div>
    </div>
  )
}

export default R1
