import { useContext, useRef, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Formik } from 'formik';

import useFetch from '../../hooks/use-fetch';
import AuthContext from '../../context/auth-context';

import Grid from '@mui/material/Grid';

import FormContainer from './FormContainer';
import FormInput from '../ui/FormInput';
import FormButton from '../ui/FormButton';
import Spinner from '../ui/Spinner';

function Login() {
    const { isLoading, error, sendRequest } = useFetch();
    const userRef = useRef();
    const authContext = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if(error) {
            history.push('/error', { error: JSON.parse(error) });
        }
    }, [error, history]);

    const parseJwt = (token) => {
        return JSON.parse(atob(token.split('.')[1]));
    };

    const loginResponseHandler = (serverData) => {
        if(serverData.body.jwt) {
            const jwt = "Bearer " + serverData.body.jwt;
            const expirationTime = new Date(parseJwt(serverData.body.jwt).exp * 1000);
            authContext.login(jwt, expirationTime.toISOString(), userRef.current.value);
            history.replace('/', { username: userRef.current.value });
        } else {
            console.log("Error: " + serverData.body);
        }
    };

    return (
        <FormContainer login={true}>
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}

                onSubmit={async (values, { setSubmitting }) => {
                    let request = {
                        url: 'http://localhost:3081/app/login',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: {
                            username: values.username,
                            password: values.password
                        }
                    }

                    sendRequest(request, loginResponseHandler);
                    setSubmitting(false);
                }}
            >
                {
                    ({handleSubmit, handleChange}) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2} sx={{my: {xs: 1, md: 2}}}>
                                <Grid item xs={12}>
                                    <FormInput
                                        inputRef={userRef}
                                        name="username"
                                        type="text"
                                        label="Username"
                                        onChange={handleChange}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInput
                                        name="password"
                                        type="password"
                                        label="Password"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                { isLoading && <Spinner /> }
                                { !isLoading && 
                                    <Grid item xs={12}>
                                        <FormButton 
                                            label="SIGN IN"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        />
                                    </Grid>
                                }
                                { !isLoading &&
                                    <Grid item xs={12}>
                                        {'Don\'t have an account? '}
                                        <Link
                                            to='/register' 
                                        >
                                            {'Sign up!'}
                                        </Link>
                                    </Grid>
                                } 
                            </Grid>
                        </form>
                    )
                }
            </Formik>
        </FormContainer>
    );
}

export default Login;