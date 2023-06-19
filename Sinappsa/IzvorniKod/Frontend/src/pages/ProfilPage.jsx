import React, { useState } from 'react';
import { Typography, Paper, Stack, Button, Grid, Avatar, Box } from '@mui/material';
import { Navigate } from 'react-router-dom';

import useSession from '../hooks/useSession';

import Header from '../components/Header';
import PageContent from '../components/PageContent';
import Loading from '../components/Loading';
import AvatarSelector from '../components/AvatarSelector';

import ChangePasswordDialog from '../features/ChangePasswordDialog';
import ChangePodaciDialog from '../features/ChangePodaciDialog';
import useErrorAlert from '../hooks/useErrorAlert';
import axios from 'axios';
import MojiUpiti from '../features/MojiUpiti';
import UpitiNaMojeOglase from '../features/UpitiNaMojeOglase';
import MojiObjavljeniOglasi from '../features/MojiObjavljeniOglasi';

const ProfilPage = () => {

    const { session, setSession } = useSession();
    const showError = useErrorAlert();

    const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
    const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
    const [openChangePodaciDialog, setOpenChangePodaciDialog] = useState(false);

    /////////////////////////////////////////////////////////////////////////////////////

    const handleAvatarChange = () => {
        setOpenAvatarDialog(true);
    };

    const handleAvatarChangeSelect = async (avatar) => {
        console.log(`New avatar is: ${avatar}`);

        setSession(session => {
            session.avatar = avatar;
            return session;
        });

        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/profil/avatar`, { avatar: avatar }, {
                withCredentials: true,
                auth: {
                    username: session.korisnik.username,
                    password: session.korisnik.password,
                }
            });

        } catch (err) {
            showError("Dogodila se pogreška!");
        }
    };

    const handlePasswordChange = () => {
        setOpenChangePasswordDialog(true);
    };

    const handlePodaciChange = () => {
        setOpenChangePodaciDialog(true);
    };

    /////////////////////////////////////////////////////////////////////////////////////

    if (session.exists === null) return <Loading />;
    else if (session.exists === false) return <Navigate to={'/prijava'} />;
    return (
        <main className='circuitBackground'>
            <Header />
            <PageContent centerX={true} my='2rem'>
                <AvatarSelector open={openAvatarDialog} handleClose={() => setOpenAvatarDialog(false)} onSelect={handleAvatarChangeSelect} />
                <ChangePasswordDialog open={openChangePasswordDialog} handleClose={() => setOpenChangePasswordDialog(false)} />
                <ChangePodaciDialog open={openChangePodaciDialog} handleClose={() => setOpenChangePodaciDialog(false)} />
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ padding: '3rem', width: '100%' }}>
                        <Grid container spacing='4rem'>
                            <Grid item xs={12} md={6}>
                                <Stack direction='column' justifyContent='center' alignItems='center' spacing='1rem'>
                                    <Avatar
                                        alt='userImage'
                                        sx={{ color: 'white', width: '96px', height: '96px' }}
                                        src={session.avatar}
                                    >
                                    </Avatar>
                                    <Button variant='contained' onClick={handleAvatarChange}>Promijeni avatar</Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack direction='row'>
                                    <Stack direction='column' spacing='1rem' flex='1'>
                                        <Typography variant='h4'>{session.korisnik.username}</Typography>
                                        <Typography>{session.ime}</Typography>
                                        <Typography>{session.prezime}</Typography>
                                        <Typography>{session.korisnik.email}</Typography>
                                    </Stack>
                                    <div>
                                        <Button variant='contained' onClick={handlePodaciChange}>Promijeni podatke</Button>
                                    </div>
                                </Stack>
                                <br />
                                <Button variant='contained' color='secondary' onClick={handlePasswordChange}>Promijeni password</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                    <br />
                    <MojiUpiti />
                    <br />
                    <UpitiNaMojeOglase />
                    <br />
                    <MojiObjavljeniOglasi />
                </Box>
            </PageContent>
        </main>
    );
};

export default ProfilPage;