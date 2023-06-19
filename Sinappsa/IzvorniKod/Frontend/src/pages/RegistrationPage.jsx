import React, { useState } from 'react';
import { Button, Grid, Paper, Typography, Stack, Avatar, CircularProgress } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { ControlledPasswordTextField } from '../components/PasswordTextField';
import PageContent from '../components/PageContent';
import Logo from '../components/Logo';
import AvatarSelector from '../components/AvatarSelector';
import ControlledTextField from '../components/ControlledTextField';
import Loading from '../components/Loading';

import useSession from '../hooks/useSession';

const RegistrationPage = () => {

    const navigateTo = useNavigate();

    const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const { session } = useSession();

    ////////////////////////////////////////////////////////////////////////////////////////////

    const { control, handleSubmit, setValue } = useForm();

    const onSubmit = async (data) => {
        setError(null);
        console.log(data);

        if (data.password !== data.repeatPassword) {
            setError('Password nije isti kao ponovljen!');
            return;
        }

        if (selectedAvatar === '') {
            setError('Nije izabran avatar!');
            return;
        }

        if (data.password.length < 10 || data.password.length > 100){
            setError('Lozinka mora biti između 10 i 100 znakova!');
            return;
        }

        if(data.email){
            let domain = data.email.split('@')[1];
            if(domain !== "fer.hr"){
                setError('Email nije iz fer.hr domene!');
                return;
            }
        }


        try {
            setLoading(true);

            await axios.post(import.meta.env.VITE_BACKEND_URL + "/korisnici/register", {
                email: data.email,
                username: data.username,
                password: data.password,
                moderator: false,
                ime: data.ime,
                prezime: data.prezime,
                avatar: selectedAvatar,
                ocjena: 0.0,
                potvrdenaRegistracija: false,
            });

            navigateTo('/prijava');
        } catch (err) {
            setError("Dogodila se greška, pokušajte ponovno!");
            // Izbriši polje password
            setValue('password', '');
            setValue('repeatPassword', '');
        } finally {
            setLoading(false);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////

    const handleChooseAvatar = () => {
        setOpenAvatarDialog(true);
    };

    const handleLoginClick = () => {
        navigateTo('/prijava');
    };

    ////////////////////////////////////////////////////////////////////////////////////////////

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
                        <AvatarSelector open={openAvatarDialog} handleClose={() => setOpenAvatarDialog(false)} onSelect={setSelectedAvatar} />
                        <Grid container spacing={{ xs: '1rem', md: '4rem' }}>
                            <Grid item xs={12} md={6}>
                                <Stack direction='column' spacing='1rem'>
                                    <ControlledTextField variant='outlined' label='E-mail' control={control} name='email' defaultVal={''} required />
                                    <ControlledTextField variant='outlined' label='Username' control={control} name='username' defaultVal={''} required />
                                    <ControlledTextField variant='outlined' label='Ime' control={control} name='ime' defaultVal={''} required />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack direction='column' spacing='1rem'>
                                    <ControlledTextField variant='outlined' label='Prezime' control={control} name='prezime' defaultVal={''} required />
                                    <ControlledPasswordTextField label={'Password'} control={control} name='password' defaultVal='' />
                                    <ControlledPasswordTextField label={'Confirm password'} control={control} name='repeatPassword' defaultVal='' />
                                </Stack>
                            </Grid>
                        </Grid>
                        <br />
                        <Stack direction='row' justifyContent='center' spacing='2rem'>
                            <Button variant='contained' onClick={handleChooseAvatar}>Izaberi avatar</Button>
                            <Avatar src={selectedAvatar} />
                        </Stack>
                        <br />
                        {loading ?
                            <Stack direction='row' justifyContent='center'>
                                <CircularProgress />
                            </Stack>
                            :
                            <Button variant='contained' type='submit' sx={{ padding: '0.6rem', width: '100%' }}>Register</Button>
                        }
                        {error &&
                            <Stack direction='column' alignItems='center'>
                                <Typography color='red'>
                                    {error}
                                </Typography>
                            </Stack>
                        }
                        <br />
                        <br />
                        <br />
                        <Button variant='contained' sx={{ padding: '0.6rem', width: '100%' }} color='secondary' onClick={handleLoginClick}>
                            <Typography>Već imaš račun?</Typography>
                        </Button>
                    </form>
                </Paper>
            </PageContent>
        </main >
    );
};
export default RegistrationPage;