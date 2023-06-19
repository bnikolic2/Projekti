import React from 'react';
import { useForm } from 'react-hook-form';
import { Stack, Grid } from '@mui/material';

import FullScreenDialog from '../../components/FullScreenDialog';
import ControlledTextField from '../../components/ControlledTextField';
import SelectSmjer from '../../components/SelectSmjer';
import SelectKolegij from '../../components/SelectKolegij';
import SelectKategorija from '../../components/SelectKategorija';
import useErrorAlert from '../../hooks/useErrorAlert';
import useSession from '../../hooks/useSession';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DodajOglasDialog = ({ open, handleClose }) => {

    const { control, handleSubmit, setValue } = useForm();

    const showError = useErrorAlert();

    const { session } = useSession();
    const navigateTo = useNavigate();

    /////////////////////////////////////////////////////////////////////////////////////

    const onSubmit = async (data) => {
        console.log(data);

        if (data.naslov == '' || data.opis == '' || data.kategorija == '' || data.kolegij == '' || data.smjer == '') {
            showError('Sva polja moraju biti popunjena');
            return;
        }
        else if (data.naslov.length < 10 || data.naslov.length > 60) {
            showError("Naslov mora biti u rasponu od [10, 60]!");
            return;
        }

        const sendData = {
            naslov: data.naslov,
            opis: data.opis,
            idPomagaca: session.id,
            idKolegija: data.kolegij.id,
            idKategorije: data.kategorija.id,
        };
        console.log(sendData);

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/oglasi/create`, sendData, {
                withCredentials: true,
                auth: {
                    username: session.korisnik.username,
                    password: session.korisnik.password,
                }
            });
            navigateTo(0);
        } catch (err) {
            showError("Dogodila se greška, pokušajte ponovno!");
        }

    };

    /////////////////////////////////////////////////////////////////////////////////////

    return (
        <FullScreenDialog
            open={open}
            handleClose={handleClose}
            title={'Dodaj oglas'}
            buttonText={'Potvrdi'}
            forForm={'dodajOglasForm'}
        >
            <form id='dodajOglasForm' onSubmit={handleSubmit(onSubmit)}>
                <Stack direction='column' spacing='1rem'>
                    <Grid container rowSpacing={{ xs: '1rem' }} columnSpacing={2}>
                        <Grid item xs={12} md={3}>
                            <Stack>
                                <SelectSmjer control={control} setValue={setValue} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Stack>
                                <SelectKolegij control={control} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Stack>
                                <SelectKategorija control={control} />
                            </Stack>
                        </Grid>
                    </Grid>
                    <ControlledTextField variant='outlined' label='Naslov' control={control} name='naslov' defaultVal={''} />
                    <ControlledTextField multiline minRows={3} variant='outlined' label='Opis' control={control} name='opis' defaultVal={''} />
                </Stack>
            </form>
        </FullScreenDialog>
    );
};

export default DodajOglasDialog;