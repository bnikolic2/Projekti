import React, { useState } from 'react';
import { Typography, Paper, Stack, Button, Rating } from '@mui/material';
import useSWR from 'swr';
import axios from 'axios';
import useSession from '../../hooks/useSession';
import CustomDialog from '../../components/CustomDialog';
import useErrorAlert from '../../hooks/useErrorAlert';

const MojiUpiti = () => {

    const { session } = useSession();
    const showError = useErrorAlert();

    /////////////////////////////////////////////////////////////////////////////////////

    const { data, isLoading, error, mutate } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/upiti`, (url) => axios.get(url, { withCredentials: true, auth: { username: session.korisnik.username, password: session.korisnik.password } }).then(res => res.data));

    /////////////////////////////////////////////////////////////////////////////////////

    const [openOcijeniDialog, setOpenOcijeniDialog] = useState(false);
    const [ocjena, setOcjena] = useState(0);
    const [ocjenjenUpit, setOcjenjenUpit] = useState(null);

    const handleOcijeni = (upit) => {
        setOcjenjenUpit(upit);
        setOpenOcijeniDialog(true);
    };

    const onSubmitOcijeni = async () => {
        if (!ocjena || (ocjena < 1 && ocjena > 5)) {
            showError("Ocjena može biti samo u rasponu [1, 5]");
            return;
        }

        // Unesi novu ocijenu za upit
        const sendData = {
            idObjavljaca: ocjenjenUpit.oglas.profil.id,
            rating: ocjena,
        };
        console.log(sendData);
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/profil/rejting`, sendData, {
                withCredentials: true,
                auth: {
                    username: session.korisnik.username,
                    password: session.korisnik.password,
                }
            });
            alert('Uspješno ocjenjen student');
        } catch (err) {
            showError("Dogodila se greška, pokušajte ponovno!");
        }

        // Obriši upit
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/upiti/delete`, {
                data: { id: ocjenjenUpit.id },
                withCredentials: true,
                auth: {
                    username: session.korisnik.username,
                    password: session.korisnik.password,
                }
            });
            mutate();
        } catch (err) {
            showError("Dogodila se greška, pokušajte ponovno!");
        }


        setOcjenjenUpit(null);
    };

    /////////////////////////////////////////////////////////////////////////////////////

    if (isLoading) return <p>Učitavanje upita</p>;
    else if (error) return <b>Dogodila se greška!</b>;
    else if (!data) return <p>Ne postoje korisnikovi upiti</p>;
    else if (session.korisnik.moderator) return undefined;
    return (
        <>
            <CustomDialog
                open={openOcijeniDialog}
                handleClose={() => setOpenOcijeniDialog(false)}
                title={'Ocijeni studenta'}
                text={'1 do 5 zvijezda'}
                submitText={'Ocijeni'}
                submitAction={onSubmitOcijeni}
            >
                <Rating 
                    value={ocjena}
                    onChange={(e, newValue) => setOcjena(newValue)}
                />
            </CustomDialog>
            <Paper sx={{ padding: '3rem', width: '100%' }}>
                <Typography variant='h5'>Status mojih upita</Typography>
                <br />
                { data.length > 0 ? 
                    <Stack direction='column' spacing='1rem'>
                        {data.map((item, index) => (
                            <Paper sx={{ padding: '1.5rem', backgroundColor: 'var(--gray)' }} key={index}>
                                <Stack direction='column' spacing='1rem' justifyContent='center'>
                                    <Typography><b>Naslov: </b>{item.oglas.naslov}</Typography>
                                    <Typography><b>Kolegij: </b> {item.oglas.kolegij.nazivKolegija}</Typography>
                                    <Typography sx={{ flex: 1 }}><b>Objavljivač: </b>{item.oglas.profil.korisnik.username}</Typography>
                                    <Typography><b>Status: </b>
                                        <span style={{ color: (item.status === 'ODBIJEN' ? 'red' : ((item.status === 'U_TIJEKU') ? 'yellow' : 'greenyellow')) }}>
                                            {item.status}
                                        </span>
                                    </Typography>
                                    {item.status === 'PRIHVACEN' &&
                                        <div>
                                            <Button variant='contained' onClick={() => handleOcijeni(item)}>Ocijeni</Button>
                                        </div>
                                    }
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                    : <Typography variant='h6'>Nema upita</Typography>
                }
            </Paper>
        </>
    );
};

export default MojiUpiti;