import React, { useEffect, useState } from 'react';
import { Button, Grid, Stack, Typography, Paper } from '@mui/material';
import axios from 'axios';

import JaviSeDialog from './components/JaviSeDialog';
import ObrisiOglasDialog from './components/ObrisiOglasDialog';
import useSession from '../../../../hooks/useSession';
import useDesktop from '../../../../hooks/useDesktop';
import useErrorAlert from '../../../../hooks/useErrorAlert';

const PrikazOglasa = ({ id, kolegij, kategorija, naslov, opis, objavljivac }) => {

    const { session } = useSession();
    const showError = useErrorAlert();

    const [vecJavio, setVecJavio] = useState(false);

    const [openJaviSeDialog, setOpenJaviSeDialog] = useState(false);
    const [openObrisiOglasDialog, setOpenObrisiOglasDialog] = useState(false);

    /////////////////////////////////////////////////////////////////////////////////////

    const handleJaviSe = () => {
        setOpenJaviSeDialog(true);
    };

    const handleObrisiOglas = () => {
        setOpenObrisiOglasDialog(true);
    };

    /////////////////////////////////////////////////////////////////////////////////////

    // Saznaj na koje oglase je korisnik već odgovorio
    useEffect(() => {
        // Ako korisnik nije prijavljen return 
        if (!session.exists) return;

        // Inače provjeri oglas ako je već javljen
        (async () => {
            const sendData = {
                idProfil: session.id,
                idOglas: id,
            };

            try {
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/oglasi/upit`, sendData, {
                    withCredentials: true,
                    auth: {
                        username: session.korisnik.username,
                        password: session.korisnik.password,
                    }
                });
                setVecJavio(res.data);
            } catch (err) {
                showError("Dogodila se greška, pokušajte ponovno!");
            }

        })();
    }, []);

    /////////////////////////////////////////////////////////////////////////////////////

    return (
        <Paper sx={{ padding: '1.5rem', backgroundColor: 'var(--gray)' }}>
            <ObrisiOglasDialog open={openObrisiOglasDialog} handleClose={() => setOpenObrisiOglasDialog(false)} id={id} />
            <JaviSeDialog open={openJaviSeDialog} handleClose={() => setOpenJaviSeDialog(false)} idOglasa={id} />
            <Grid container rowSpacing={{ xs: 2 }}>
                <Grid item xs={12}>
                    <Stack direction={useDesktop() ? 'row' : 'column'} gap='1rem' justifyContent='end'>
                        <Typography variant='caption'
                            sx={{ padding: '0.5rem', backgroundColor: 'var(--dark)', borderRadius: '0.3rem' }}>
                            {kolegij.smjer.nazivSmjera}
                        </Typography>
                        <Typography variant='caption'
                            sx={{ padding: '0.5rem', backgroundColor: 'var(--dark)', borderRadius: '0.3rem' }}>
                            {kolegij.nazivKolegija}
                        </Typography>
                        <Typography variant='caption'
                            sx={{ padding: '0.5rem', backgroundColor: 'var(--dark)', borderRadius: '0.3rem' }}>
                            {kategorija.nazivKategorije}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5' fontWeight='bold' sx={{ textDecoration: 'underline' }}>{naslov}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{opis}</Typography>
                </Grid>
            </Grid>
            <Grid container rowSpacing={2} alignItems='center'>
                <Grid item xs={12} md={6}>
                    <Typography><b>Objavljivač:</b> {objavljivac.korisnik.username}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    {session.exists && !session.korisnik.moderator ?
                        <Stack direction='row' justifyContent='end'>
                            <Button variant='contained' onClick={() => handleJaviSe(id)}
                                sx={{ display: (!session.exists || (session.id === objavljivac.id) || vecJavio) ? 'none' : undefined, }}>Javi se
                            </Button>
                            <Typography variant='button' sx={{ display: ((session.id === objavljivac.id)) ? undefined : 'none' }}>Moj oglas</Typography>
                            <Typography variant='button' sx={{ display: (vecJavio && (session.id !== objavljivac.id)) ? undefined : 'none' }}>Već javljen</Typography>
                        </Stack>
                        : undefined
                    }
                </Grid>
                {session.exists && session.korisnik.moderator ?
                    <Grid item xs={12}>
                        <Stack direction='row' justifyContent='end' spacing='1rem'>
                            <Button variant='contained' color='secondary' onClick={() => handleObrisiOglas(id)}>Obriši oglas</Button>
                        </Stack>
                    </Grid>
                    : undefined
                }
            </Grid>
        </Paper>
    );
};

export default PrikazOglasa;