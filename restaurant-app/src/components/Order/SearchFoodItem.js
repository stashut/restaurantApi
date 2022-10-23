import React from 'react';
import {useState, useEffect} from "react";
import {createApiEndpoint, ENDPOINT} from "../../api";
import {IconButton, InputBase, List, ListItem, ListItemText, Paper, makeStyles} from "@material-ui/core";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";

const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex: 1,
    }
}))

function SearchFoodItem(props) {

    const [foodItems, setFoodItems] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [searchList, setSearchList] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        createApiEndpoint(ENDPOINT.FOODITEM).fetchAll()
            .then(res => {
                setFoodItems(res.data)
                setSearchList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let x = [...foodItems];
        x = x.filter(y => {
            return y.foodItemName.toLowerCase().includes(searchKey.toLowerCase())
        });
        setSearchList(x);
    }, [searchKey]);
    

    return (
        <>
            <Paper className={classes.searchPaper}>
                <InputBase
                    className={classes.searchInput}
                    placeholder="Search food items"
                    value={searchKey}
                    onChange={e=> setSearchKey(e.target.value)}
                />
                <IconButton>
                    <SearchTwoToneIcon/>
                </IconButton>
            </Paper>
            <List>
                {
                    searchList.map((item, index) => (
                        <ListItem
                            key={index}>
                            <ListItemText
                                primary={item.foodItemName}
                                secondary={'$' + item.price}
                            />
                        </ListItem>
                    ))
                }
            </List>
        </>
    );
}

export default SearchFoodItem;