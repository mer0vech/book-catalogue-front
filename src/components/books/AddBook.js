import { Box, Typography } from '@mui/material';

function AddBook() {
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Box sx={modalStyle}>
            <Typography id="modal-add-book" variant="h6" component="h2">
                Add a new book
            </Typography>

        </Box>
    );
}

export default AddBook;