import React, { useState } from 'react';

import { Box, Toolbar } from '@mui/material';

import Sidebar from '../components/layout/Sidebar';
import Book from '../components/ui/Book';

function Books(props) {
    const [data, setData] = useState([]);;

    const handleData = (value) => {
        setData(value);
    };

    return (
        <React.Fragment>
            <Sidebar data={data} onChange={handleData}/>
            <Box>
                <Toolbar />
                <Box 
                    component="main" 
                    sx={{ p: 3, ml: 30, mt: 5 }} 
                    display="flex" 
                    alignItems="flex-start" 
                    flexWrap="wrap"
                >
                    { data.map(book => <Book key={book.id} book={book}/>) }
                </Box>
                
            </Box>
        </React.Fragment>
    );
}

export default Books;