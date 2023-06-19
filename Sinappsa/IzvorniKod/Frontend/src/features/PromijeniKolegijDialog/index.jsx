import React from 'react';
import { Stack } from '@mui/material';
import axios from 'axios';
import CustomDialog from '../../components/CustomDialog';
import useSession from '../../hooks/useSession';
import useErrorAlert from '../../hooks/useErrorAlert';
import SelectSmjer from '../../components/SelectSmjer';
import ControlledTextField from '../../components/ControlledTextField';
import { useForm } from 'react-hook-form';

const PromijeniKolegijDialog = ({ open, handleClose, smjer, naziv, id, refreshList }) => {

    const { control, handleSubmit } = useForm({
        shouldUnregister: true,
    });

    const { session } = useSession();
    const showError = useErrorAlert();

    const onSubmit = async (data) => {

        //Promjena kolegija u bazi
        const sendData = {
            idKolegij: id,
            idSmjer: data.smjer.smjerId,
            nazivKolegija: data.naziv,
        };
        console.log(sendData);

        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/kolegij/sort`, sendData, {
                withCredentials: true,
                auth: {
                    username: session.korisnik.username,
                    password: session.korisnik.password,
                }
            });
            alert('Uspješno promjenjen kolegij!');
            refreshList();
        } catch (err) {
            showError("Dogodila se greška, pokušajte ponovno!");
        }
    };

    return (
        <CustomDialog
            open={open}
            handleClose={handleClose}
            title={'Promijeni podatke kolegija'}
            forForm={'promijeniKolegijForm'}
        >
            <form id='promijeniKolegijForm' onSubmit={handleSubmit(onSubmit)}>
                <Stack direction='column' spacing='1rem'>
                    <ControlledTextField label={'Naziv kolegija'} name='naziv' defaultVal={naziv} control={control} />
                    <SelectSmjer control={control} defaultVal={smjer} />
                </Stack>
            </form>
        </CustomDialog>
    );
};

export default PromijeniKolegijDialog;