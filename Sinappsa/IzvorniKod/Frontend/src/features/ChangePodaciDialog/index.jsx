import React, { useRef } from 'react';
import { Stack, TextField } from '@mui/material';
import axios from 'axios';

import CustomDialog from '../../components/CustomDialog';
import useSession from '../../hooks/useSession';
import useErrorAlert from '../../hooks/useErrorAlert';

const ChangePodaciDialog = ({ open, handleClose }) => {

    const { session, setSession } = useSession();

    const showError = useErrorAlert();

    const usernameRef = useRef(null);

    ///////////////////////////////////////////////////////Vy

    const handlePasswordChange = async () => {
        if (!usernameRef.current) return;

        const username = usernameRef.current.value;

        if (username == '') {
            showError('Polja ne smiju biti prazna!');
            return;
        }


        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/profil/username`, { username: username }, {
                withCredentials: true,
                auth: {
                    username: session.korisnik.username,
                    password: session.korisnik.password,
                }
            });
            localStorage.setItem('auth', JSON.stringify({ username: username, password: session.korisnik.password }));
            
            alert("Uspješno promijenjen username!");
        } catch (err) {
            showError("Dogodila se pogreška!");
        }

        // Bitno nakon post requesta inace je 401 jer se koristi session za auth
        setSession(session => {
            session.korisnik.username = username;
            return session;
        });
    };

    ///////////////////////////////////////////////////////Vy

    return (
        <CustomDialog
            open={open}
            handleClose={handleClose}
            title={'Promijeni podatke'}
            text={'Sva polja moraju biti ispunjena'}
            submitAction={handlePasswordChange}
        >
            <Stack direction='column' spacing='1rem'>
                <TextField label={'Novi username'} defaultValue={session.korisnik.username} inputRef={usernameRef} />
            </Stack>
        </CustomDialog>
    );
};

export default ChangePodaciDialog;