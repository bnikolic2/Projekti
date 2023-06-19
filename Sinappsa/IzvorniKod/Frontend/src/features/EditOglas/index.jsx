import React, { useState } from 'react';
import { Paper, Typography, Stack, IconButton, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useDesktop from '../../hooks/useDesktop';
import CustomDialog from '../../components/CustomDialog';
import ChangeOglasDialog from '../ChangeOglasDialog';
import useSession from '../../hooks/useSession';
import useErrorAlert from '../../hooks/useErrorAlert';
import axios from 'axios';

const EditOglas = ({ id, kolegij, kategorija, naslov, opis, objavljivac, mutate }) => {

    const { session } = useSession();
    const showError = useErrorAlert();

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [openChangeOglasDialog, setOpenChangeOglasDialog] = useState(false);

    /////////////////////////////////////////////////

    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/oglasi/delete`, { data: { id: id }, 
                withCredentials: true,
                auth: {
                    username: session.korisnik.username,
                    password: session.korisnik.password,
                }
            });
            alert("Uspješno izbrisan oglas!");
            mutate();
        } catch (err) {
            showError("Dogodila se pogreška!");
        }
    };

    /////////////////////////////////////////////////

    return (
        <>
            <CustomDialog 
                open={openConfirmDialog}
                handleClose={() => setOpenConfirmDialog(false)}
                submitAction={handleDelete}
                text={'Brisanjem nestaje oglas zauvijek.'}
                title={'Jesi li siguran?'}
                submitText={'Da'}
            />
            <ChangeOglasDialog
                open={openChangeOglasDialog}
                handleClose={() => setOpenChangeOglasDialog(false)}
                kolegij={kolegij}
                kategorija={kategorija}
                idOglasa={id}
                naslov={naslov}
                opis={opis}
                objavljivac={objavljivac}
                mutate={mutate}
            />
            <Stack direction='row' justifyContent='end'>
                <IconButton onClick={() => setOpenChangeOglasDialog(true)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => setOpenConfirmDialog(true)}>
                    <DeleteIcon htmlColor='red' />
                </IconButton>
            </Stack>
            <Paper sx={{ padding: '1.5rem', backgroundColor: 'var(--gray)' }}>
                <Grid container rowSpacing={{ xs: 2 }}>
                    <Grid item xs={12}>
                        <Stack direction={useDesktop() ? 'row' : 'column'} gap='1rem' justifyContent='end'>
                            <Typography variant='caption'
                                sx={{ padding: '0.5rem', backgroundColor: 'var(--dark)', borderRadius: '0.3rem' }}>
                                {kolegij.smjer.nazivSmjera}
                            </Typography>
                            <Typography variant='caption'
                                sx={{ padding: '0.5rem', backgroundColor: 'var(--dark)', borderRadius: '0.3rem' }}>
                                {kolegij.nazivKolegija}
                            </Typography>
                            <Typography variant='caption'
                                sx={{ padding: '0.5rem', backgroundColor: 'var(--dark)', borderRadius: '0.3rem' }}>
                                {kategorija.nazivKategorije}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' fontWeight='bold' sx={{ textDecoration: 'underline' }}>{naslov}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>{opis}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default EditOglas;