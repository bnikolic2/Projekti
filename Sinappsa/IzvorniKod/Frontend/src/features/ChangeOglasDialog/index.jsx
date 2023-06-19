import React from 'react';
import { Stack, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import ControlledTextField from '../../components/ControlledTextField';
import FullScreenDialog from '../../components/FullScreenDialog';
import SelectSmjer from '../../components/SelectSmjer';
import SelectKolegij from '../../components/SelectKolegij';
import SelectKategorija from '../../components/SelectKategorija';
import useErrorAlert from '../../hooks/useErrorAlert';
import useSession from '../../hooks/useSession';

const ChangeOglasDialog = ({ open, handleClose, idOglasa, kolegij, kategorija, naslov, opis, objavljivac, mutate }) => {

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            smjer: kolegij.smjer,
            kolegij: kolegij,
            kategorija: kategorija,
        }
    });

    const showError = useErrorAlert();
    const { session } = useSession();

    const onSubmit = async (data) => {
        console.log(data);

        // TODO bazi posalji nove podatke i zovi mutate oglasa
        if (data.naslov == '' || data.opis == '' || data.kategorija == '' || data.kolegij == '' || data.smjer == '') {
            showError('Sva polja moraju biti popunjena');
            return;
        }
        else if (data.naslov.length < 10 || data.naslov.length > 60) {
            showError("Naslov mora biti u rasponu od [10, 60]!");
            return;
        }

        const sendData = {
            id: idOglasa,
            naslov: data.naslov,
            opis: data.opis,
            idPomagaca: objavljivac.id,
            idKolegija: data.kolegij.id,
            idKategorije: data.kategorija.id,
        };

        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/oglasi/edit`, sendData, {
                withCredentials: true,
                auth: {
                    username: session.korisnik.username,
                    password: session.korisnik.password,
                }
            });
            alert('Uspješno promjenjen oglas!');
            mutate();
        } catch (err) {
            showError("Dogodila se greška, pokušajte ponovno!");
        }
    };

    return (
        <FullScreenDialog
            open={open}
            handleClose={handleClose}
            title={'Uredi oglas'}
            buttonText={'Pohrani'}
            forForm={'editOglasForm'}
        >
            <form id='editOglasForm' onSubmit={handleSubmit(onSubmit)}>
                <Stack direction='column' spacing='1rem'>
                    <Grid container rowSpacing={{ xs: '1rem' }} columnSpacing={2}>
                        <Grid item xs={12} md={3}>
                            <Stack>
                                <SelectSmjer control={control} defaultVal={kolegij.smjer} setValue={setValue} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Stack>
                                <SelectKolegij control={control} defaultVal={kolegij} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Stack>
                                <SelectKategorija control={control} defaultVal={kategorija} />
                            </Stack>
                        </Grid>
                    </Grid>
                    <ControlledTextField variant='outlined' label='Naslov' control={control} name='naslov' defaultVal={naslov} />
                    <ControlledTextField multiline minRows={3} variant='outlined' label='Opis' control={control} name='opis' defaultVal={opis} />
                </Stack>
            </form>
        </FullScreenDialog>
    );
};

export default ChangeOglasDialog;