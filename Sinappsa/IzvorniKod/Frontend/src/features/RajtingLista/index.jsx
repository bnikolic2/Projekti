import React from 'react';
import { Typography, Paper, Stack, Grid, Rating } from '@mui/material';
import useSWR from 'swr';

const RajtingLista = () => {

    const { data, isLoading, error } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/profil/list`);

    if (isLoading) return <p>Učitavanje rajting liste</p>;
    else if (error) return <b>Greška kod dohvaćanja rajting liste</b>;
    else if (!data) return <b>Rajting lista je undefined</b>;

    data.sort((a, b) => b.ocjena - a.ocjena);
    let rajtingLista = data.filter(profil => profil.ocjena > 0.0);
    // Limitiraj na top 10
    if (rajtingLista.length > 10) rajtingLista = rajtingLista.splice(0, 10);
    return (
        <Paper sx={{ padding: '3rem' }}>
            <Typography variant='h4'>Rating lista</Typography>
            <br />
            {rajtingLista.length == 0 ?
                <Typography variant='h5'>Nema registriranih studenata pomagača</Typography>
                : <Stack direction='column' spacing='1rem'>
                    {rajtingLista.map((item, index) => (
                        <Grid container key={index} alignItems='center'>
                            <Grid item xs={3} md={2}>
                                <Typography variant='h5'>{index + 1}.</Typography>
                            </Grid>
                            <Grid item xs={9} md={6}>
                                <Typography variant='h5' noWrap>{item.korisnik.username}</Typography>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Rating value={item.ocjena} precision={0.1} readOnly></Rating>
                            </Grid>
                        </Grid>
                    ))}
                </Stack>
            }
        </Paper>
    );
};

export default RajtingLista;