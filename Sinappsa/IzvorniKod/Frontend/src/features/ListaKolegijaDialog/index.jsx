import { Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import FullScreenDialog from '../../components/FullScreenDialog';
import DodajKolegijDialog from '../DodajKolegijDialog';
import PromijeniKolegijDialog from '../PromijeniKolegijDialog';
import useSession from '../../hooks/useSession';
import useErrorAlert from '../../hooks/useErrorAlert';

const ListaKolegijaDialog = ({ open, handleClose }) => {

    const [openDodajKolegijDialog, setOpenDodajKolegijDialog] = useState(false);
    const [openPromijeniKolegijDialog, setOpenPromijeniKolegijDialog] = useState(false);

    const [searchField, setSearchField] = useState('');
    const [trazeniKolegij, setTrazeniKolegij] = useState(null);

    const { session } = useSession();
    const showError = useErrorAlert();

    const { data, isLoading, error, mutate } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/kolegij/all`);

    const handleDodajKolegij = () => {
        setOpenDodajKolegijDialog(true);
    };

    const handlePromijeniKolegij = (kolegij) => {
        setTrazeniKolegij(kolegij);
        setOpenPromijeniKolegijDialog(true);
    };

    const handleObrisiKolegij = async (id) => {
        //obrisi kolegij
        const sendData = {
            idKolegija: id,
        };

        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/kolegij/delete`, { data: { ...sendData }, 
                withCredentials: true,
                auth: {
                    username: session.korisnik.username,
                    password: session.korisnik.password,
                }
            });
            alert("Uspješno izbrisan kolegij!");
            mutate();
        } catch (err) {
            showError("Dogodila se pogreška!");
        }
    };

    if (isLoading) return <p>Učitavanje kolegija</p>;
    else if (error) return <b>Dogodila se greška!</b>;
    else if (!data) return <b>Greška pri učitavanju kolegija</b>;
    return (
        <FullScreenDialog
            open={open}
            handleClose={handleClose}
            title={'Lista kolegija'}
        >
            {trazeniKolegij &&
                <PromijeniKolegijDialog open={openPromijeniKolegijDialog}
                    handleClose={() => setOpenPromijeniKolegijDialog(false)} naziv={trazeniKolegij.nazivKolegija}
                    smjer={trazeniKolegij.smjer} id={trazeniKolegij.id} refreshList={mutate}
                />
            }
            <DodajKolegijDialog open={openDodajKolegijDialog} handleClose={() => setOpenDodajKolegijDialog(false)} refreshList={mutate} />
            <Stack direction='column' spacing='2rem'>
                <Grid container rowSpacing='1rem' columnSpacing='2rem'>
                    <Grid item xs={12} md={3}>
                        <Stack>
                            <Button sx={{ padding: '1rem' }} color='secondary' variant='contained' onClick={handleDodajKolegij}>
                                Dodaj kolegij
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Stack>
                            <TextField label={'Pretraži kolegije'} onChange={e => setSearchField(e.target.value)} />
                        </Stack>
                    </Grid>
                </Grid>
                {data.length > 0 ?
                    <Stack direction='column' spacing='1rem'>
                        {data.filter(kolegij => kolegij.nazivKolegija.toLowerCase().includes(searchField.toLowerCase())).map((kolegij, index) => (
                            <Paper key={index} sx={{ backgroundColor: '#383838', padding: '2rem' }}>
                                <Grid container alignItems='center' columnSpacing='1rem' rowSpacing='1rem'
                                    justifyContent='center'>
                                    <Grid item xs={12} md={5}>
                                        <Typography variant='h5' fontWeight='bold' sx={{ textDecoration: 'underline' }}>
                                            {kolegij.nazivKolegija}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        {kolegij.smjer.nazivSmjera}
                                    </Grid>
                                    <Grid item xs={12} md={1.5}>
                                        <Stack>
                                            <Button variant='contained' color='primary'
                                                onClick={() => handlePromijeniKolegij(kolegij)}>
                                                Promijeni
                                            </Button>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={1.5}>
                                        <Stack>
                                            <Button variant='contained' color='secondary' onClick={() => handleObrisiKolegij(kolegij.id)}>
                                                Obriši
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Stack>
                    : <Stack direction='row' justifyContent={'center'}>
                        <Typography variant='h6'>Nema kolegija s tim nazivom</Typography>
                    </Stack>
                }
            </Stack>
        </FullScreenDialog>
    );
};

export default ListaKolegijaDialog;