import React, {useState} from 'react';
import Form from "../layouts/Form"
import {ButtonGroup, Button as MuiButton, Grid, InputAdornment, makeStyles} from "@material-ui/core";
import { Input, Select, Button } from "../controls/Index"
import ReplayIcon from '@material-ui/icons/Replay';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ReorderIcon from '@material-ui/icons/Reorder';


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
                    <ButtonGroup className={classes.submitButtonGroup}>
                        <MuiButton size="large"  endIcon={<RestaurantMenuIcon />} type="submit">Submit</MuiButton>
                        <MuiButton size="small" startIcon={<ReplayIcon />} />
                    </ButtonGroup>
                    <Button size='large' startIcon={<ReorderIcon />}>Orders</Button>
                </Grid>
            </Grid>
        </Form>
    );
}

export default OrderForm;