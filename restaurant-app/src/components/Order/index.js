import React from 'react';
import OrderForm from "./OrderForm";
import {useForm} from "../hooks/useForm";
import {Grid} from "@material-ui/core";
import SearchFoodItem from "./SearchFoodItem";
import OrderedFoodItems from "./OrderedFoodItems";
import searchFoodItem from "./SearchFoodItem";

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

    const addFoodItem = foodItem => {
        let x = {
            orderMasterId: values.orderMasterId,
            orderDetails: 0,
            foodItemId: foodItem.foodItemId,
            quantity: 1,
            foodItemPrice: foodItem.foodItemPrice,
            foodItemName: foodItem.foodItemName
        }
        setValues({
            ...values,
            orderDetails: [...values.orderDetails, x]
        })
    }

    return (
        <Grid container spacing="2">
            <Grid item xs={12}>
                <OrderForm
                    { ...{values, errors, handleInputChange}}
                />
            </Grid>

            <Grid item xs={6}>
                <SearchFoodItem
                    {...{addFoodItem}}
                />
            </Grid>
            <Grid item xs={6}>
                <OrderedFoodItems
                    {...{orderedFoodItems: values.orderDetails}}/>
            </Grid>
        </Grid>
    );
}

export default Order;