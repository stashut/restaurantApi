import React, {useState} from 'react';
import Form from "../layouts/Form"
import {Grid, InputAdornment, makeStyles} from "@material-ui/core";
import { Input, Select, Button } from "../controls/Index"

const paymentMethods = [
    {id:'none', title:'Select'},
    {id:'Cash', title:'Cash'},
    {id:'Card', title:'Card'},
]

const useStyles = makeStyles(theme => ({
    adornmentText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    }
}))

function OrderForm(props) {

    const { values, errors, handleInputChange } = props;
    const classes = useStyles();
    return (
        <Form>
            <Grid container>
                <Grid item xs={6}>
                    <Input
                        disabled
                        label="Order number"
                        name="orderNumber"
                        value={values.orderNumber}
                        InputProps = {{
                            startAdornment: <InputAdornment className={classes.adornmentText} position="start">#</InputAdornment>
                        }}
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
                        InputProps = {{
                            startAdornment: <InputAdornment className={classes.adornmentText} position="start">$</InputAdornment>
                        }}
                    />
                </Grid>
            </Grid>
        </Form>
    );
}

export default OrderForm;