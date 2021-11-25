import { Box, CircularProgress } from '@mui/material';

function Spinner() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
}

export default Spinner;