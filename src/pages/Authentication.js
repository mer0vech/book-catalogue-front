import Container from '@mui/material/Container';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

function Authentication({login, ...props}) {
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            {login && <Login />}
            {!login && <Register />}
        </Container>
    );
}

export default Authentication;