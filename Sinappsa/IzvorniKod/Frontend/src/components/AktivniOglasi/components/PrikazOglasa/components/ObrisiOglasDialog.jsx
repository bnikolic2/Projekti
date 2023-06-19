import React, { useRef } from 'react';
import { Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import CustomDialog from '../../../../../components/CustomDialog';
import useErrorAlert from '../../../../../hooks/useErrorAlert';
import useSession from '../../../../../hooks/useSession';

const ObrisiOglasDialog = ({ open, handleClose, id }) => {

    const textFieldRef = useRef(null);

    const showError = useErrorAlert();

    const { session } = useSession();
    const navigateTo = useNavigate();

    /////////////////////////////////////////////////////////
    
    const handleObrisiOglas = async () => {
        if(!textFieldRef.current) return;

        const poruka = textFieldRef.current.value;

        //Poruka ne smije biti prazna ?
        if(poruka.length == 0) {
            showError('Potrebno je napisati poruku!');
            return;
        }

        // obrisi oglas i posalji mail s porukom
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/oglasi/delete`, { data: { id: id, poruka: poruka }, 
                withCredentials: true,
                auth: {
                    username: session.korisnik.username,
                    password: session.korisnik.password,
                }
            });
            alert("Uspješno izbrisan oglas!");
            navigateTo(0);
        } catch (err) {
            showError("Dogodila se pogreška!");
        }
    };

    /////////////////////////////////////////////////////////

    return(
        <CustomDialog
            open={open}
            handleClose={handleClose}
            title={'Obriši oglas'}
            text={''}
            submitAction={handleObrisiOglas}
        >
            <Box>
                <TextField
                    label={'Razlog za brisanje'}
                    inputRef={textFieldRef}
                    multiline
                    minRows='3'
                />
            </Box>
        </CustomDialog>
    );
};

export default ObrisiOglasDialog;