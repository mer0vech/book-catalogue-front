import { Box, Typography } from '@mui/material';

function BookDetails() {
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
            <Typography id="modal-book-details" variant="h6" component="h2">
                Book Details
            </Typography>

        </Box>
    );
}

export default BookDetails;