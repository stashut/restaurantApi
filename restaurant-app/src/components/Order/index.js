import React from 'react';
import OrderForm from "./OrderForm";
import {useForm} from "../hooks/useForm";

const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

const getFreshModelObject = () => ({
    orderMasterId: 0,
    orderNumber: generateOrderNumber(),
    customerId: 0,
    paymentMethods: 'none',
    grandTotal: 0,
    deletedOrderItemIds:'',
    orderDetails: []
})

function Order(props) {

    const {values, setValues, errors, setErrors, handleInputChange, resetFormControls} = useForm(getFreshModelObject);

    return (
        <OrderForm
            { ...{values, errors, handleInputChange}}
        />
    );
}

export default Order;