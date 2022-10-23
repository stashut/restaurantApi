import React from 'react';
import {useState, useEffect} from "react";
import {createApiEndpoint, ENDPOINT} from "../../api";
import {IconButton, InputBase, List, ListItem, ListItemText, Paper, makeStyles, ListItemSecondaryAction } from "@material-ui/core";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex: 1,
    },
    listRoot: {
        marginTop: theme.spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',
        },
        '& .MuiButtonBase-root': {
            display: 'none'
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
        },

    }
}))

function SearchFoodItem(props) {

    const { addFoodItem } = props;

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
            <List className={classes.listRoot}>
                {
                    searchList.map((item, index) => (
                        <ListItem
                            key={index}>
                            <ListItemText
                                primary={item.foodItemName}
                                secondary={'$' + item.price} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={e=> addFoodItem(item)}>
                                    <PlusOneIcon />
                                    <ArrowForwardIcon />
                                </IconButton>
                            </ListItemSecondaryAction>

                        </ListItem>
                    ))
                }
            </List>
        </>
    );
}

export default SearchFoodItem;