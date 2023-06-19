import React, { useRef } from 'react';
import { Box, TextField } from '@mui/material';
import axios from 'axios';

import CustomDialog from '../../../../../components/CustomDialog';
import useErrorAlert from '../../../../../hooks/useErrorAlert';
import useSession from '../../../../../hooks/useSession';
import { useNavigate } from 'react-router-dom';

const JaviSeDialog = ({ open, handleClose, idOglasa }) => {

    const textFieldRef = useRef(null);

    const showError = useErrorAlert();

    const { session } = useSession();
    const navigateTo = useNavigate();

    /////////////////////////////////////////////////////////

    const handleStvoriUpit = async () => {
        if(!textFieldRef.current) return;

        const poruka = textFieldRef.current.value;

        //Poruka ne smije biti prazna ?
        if(poruka.length == 0) {
            showError('Potrebno je napisati poruku!');
            return;
        }

        const sendData = {
            poruka: poruka,
            idOglasa: idOglasa,
            idPosiljatelja: session.id,
        };

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upiti`, sendData, {
                withCredentials: true,
                auth: {
                    username: session.korisnik.username,
                    password: session.korisnik.password,
                },
            });
            alert("Uspješno dodan upit");
            navigateTo(0);
        } catch(err) {
            showError("Dogodila se pogreška!");
        }
    };

    /////////////////////////////////////////////////////////

    return(
        <CustomDialog
            open={open}
            handleClose={handleClose}
            title={'Javi se na oglas'}
            text={''}
            submitAction={handleStvoriUpit}
        >
            <Box>
                <TextField
                    label={'Poruka za upit'}
                    inputRef={textFieldRef}
                    multiline
                    minRows='3'
                />
            </Box>
        </CustomDialog>
    );
};

export default JaviSeDialog;