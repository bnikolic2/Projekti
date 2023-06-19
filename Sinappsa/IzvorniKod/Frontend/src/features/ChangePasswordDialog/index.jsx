import React, { useRef } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';

import CustomDialog from '../../components/CustomDialog';
import { PasswordTextField } from '../../components/PasswordTextField';
import useErrorAlert from '../../hooks/useErrorAlert';
import useSession from '../../hooks/useSession';

const ChangePasswordDialog = ({ open, handleClose }) => {

    const { session, setSession } = useSession();

    const passwordRef = useRef(null);

    const showError = useErrorAlert();

    ///////////////////////////////////////////////////////Vy

    const handlePasswordChange = async () => {
        if (!passwordRef.current) return;

        const noviPassword = passwordRef.current.value;

        // Password barem od 10 znakova
        if (noviPassword.length < 10 || noviPassword.length > 100) {
            showError('Password mora biti između 10 i 100 znakova!');
            return;
        }

        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/profil/password`, { password: noviPassword }, {
                withCredentials: true,
                auth: {
                    username: session.korisnik.username,
                    password: session.korisnik.password,
                }
            });
            localStorage.setItem('auth', JSON.stringify({ username: session.korisnik.username, password: noviPassword }));

            alert("Uspješno promijenjen password!");
        } catch (err) {
            showError("Dogodila se pogreška!");
        }

        // BItno nakon post requesta inace je 401 jer se koristi session za auth
        setSession(session => {
            session.korisnik.password = noviPassword;
            return session;
        });

        console.log(`Novi password je: ${noviPassword}`);
    };

    ///////////////////////////////////////////////////////Vy

    return (
        <CustomDialog
            open={open}
            handleClose={handleClose}
            title={'Promijeni password'}
            text={''}
            submitAction={handlePasswordChange}
        >
            <Box>
                <PasswordTextField label={'Novi password'} inputRef={passwordRef} />
            </Box>
        </CustomDialog>
    );
};

export default ChangePasswordDialog;