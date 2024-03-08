import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Navbar/Header';
import "./firstFormofpurchase.css";

const FirstFormofPurchase = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="bgw cb setup">
        <div className="proContainer">
        <h1>INDIAN INSTITUTE OF TECHNOLOGY INDORE</h1>
        <h2>GENERAL PAYMENT AGAINST DIRECT PURCHASE FORM (R & D)</h2>
        <div className="separatorLine"></div>
        <p>(Please use separate Form for TA-DA/Local Conveyance/General Advance settlement/Medical Expenses/ CPDA)</p>
        <form>
        <table>
            <tr>
                <th>1. Purpose of the Expenditure</th>
                <td colspan="5"><textarea name="purpose" required></textarea></td>
            </tr>
            <tr>
                <th>2. Name of the Applicant</th>
                <td><input type="text" name="applicant_name" required /></td>
                <th>3. Designation</th>
                <td><input type="text" name="designation" required /></td>
                <th>4. Department</th>
                <td><input type="text" name="department" required /></td>
            </tr>
            <tr>
                <th>5. Payment to be made in favor of</th>
                <td colspan="5">
                    Claimant (<input type="text" name="claimant" required />)
                    Party (<input type="text" name="party" required />)
                </td>
            </tr>
            <tr>
                <th>6. Please specify the budget head for expenditure</th>
                <td colspan="5">
                    Project (<input type="text" name="project" required />)
                    RDF (<input type="text" name="rdf" required />)
                    DDF (<input type="text" name="ddf" required />)
                    Others (<input type="text" name="others" required />) Please Specify
                </td>
            </tr>
            <tr>
                <th>Project Sanction No.</th>
                <td><input type="text" name="project_sanction_no" /></td>
                <th>Expenditure Head</th>
                <td colspan="3">
                    Equipment (<input type="checkbox" name="equipment" />)
                    Consumable (<input type="checkbox" name="consumable" />)
                    Contingency (<input type="checkbox" name="contingency" />)
                    Other (<input type="checkbox" name="other" />) Please Specify
                </td>
            </tr>
            <tr>
                <th>7. Amount Claimed (Rs)</th>
                <td colspan="5"><input type="text" name="amount_claimed" required /></td>
            </tr>
            <tr>
                <th>8. Declaration by Applicant:</th>
                <td colspan="5"><textarea name="applicant_declaration" required></textarea></td>
            </tr>
            <tr>
                <th>9. Signature of Recommending Authority:</th>
                <td colspan="5"><input type="text" name="recommending_authority_signature" required /></td>
            </tr>
            <tr>
                <th>10. Signature of Approving Authority:</th>
                <td colspan="5"><input type="text" name="approving_authority_signature" required /></td>
            </tr>
        </table>

        <div>
            <p><strong>Note:</strong></p>
            <ol>
                <li>Please attach the approval, if any.</li>
                <li>If the expenses from other, kindly specify in others.</li>
                <li>Form to be sent to Central Store for stock entry in the asset register in order to avoid time lag.</li>
                <li>The consumables purchased also to be entered in the stock register.</li>
                <li>Certified GEM report is mandatory for the purchase of goods/items.</li>
                <li>Invoice must be certified by the project Investigator.</li>
            </ol>
        </div>

        <button type="submit">Submit</button>
    </form>
    </div>
      </div>
    </div>
  )
}

export default FirstFormofPurchase
