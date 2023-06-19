import React, { useState } from 'react';
import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import UserButton from './components/UserButton';
import useSession from '../../hooks/useSession';
import DodajOglasDialog from '../../features/DodajOglasDialog';

import './Header.css';
import DodajKolegijDialog from '../../features/DodajKolegijDialog';
import ListaKolegijaDialog from '../../features/ListaKolegijaDialog';

const Header = () => {

    const { session } = useSession();

    const [openDodajOglasDialog, setOpenDodajOglasDialog] = useState(false);
    const [openDodajKolegijDialog, setOpenDodajKolegijDialog] = useState(false);
    const [openListaKolegijaDialog, setOpenListaKolegijaDialog] = useState(false);

    /////////////////////////////////////////////////////////////////////////////////////

    const handleDodajOglas = () => {
        setOpenDodajOglasDialog(true);
    };

    const handleDodajKolegij = () => {
        setOpenDodajKolegijDialog(true);
    };

    const handlePrikazListe = () => {
        setOpenListaKolegijaDialog(true);
    };

    /////////////////////////////////////////////////////////////////////////////////////

    return (
        <AppBar position='static'>
            <DodajOglasDialog open={openDodajOglasDialog} handleClose={() => setOpenDodajOglasDialog(false)} />
            <DodajKolegijDialog open={openDodajKolegijDialog} handleClose={() => setOpenDodajKolegijDialog(false)} />
            {openListaKolegijaDialog &&
                <ListaKolegijaDialog open={openListaKolegijaDialog} handleClose={() => setOpenListaKolegijaDialog(false)} />
            }
            <Toolbar>
                <Link to={'/'} className='headerLogo'>
                    <Typography variant='h6' sx={{ letterSpacing: '.3rem' }}>
                        SINAPPSA
                    </Typography>
                </Link>
                {session.exists && session.korisnik.moderator ?  
                    <Stack direction='row' spacing='1rem'>
                        <Button color='secondary' variant='contained' onClick={handleDodajKolegij}>
                            Dodaj kolegij
                        </Button>
                        <Button color='secondary' variant='contained' onClick={handlePrikazListe}>
                            Lista kolegija
                        </Button> 
                    </Stack>                 
                    : <Button color='secondary' variant='contained' onClick={handleDodajOglas}
                        sx={{ display: (!session.exists) ? 'none' : undefined }}>
                        Dodaj oglas
                    </Button>
                }
                <Box sx={{ flexGrow: 1 }}></Box>
                <UserButton />
            </Toolbar>
        </AppBar>
    );
};

export default Header;