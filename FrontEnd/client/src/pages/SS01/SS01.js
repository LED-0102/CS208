import React, { useState } from 'react';

const SS01Form = () => {
    const [formData, setFormData] = useState({
        name_of_custodian: '',
        department: '',
        location: '',
        designation: '',
        inventory_no: '',
        room_no: '',
        item_purchase_info: '',
        name_head: '',
        list_orders: [],
        total_cost: '',
        issued_approved_name: '',
        issued_approved_date: '',
        items_received_name: '',
        items_received_date: '',
        items_issued_name: '',
        items_issued_date: '',
        action_ledger_name: '',
        action_ledger_date: '',
        supplier_name_address: '',
        po_no_date: '',
        budget_head_account: '',
        challan_no_date: '',
        invoice_no_date: '',
        invoice_amount: '',
        project_no: '',
        name_indenter: '',
        sign_date_indenter: '',
        sign_date_head: ''
    });

    const [orders, setOrders] = useState([
        { item_name: '', item_specification: '', con_n_con: '', required_number: '', issued: '', cost: '' }
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleOrderChange = (index, e) => {
        const { name, value } = e.target;
        const newOrders = [...orders];
        newOrders[index][name] = value;
        setOrders(newOrders);
    };

    const handleAddOrder = () => {
        setOrders([...orders, { item_name: '', item_specification: '', con_n_con: '', required_number: '', issued: '', cost: '' }]);
    };

    const handleRemoveOrder = (index) => {
        const newOrders = [...orders];
        newOrders.splice(index, 1);
        setOrders(newOrders);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            list_orders: orders
        };
        console.log(dataToSend); // Send this data to your backend URL using fetch or axios
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Input fields */}
                <input type="text" name="name_of_custodian" value={formData.name_of_custodian} onChange={handleChange} />
                <input type="text" name="department" value={formData.department} onChange={handleChange} />
                {/* Add more fields as needed */}

                {/* Order inputs */}
                {orders.map((order, index) => (
                    <div key={index}>
                        <input type="text" name="item_name" value={order.item_name} onChange={(e) => handleOrderChange(index, e)} />
                        <input type="text" name="item_specification" value={order.item_specification} onChange={(e) => handleOrderChange(index, e)} />
                        {/* Add more order fields as needed */}
                        <button type="button" onClick={() => handleRemoveOrder(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddOrder}>Add Order</button>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SS01Form;
