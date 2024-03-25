import React, { useState } from 'react';
import globalUrl from "../../components/url";

const SimpleForm = () => {
    const [formData, setFormData] = useState({
        note: '',
        submitter: 0,
        receiver: 2,
        date: '',
        name_of_custodian: '',
        department: '',
        location: '',
        designation: '',
        inventory_no: '',
        room_no: '',
        item_purchase_info: '',
        name_head: '',
        list_orders: [{
            si: 0,
            item_name: '',
            item_specification: '',
            con_n_con: '',
            required_number: 0,
            issued: '',
            cost: 0,
        }],
        total_amount: 0,
        supplier_name_address: '',
        po_no_date: '',
        budget_head_account: '',
        challan_no_date: '',
        invoice_no_date: '',
        invoice_amount: 0,
        project_no: '',
        name_indenter: '',
        sign_date_indenter: '',
        sign_date_head: '',
        approval_status: 'Pending',
        reason: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const storedCookie = document.cookie;
            console.log(storedCookie);
// Create a custom set of headers
            const customHeaders = new Headers({
                'Content-Type': 'application/json', // You may need to adjust the content type based on your request
                'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
            });
            const headersObject = Object.fromEntries(customHeaders.entries());
            const response = await fetch(`${globalUrl}/v1/submit/SS01`, {
                method: 'POST',
                credentials: 'include',  // Include credentials (cookies) in the request
                headers: headersObject,
                body: JSON.stringify(formData)
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
            <form onSubmit={handleSubmit}>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default SimpleForm;