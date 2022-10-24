import React, {useState, useEffect} from 'react';
import Form from "../layouts/Form"
import {ButtonGroup, Button as MuiButton, Grid, InputAdornment, makeStyles} from "@material-ui/core";
import {Input, Select, Button} from "../controls/Index"
import ReplayIcon from '@material-ui/icons/Replay';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ReorderIcon from '@material-ui/icons/Reorder';
import {createApiEndpoint, ENDPOINT} from '../../api/index'
import {roundTo2DecimalPoint} from "../utils";
import Popup from "../layouts/Popup";
import OrderList from "./OrderList";
import Notification from "../layouts/Notification";


const paymentMethods = [
    {id: 'none', title: 'Select'},
    {id: 'Cash', title: 'Cash'},
    {id: 'Card', title: 'Card'},
]

const useStyles = makeStyles(theme => ({
    adornmentText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },
    submitButtonGroup: {
        backgroundColor: '#f3b33d',
        color: '#000',
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#f3b33d',
        }
    }
}))

function OrderForm(props) {

    const {values, setValues, errors, setErrors, handleInputChange, resetFormControls} = props;
    const classes = useStyles();

    const [customerList, setCustomerList] = useState([]);
    const [orderListVisibility, setOrderListVisibility] = useState(false);
    const [orderId, setOrderId] = useState(0);
    const [notify, setNotify] = useState({isOpen: false});

    useEffect(() => {
        createApiEndpoint(ENDPOINT.CUSTOMER).fetchAll()
            .then(res => {
                let customerList = res.data.map(item => ({
                    id: item.customerId,
                    title: item.customerName
                }))
                customerList = [{id: 0, title: 'Select'}].concat(customerList);
                setCustomerList(customerList);
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let grandTotal = values.orderDetails.reduce((tempTotal, item) => {
            return tempTotal + (item.quantity * item.foodItemPrice);
        }, 0);
        setValues({
            ...values,
            grandTotal: roundTo2DecimalPoint(grandTotal)
        })
    }, [JSON.stringify(values.orderDetails)])

    useEffect(() => {
        if (orderId == 0) resetFormControls()
        else {
            createApiEndpoint(ENDPOINT.ORDER).fetchById(orderId)
                .then(res => {
                    setValues(res.data);
                    setErrors({});
                })
                .catch(err => console.log(err));
        }
    }, [orderId]);
    

    const validateForm = () => {
        let temp = {};
        temp.customerId = values.customerId != 0 ? "" : "This field is required";
        temp.paymentMethod = values.paymentMethod != "none" ? "" : "This field is required";
        temp.orderDetails = values.orderDetails.length != 0 ? "" : "This field is required";
        setErrors({...temp});
        return Object.values(temp).every(x => x === "")
    }

    const resetForm = () => {
        resetFormControls();
        setOrderId(0);
    }

    const submitOrder = e => {
        e.preventDefault();
        if (validateForm()) {
            if (values.orderMasterId == 0) {
                createApiEndpoint(ENDPOINT.ORDER).create(values)
                    .then(res => {
                        resetFormControls();
                        setNotify({isOpen: true, message: "New order is created."})
                    })
                    .catch(err => console.log(err));
            }
            else {
                createApiEndpoint(ENDPOINT.ORDER).update(values.orderMasterId,values)
                    .then(res => {
                        setOrderId(0);
                        setNotify({isOpen: true, message:"The order is updated."})
                    })
                    .catch(err => console.log(err));
            }
        }
    }

    const openListOfOrders = () => {
        setOrderListVisibility(true);
    }

    return (
        <>
            <Form onSubmit={submitOrder}>
                <Grid container>
                    <Grid item xs={6}>
                        <Input
                            disabled
                            label="Order number"
                            name="orderNumber"
                            value={values.orderNumber}
                            InputProps={{
                                startAdornment: <InputAdornment className={classes.adornmentText}
                                                                position="start">#</InputAdornment>
                            }}
                        />
                        <Select label="Customer"
                                name="customerId"
                                value={values.customerId}
                                onChange={handleInputChange}
                                options={customerList}
                                error={errors.customerId}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select label="Payment Method"
                                name="paymentMethod"
                                value={values.paymentMethod}
                                onChange={handleInputChange}
                                options={paymentMethods}
                                error={errors.paymentMethod}
                        />
                        <Input
                            disabled
                            label="Grand total"
                            name="grandTotal"
                            value={values.grandTotal}
                            InputProps={{
                                startAdornment: <InputAdornment className={classes.adornmentText}
                                                                position="start">$</InputAdornment>
                            }}
                        />
                        <ButtonGroup className={classes.submitButtonGroup}>
                            <MuiButton size="large" endIcon={<RestaurantMenuIcon/>} type="submit">Submit</MuiButton>
                            <MuiButton
                                size="small"
                                startIcon={<ReplayIcon/>}
                                onClick={resetForm}
                            />
                        </ButtonGroup>
                        <Button
                            size='large'
                            startIcon={<ReorderIcon/>}
                            onClick={openListOfOrders}
                        >Orders</Button>
                    </Grid>
                </Grid>
            </Form>
            <Popup
                title="List of Orders"
                openPopup={orderListVisibility}
                setOpenPopup={setOrderListVisibility}>
                <OrderList {...{setOrderId, setOrderListVisibility, resetFormControls, setNotify}}/>
            </Popup>
            <Notification
                {...{notify, setNotify}}/>
        </>
    )
}

export default OrderForm;