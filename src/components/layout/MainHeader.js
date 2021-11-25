import { useContext } from 'react';

import { Link, useHistory } from 'react-router-dom';

import AuthContext from '../../context/auth-context';

import { AppBar, Toolbar, Typography, Box, IconButton, MenuItem } from '@mui/material';
import { Login, Logout, PersonAdd } from '@mui/icons-material';

function MainHeader() {
    const authContext = useContext(AuthContext);
    const history = useHistory();

    const isLoggedIn = authContext.isLoggedIn;

    const logoutHandler = () => {
        authContext.logout();
    };

    const loginHandler = () => {
        history.push('/login');
    };

    const registerHandler = () => {
        history.push('/register');
    };

    const booksHandler = () => {
        history.push('/books');
    };

    return (
        <AppBar position="fixed" sx={{zIndex:1301}}>
            <Toolbar>
                <MenuItem component={Link} to='/' >
                    <Typography 
                        variant="h3" 
                        color="inherit"
                        sx={{p: 2}}
                    >
                        Book Catalogue
                    </Typography>
                </MenuItem>
                
                <Box sx={{
                    marginLeft: "auto",
                    marginRight: 5
                }}
                >
                    {
                        !isLoggedIn && (
                            <IconButton 
                                size="small" 
                                color="secondary" 
                                sx={{mr: 3, color: "white"}} 
                                onClick={loginHandler}
                            >
                                <Login sx={{fill: "white"}} />&nbsp;Sign In
                            </IconButton>
                        )
                    }
                    {
                        !isLoggedIn && (
                            <IconButton
                                size="small" 
                                color="secondary" 
                                sx={{color: "white"}}
                                onClick={registerHandler}
                            >
                                <PersonAdd sx={{fill: "white"}} />&nbsp;Sign Up
                            </IconButton>
                        )
                    }
                    {
                        isLoggedIn && (
                            <IconButton 
                                size="small" 
                                color="secondary" 
                                sx={{mr: 3, color: "white"}} 
                                onClick={booksHandler}
                            >
                                <Login sx={{fill: "white"}} />&nbsp;Books
                            </IconButton>
                        )
                    }
                    {
                        isLoggedIn && (
                            <IconButton 
                                size="small" 
                                color="secondary" 
                                sx={{color: "white"}}
                                onClick={logoutHandler}
                            >
                                <Logout sx={{fill: "white"}} />&nbsp;Log Out
                            </IconButton>
                        )
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default MainHeader;