import React, { useRef } from 'react';
import { Box, TextField } from '@mui/material';
import axios from 'axios';

import CustomDialog from '../../components/CustomDialog';
import useErrorAlert from '../../hooks/useErrorAlert';
import useSession from '../../hooks/useSession';

const DodajKolegijDialog = ({ open, handleClose, refreshList}) => {

    const textFieldRef = useRef(null);

    const showError = useErrorAlert();

    const { session } = useSession();

    /////////////////////////////////////////////////////////

    const handleDodajKolegij = async () => {
        if(!textFieldRef.current) return;

        const naziv = textFieldRef.current.value;

        //Naziv ne smije biti prazan
        if(naziv.length == 0) {
            showError('Naziv kolegija ne smije biti prazan');
            return;
        }

        //TODO: stvori kolegij samo sa imenom i idsmjera = nerazvrstani idk
        const sendData = {
            naziv: naziv,
            idSmjera: 3,
        };

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/kolegij/add`, sendData, { 
                withCredentials: true,
                auth: {
                    username: session.korisnik.username,
                    password: session.korisnik.password,
                }
            });
            alert("Uspješno dodan kolegij!");
            if (refreshList) refreshList(); // Updajtaj u listi kod dodavanja
        } catch (err) {
            showError("Dogodila se pogreška!");
        }
    };

    /////////////////////////////////////////////////////////

    return(
        <CustomDialog
            open={open}
            handleClose={handleClose}
            title={'Dodaj kolegij'}
            text={''}
            submitAction={handleDodajKolegij}
        >
            <Box>
                <TextField
                    label={'Naziv kolegija'}
                    inputRef={textFieldRef}
                />
            </Box>
        </CustomDialog>
    );
};

export default DodajKolegijDialog;