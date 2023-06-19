import React from 'react';
import { Typography, Paper, Stack, Button } from '@mui/material';
import useSWR from 'swr';
import axios from 'axios';
import useSession from '../../hooks/useSession';
import useErrorAlert from '../../hooks/useErrorAlert';

const UpitiNaMojeOglase = () => {

    const { session } = useSession();
    const showError = useErrorAlert();

    const { data, isLoading, error, mutate } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/upiti/objavljac`, (url) => axios.get(url, { withCredentials: true, auth: { username: session.korisnik.username, password: session.korisnik.password } }).then(res => res.data));

    /////////////////////////////////////////////////////////////////////////

    // akcija true ili false ovisno ako je prihvacen ili ne
    const handleUpit = async (akcija, id) => {

        const data = {
            idUpita: id,
            noviStatus: akcija ? 'PRIHVACEN' : 'ODBIJEN',
        };

        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/upiti/edit`, data, {
                withCredentials: true,
                auth: {
                    username: session.korisnik.username,
                    password: session.korisnik.password,
                }
            });
            mutate();
        } catch (err) {
            showError("Dogodila se pogreška!");
        }
    };

    /////////////////////////////////////////////////////////////////////////

    if (isLoading) return <p>Učitavanje upita na moje oglase</p>;
    else if (error) return <b>Dogodila se greška!</b>;
    else if (!data) return <p>Ne postoje moji upiti</p>;
    else if (session.korisnik.moderator) return undefined;
    // Prikazuj oglase samo koji su u tijeku i mogu se prihvatit ili odbit
    const filteredData = data.filter(upit => upit.status === 'U_TIJEKU');
    return (
        <Paper sx={{ padding: '3rem', width: '100%' }}>
            <Typography variant='h5'>Upiti na moje oglase</Typography>
            <br />
            {filteredData.length > 0 ? 
                <Stack direction='column' spacing='1rem'>
                    {filteredData.map((item, index) => (
                        <Paper sx={{ padding: '1.5rem', backgroundColor: 'var(--gray)' }} key={index}>
                            <Typography variant='h5'>{item.profil.korisnik.username}</Typography>
                            <br />
                            <Typography>{item.poruka}</Typography>
                            <br />
                            {item.status == 'U_TIJEKU' ?
                                <Stack direction='row' justifyContent='end' spacing='1rem'>
                                    <Button variant='contained' color='success'
                                        onClick={() => handleUpit(true, item.id)}>
                                        Prihvati
                                    </Button>
                                    <Button variant='contained' color='secondary'
                                        onClick={() => handleUpit(false, item.id)}>
                                        Odbij
                                    </Button>
                                </Stack>
                                : undefined
                            }
                        </Paper>
                    ))}
                </Stack>
                : <Typography variant='h6'>Nema upita</Typography>
            }
        </Paper>
    );
};

export default UpitiNaMojeOglase;