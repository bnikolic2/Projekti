import React, { useState, useEffect } from 'react';
import { Box, Paper, Stack, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

import PrikazOglasa from './components/PrikazOglasa';

const AktivniOglasi = ({ filtri }) => {

    const [oglasi, setOglasi] = useState([]);
    const [loading, setLoading] = useState(false);

    //////////////////////////////////////////////////////////////////////////////////

    // Filtri su { idKolegij: vrijednost, idSmjer: vrijednost, idKategorija: vrijednost }
    const getOglasi = async (filtri) => {
        
        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/oglasi/dohvati`, filtri, {
                withCredentials: true,
            });
            console.log(res.data);
            res.data.sort((a, b) => b.id - a.id);
            setOglasi(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    //////////////////////////////////////////////////////////////////////////////////

    // Inicijalno dobivanje oglasa
    useEffect(() => {
        getOglasi(filtri);
    }, [filtri]);

    //////////////////////////////////////////////////////////////////////////////////

    // Loading bar za ucitavanje oglasa
    if (loading) return (
        <Paper sx={{ padding: '3rem', maxHeight: '50rem', justifyContent: 'center', display: 'flex' }}>
            <CircularProgress />
        </Paper>
    );
    // Ucitani oglasi prikaz
    else return (
        <Paper sx={{ padding: '3rem', maxHeight: '50rem', overflow: 'auto' }}>
            <Typography variant='h4'>Aktivni oglasi</Typography>
            <br />
            {oglasi.length == 0 ?
                <Typography variant='h5'>Trenutno nema aktivnih oglasa</Typography>
                : <Stack direction='column' spacing='1rem'>
                    {oglasi.map((item, index) => (
                        <Box key={index}>
                            <PrikazOglasa
                                objavljivac={item.profil}
                                {...item}
                            />
                        </Box>
                    ))}
                </Stack>
            }
        </Paper>
    );
};

export default AktivniOglasi;