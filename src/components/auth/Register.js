import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Formik } from 'formik';
import * as Yup from 'yup';

import useFetch from '../../hooks/use-fetch';

import { Grid, LinearProgress } from '@mui/material';

import FormContainer from './FormContainer';
import FormInput from '../ui/FormInput';
import FormButton from '../ui/FormButton';
import Spinner from '../ui/Spinner';

function Register() {
    const { isLoading, error, sendRequest } = useFetch();
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [progressColor, setProgressColor] = useState("red");
    const history = useHistory();

    useEffect(() => {
        if(error) {
            history.push('/error', { error: JSON.parse(error) });
        }
    }, [error, history]);

    const registerResponseHandler = (serverData) => {
        if(serverData.status.ok) {
            history.replace('/'); 
        } else {
            console.log('Error!');
        }
    };

    const passwordStrengthChecker = (password) => {
        let strength = 0;
        if(password) {
            let length = password.length;
            let quarter = Math.ceil(length / 4);

            if(length >= 1) strength += 16;
            if(/^(?=(.*[a-z]){2})/.test(password)) strength += 17;
            if(/^(?=(.*[A-Z]){2})/.test(password)) strength += 17;
            if(/^(?=.*[0-9])/.test(password)) strength += 16;
            if(/^(?=.*[!@#$%^&*()\-_=+{};:,<.>])/.test(password)) strength += 17;
            if(/^(?=.{12,})/.test(password)) strength += 17;

            password = password.split('').sort().join('');
            const repeating = new RegExp('(.)\\1{' + quarter + '}');

            if(repeating.test(password)) strength -= 16;

        }
        setPasswordStrength(strength);
        if(strength < 60) {
            setProgressColor("red");
            return false;
        } else if(strength >= 60 && strength < 85) {
            setProgressColor("yellow");
            return true;
        } else {
            setProgressColor("green");
            return true;
        }
    };

    const registrationValidationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required!')
            .min(4, 'Username must be at least 4 character long!')
            .max(20, 'Username must not be more than 20 characters long!')
            .test('usernameExists', 'Username already exists!', async (value) => {
               let response = await fetch(`http://localhost:3081/app/checkUsername/${value}`)
                .then(res => res.json())
                .then(data => data);
                return !response.body;
            })
            .required('Username is required!'),
        password: Yup.string()
            .required('Password is required!')
            .test('passwordTest', null, (value) => {
                return passwordStrengthChecker(value);
            }),
        confirmPassword: Yup.string()
            .required("Please confirm your password!")
            .test('passwordCheck', 'Passwords must match!', function(value) {
                return this.parent.password === value;
            })
    });

    return (
        <FormContainer login={false}>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                    confirmPassword: ""
                }}

                validationSchema = {registrationValidationSchema}

                onSubmit={async (values, { setSubmitting }) => {
                    let request = {
                        url: 'http://localhost:3081/app/register',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: {
                            username: values.username,
                            password: values.password
                        }
                    }
                    sendRequest(request, registerResponseHandler);
                    setSubmitting(false);
                }}
            >
                {
                    ({handleSubmit, handleChange, errors, touched}) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2} sx={{my: {xs: 1, md: 2}}}>
                                <Grid item xs={12}>
                                    <FormInput
                                        name="username"
                                        type="text"
                                        label="Username"
                                        onChange={handleChange}
                                        error={Boolean(errors.username || touched.username)}
                                        helperText={Boolean(errors.username || touched.username) ? errors.username : null}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInput
                                        name="password"
                                        type="password"
                                        label="Password"
                                        onChange={handleChange}
                                        error={Boolean(errors.pasword || touched.password)}
                                        helperText={Boolean(errors.password || touched.password) ? errors.password : null}
                                    />
                                    <LinearProgress sx={{bgcolor: "white", barColorPrimary: '#00ff00' }} variant="determinate" value={passwordStrength} />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInput
                                        name="confirmPassword"
                                        type="password"
                                        label="Confirm Password"
                                        onChange={handleChange}
                                        error={Boolean(errors.confirmPassword || touched.confirmPassword)}
                                        helperText={Boolean(errors.confirmPassword || touched.confirmPassword) ? errors.confirmPassword : null}
                                    />
                                   
                                </Grid>
                                { isLoading && <Spinner /> }
                                { !isLoading && 
                                    <Grid item xs={12}>
                                        <FormButton 
                                            label="SIGN UP"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        />
                                    </Grid>
                                }
                                { !isLoading &&
                                    <Grid item xs={12}>
                                        {'Already have an account? '}
                                        <Link
                                            to='/login' 
                                        >
                                            {'Sign in!'}
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

export default Register;