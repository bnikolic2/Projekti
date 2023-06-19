import React, { useState } from 'react';
import { Button, Paper, Typography, Stack, CircularProgress } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import Logo from '../components/Logo';
import PageContent from '../components/PageContent';
import { ControlledPasswordTextField } from '../components/PasswordTextField';
import ControlledTextField from '../components/ControlledTextField';
import Loading from '../components/Loading';

import useSession from '../hooks/useSession';

const LoginPage = () => {

    const navigateTo = useNavigate();
    const { session, setSession } = useSession();

    //////////////////////////////////////////////////////////////////

    const { control, handleSubmit, setValue } = useForm();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setError(null);
        console.log(data);

        const auth = {
            username: data.usernameOrEmail.trim(),
            password: data.password,
        };
        try {
            setLoading(true);

            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/korisnici/login", {
                withCredentials: true,
                auth: auth,
            });

            if (res.data.potvrdenaRegistracija) {
                localStorage.setItem('auth', JSON.stringify(auth));
                setSession({
                    exists: true,
                    ...res.data,
                });

                navigateTo('/');
            } else {
                setError("Potrebna verifikacija računa!");
            }
        } catch (err) {
            setError("Netočan username ili password!");
            // Izbriši polje password
            setValue('password', '');
        } finally {
            setLoading(false);
        }
    };

    //////////////////////////////////////////////////////////////////

    const handleRegisterClick = () => {
        navigateTo('/registracija');
    };

    //////////////////////////////////////////////////////////////////

    // Ako još nismo provjerili ako korisnik je registriran ili ne
    if (session.exists === null) return <Loading />;
    // Ako smo saznali da je
    else if (session.exists === true) return <Navigate to={'/'} />;
    // Ako nije
    return (
        <main>
            <PageContent centerX={true} centerY={true} my={'2rem'}>
                <Logo />

                <Paper sx={{ padding: '3rem' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack direction='column' spacing='1rem'>
                            <ControlledTextField variant='outlined' label='Username' control={control} name='usernameOrEmail' defaultVal={''} required />
                            <ControlledPasswordTextField label={'Password'} control={control} name='password' defaultVal='' />
                            {loading ?
                                <Stack direction='row' justifyContent='center'>
                                    <CircularProgress />
                                </Stack>
                                :
                                <Button variant='contained' type='submit' sx={{ padding: '0.6rem', width: '100%' }}>Login</Button>
                            }
                        </Stack>
                        <Stack direction='column' alignItems='center'>
                            <Typography color='red'>
                                {error}
                            </Typography>
                        </Stack>
                        <br />
                        <br />
                        <Button variant='contained' sx={{ padding: '0.6rem', width: '100%' }} color='secondary' onClick={handleRegisterClick}>
                            <Typography>Nemaš račun?</Typography>
                        </Button>
                    </form>
                </Paper>
            </PageContent>
        </main >
    );
};

export default LoginPage;