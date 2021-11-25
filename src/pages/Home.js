import { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import AuthContext from '../context/auth-context';

import { Container, Paper, Typography, Box, Grid } from '@mui/material';

function Home(props) {
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext.isLoggedIn;
    const location = useLocation();

    return (
        <Container 
            component="main" 
            maxWidth="md" 
            sx={{ mb: 4, mt: 30 }}
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
                        marginTop: 10,
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
                            Welcome
                        </Box>
                    </Typography>
                    { isLoggedIn &&
                        <Box  sx={{mb: 10}}>
                            <Typography 
                                    gutterBottom 
                                    component="div" 
                                    variant="h2" 
                                    align="center"
                                >
                                    {`{ ${location.state.username} }`}
                            </Typography>
                            <Box>
                                <Link to='/books' variant='body2'>Go to books catalogue page.</Link>
                            </Box>
                        </Box>
                        
                    }
                    { !isLoggedIn &&
                        <Box>
                            <Typography 
                                gutterBottom 
                                component="div" 
                                variant="h2" 
                                align="center"
                            >
                                {`{ guest }`}
                            </Typography>
                            <Grid 
                                container 
                                sx={{my: 8, mt: 18}}
                            >
                                <Grid 
                                    item
                                    xs="auto" 
                                    sx={{mr: 14}}
                                >
                                    <Link to="/login" variant="body2">Have an account? Sign in!</Link>
                                </Grid>
                                <Grid 
                                    item 
                                    xs="auto" 
                                    sx={{ml: 14}}
                                >
                                    <Link to="/register" variant="body2">Register a new account.</Link>
                                </Grid>
                            </Grid>
                        </Box>
                    }
                </Box>
            </Paper>
        </Container>
    );
}

export default Home;