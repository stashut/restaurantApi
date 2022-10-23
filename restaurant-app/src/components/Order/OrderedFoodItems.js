import React from 'react';
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper} from "@material-ui/core";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";

function OrderedFoodItems(props) {

    const {orderedFoodItems, removeFoodItem} = props

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