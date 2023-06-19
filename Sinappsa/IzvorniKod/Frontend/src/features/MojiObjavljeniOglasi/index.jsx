import React from 'react';
import { Typography, Paper, Stack } from '@mui/material';
import useSWR from 'swr';
import axios from 'axios';
import useSession from '../../hooks/useSession';
import EditOglas from '../EditOglas';

const MojiObjavljeniOglasi = () => {

    const { session } = useSession();

    const { data, isLoading, error, mutate } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/oglasi/dohvati/korisnik`, (url) => axios.get(url, { withCredentials: true, auth: { username: session.korisnik.username, password: session.korisnik.password } }).then(res => res.data));

    /////////////////////////////////////////////////////////////////////////////////////

    if (isLoading) return <p>Učitavanje smjerova</p>;
    else if (error) return <b>Dogodila se greška!</b>;
    else if (!data) return <p>Ne postoje korisnikovi upiti</p>;
    else if (session.korisnik.moderator) return undefined;
    return (
        <Paper sx={{ padding: '3rem', width: '100%' }}>
            <Typography variant='h5'>Moji objavljeni oglasi</Typography>
            <br />
            {data.length > 0 ?
                <Stack direction='column' spacing='1rem'>
                    {data.map((item, index) => (
                        <EditOglas
                            key={index}
                            objavljivac={item.profil}
                            {...item}
                            mutate={mutate}
                        />
                    ))}
                </Stack>
                : <Typography variant='h6'>Nema objavljenih oglasa</Typography>
            }
        </Paper>
    );
};

export default MojiObjavljeniOglasi;