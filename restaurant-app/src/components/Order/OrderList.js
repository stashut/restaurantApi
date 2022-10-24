import React, {useEffect, useState} from 'react';
import {createApiEndpoint, ENDPOINT} from "../../api";
import Table from "../layouts/Table"
import {TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import DeleteOutlineTwoToneIcon from "@material-ui/icons/DeleteOutlineTwoTone";

function OrderList(props) {

    const {setOrderId, setOrderListVisibility} = props;

    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        createApiEndpoint(ENDPOINT.ORDER).fetchAll()
            .then(res => {
                setOrderList(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const showForUpdate = id => {
        setOrderId(id);
        setOrderListVisibility(false);
    }
    
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Order No.</TableCell>
                    <TableCell>Customer.</TableCell>
                    <TableCell>Payed with</TableCell>
                    <TableCell>Grand Total</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    orderList.map(item => (
                        <TableRow key={item.orderMasterId}>
                            <TableCell
                                onClick={e => showForUpdate(item.orderMasterId)}>
                                {item.orderNumber}
                            </TableCell>
                            <TableCell
                                onClick={e => showForUpdate(item.orderMasterId)}>
                                {item.customer.customerName}
                            </TableCell>
                            <TableCell
                                onClick={e => showForUpdate(item.orderMasterId)}>
                                {item.paymentMethod}
                            </TableCell>
                            <TableCell
                                onClick={e => showForUpdate(item.orderMasterId)}>
                                {item.grandTotal}
                            </TableCell>
                            <TableCell>
                                <DeleteOutlineTwoToneIcon color="secondary"/>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}

export default OrderList;