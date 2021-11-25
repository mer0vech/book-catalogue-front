import { useLocation } from 'react-router-dom';

import { Container, Paper, Typography, Box } from '@mui/material';

import doge from '../assets/doge.png';

function Error(props) {
    const location = useLocation();

    return (
        <Container 
            component="main" 
            maxWidth="md" 
            sx={{ mb: 4 }}
        >
            <Paper
                elevation={3}  
                sx={{ 
                    my: { 
                        xs: 3, 
                        md: 6 
                    }, 
                    p: {
                        xs: 2, 
                        md: 3 
                    } 
                }}
            >
                <Box 
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fontWeight: 'bold'
                    }}
                >
                    <Typography 
                        component="div" 
                    >
                        <Box
                            sx={{ 
                                fontWeight: 'bold',
                                fontSize: 'h1.fontSize',
                                m: 1 
                            }}
                        >
                            Wow! Such error!
                        </Box>
                    </Typography>
                    <Box>
                            <img src={doge} alt="doge error" />
                    </Box>
                    <Typography 
                        component="div" 
                    >
                        <Box
                            sx={{ 
                                fontWeight: 'bold',
                                fontSize: 'h3.fontSize',
                                m: 1 
                            }}
                        >
                            {location.state.error.status}, {location.state.error.text}
                        </Box>
                    </Typography>
                    <Typography 
                        component="div" 
                    >
                        <Box
                            sx={{ 
                                fontWeight: 'bold',
                                fontSize: 'h4.fontSize',
                                m: 1 
                            }}
                        >
                            {location.state.error.message}
                        </Box>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default Error;