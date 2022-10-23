import React from 'react';
import {useState, useEffect} from "react";
import {createApiEndpoint, ENDPOINT} from "../../api";
import {List, ListItem, ListItemText} from "@material-ui/core";


function SearchFoodItem(props) {

    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        createApiEndpoint(ENDPOINT.FOODITEM).fetchAll()
            .then(res => {
                setFoodItems(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <List>
            {
                foodItems.map( (item,index) => (
                    <ListItem
                        key={index}>
                        <ListItemText
                            primary={item.foodItemName}
                            secondary={'$'+item.price}
                        />
                    </ListItem>
                ))
            }
        </List>
    );
}

export default SearchFoodItem;