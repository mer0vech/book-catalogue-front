import { 
    Paper, 
    Box, 
    CssBaseline, 
    Avatar, 
    Typography 
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function FormContainer(props) {
    return (
        <Paper 
            elevation={3}  
            sx={{ 
                my: { 
                    xs: 3, 
                    md: 24 
                }, 
                p: {
                    xs: 2, 
                    md: 12 
                }
            }}
        >
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar 
                    sx={{
                        m: 1, 
                        bgcolor: 'secondary.main' 
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography 
                    gutterBottom 
                    component="h1" 
                    variant="h4" 
                    align="center"
                >
                    {
                        (props.login && 'Login') || (!props.login && 'Register')
                    }
                </Typography>
            </Box>
            {props.children}
        </Paper>
    );
}

export default FormContainer;