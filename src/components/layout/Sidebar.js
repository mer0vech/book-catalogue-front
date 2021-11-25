import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../../hooks/use-fetch';

import { ViewList } from '@mui/icons-material';
import { Drawer, Box, ListItem, List, Toolbar, ListItemText, Divider, Typography, Modal } from '@mui/material';

import AddBook from '../books/AddBook';

function Sidebar({data, onChange}) {
    const [openModal, setOpenModal] = useState(false);
    const { isLoading, error, sendRequest } = useFetch();
    const history = useHistory();

    useEffect(() => {
        if(error) {
            history.push('/error', { error: JSON.parse(error) });
        }
    }, [error, history]);

    const token = localStorage.getItem("token");
    const from = 1;
    const to = 10;

    let request = {
        url: `http://localhost:3081/app/books/${from}/${to}`,
        method: 'GET',
        headers: {
            'authorization': token
        }
    };

    const allBooksHandler = (serverData) => {
        let response = serverData.body.results;
        onChange(response);
    };

    const retrieveAllBooks = () => {
        sendRequest((request), allBooksHandler);
    };

    const handleClose = () => setOpenModal(false);
    const newBookHandler = () => setOpenModal(true);      

    return (
        <React.Fragment>
            <Drawer
                variant="permanent"
                sx={{
                width: 200,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box', mt: 0, pt: 5 },
                }}
            >
                <Toolbar />
                <Divider component="li" />
                <li>
                    <Typography
                        sx={{ mt: 0.5, ml: 2 }}
                        color="text.secondary"
                        display="block"
                        variant="caption"
                    >
                        All Books
                    </Typography>
                </li>
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem button key={'all'} onClick={retrieveAllBooks}>
                            <ViewList />&nbsp;
                            <ListItemText primary={'List All'} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button key={'add'} onClick={newBookHandler}>
                            <ListItemText primary={'Add New Book'} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Modal
                open={openModal}
                onClose={handleClose}
            >
                <AddBook />
            </Modal>
        </React.Fragment>
    );
}

export default Sidebar;