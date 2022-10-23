import React from 'react';
import {
    Button,
    ButtonGroup,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper
} from "@material-ui/core";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";

function OrderedFoodItems(props) {

    const { values, setValues} = props

    let orderedFoodItems = values.orderDetails;

    const removeFoodItem = (index, id) => {
        let x = {...values};
        x.orderDetails = x.orderDetails.filter((_, i) => i != index)
        setValues({...x});
    }

    const updateQuantity = (index, value) => {
        let x = {...values};
        let foodItem = x.orderDetails[index]
        if (foodItem.quantity + value > 0) {
           foodItem.quantity += value;
            setValues({...x});
        }
    }

    return (
        <List>
            {
                orderedFoodItems.map((item, index) => (
                    <Paper key={index}>
                        <ListItem>
                            <ListItemText
                                primary={item.foodItemName}
                                primaryTypographyProps={{
                                    component: 'h1',
                                    style: {
                                        fontWeight: '500',
                                        fontSize: '1.2em'
                                    }
                                }}
                                secondary={
                                    <>
                                        <ButtonGroup size="small">
                                            <Button onClick={e => updateQuantity(index, -1)}>-</Button>
                                            <Button disabled>{item.quantity}</Button>
                                            <Button onClick={e => updateQuantity(index, +1)}>+</Button>
                                        </ButtonGroup>
                                    </>
                                }
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    disableRipple
                                    onClick={e => removeFoodItem(index, item.orderDetailsId)}
                                >
                                    <DeleteTwoToneIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Paper>
                ))
            }
        </List>
    );
}

export default OrderedFoodItems;