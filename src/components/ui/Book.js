import React, { useState } from 'react';

import { Card, Grid, Box, Button, Typography, Modal } from '@mui/material';

import { nanoid } from 'nanoid';

import BookDetails from '../books/BookDetails';

function Book({book}) {
    const [openModal, setOpenModal] = useState(false);

    const handleDetails = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    return (
        <React.Fragment>
            <Card 
                sx={{ 
                    minWidth: 250,
                    minHeight: 200, 
                    maxWidth: 250, 
                    maxHeigth: 200, 
                    p: 2, 
                    m: 2 
                }} 
                elevation={3}
            >
                <Grid 
                    container 
                    spacing={2} 
                    sx={{my: {xs: 1, md: 2}}} 
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs={12}>
                        <Typography 
                            variant="h5" 
                            color="inherit"
                            sx={{p: 1}}
                        >
                            <Box 
                                display="flex" 
                                alignItems="flex-start" 
                                flexWrap="wrap"
                            >
                                {book.title}
                            </Box>
                        </Typography>
                    </Grid>
                    { book.authors.map(author => <Grid key={nanoid()} item>{author}</Grid>)}
                    <Grid item xs={12}><Button onClick={handleDetails}>Details</Button></Grid>
                </Grid>
            </Card>
            <Modal
                open={openModal}
                onClose={handleClose}
            >
                <BookDetails />
            </Modal>
        </React.Fragment>
    );
}

export default Book;