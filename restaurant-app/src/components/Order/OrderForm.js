import React, {useState} from 'react';
import Form from "../layouts/Form"
import {Grid} from "@material-ui/core";
import { Input, Select, Button } from "../controls/Index"
import {useForm} from "../hooks/useForm";

const paymentMethods = [
    {id:'none', title:'Select'},
    {id:'Cash', title:'Cash'},
    {id:'Card', title:'Card'},
]
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

function OrderForm(props) {

    const {values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls} = useForm(getFreshModelObject);

    return (
        <Form>
            <Grid container>
                <Grid item xs={6}>
                    <Input
                        disabled
                        label="Order number"
                        name="orderNumber"
                        value={values.orderNumber}
                    />
                    <Select label="Customer"
                            name="customerId"
                            value={values.customerId}
                            onChange={handleInputChange}
                            options={[
                                {id:0, title: 'Select' },
                                {id:1, title: 'Customer1' },
                                {id:2, title: 'Customer2' },
                                {id:3, title: 'Customer3' },
                                {id:4, title: 'Customer4' }
                            ]}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Select label="Payment Method"
                            name="paymentMethod"
                            onChange={handleInputChange}
                            options={paymentMethods}
                            value={values.paymentMethods }
                    />
                    <Input
                        disabled
                        label="Grand total"
                        name="grandTotal"
                        value={values.grandTotal}
                    />
                </Grid>
            </Grid>
        </Form>
    );
}

export default OrderForm;