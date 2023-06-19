import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Navigate } from 'react-router-dom';
import AktivniOglasi from '../components/AktivniOglasi';
import Header from '../components/Header';
import PageContent from '../components/PageContent';
import SearchFilter from '../components/SearchFilter';
import useSession from '../hooks/useSession';
import Loading from '../components/Loading';

const ModeratorPage = () => {

    const { session } = useSession();

    const [filtri, setFiltri] = useState({
        idKolegij: null,
        idKategorija: null,
        idSmjer: null,
    });


    /////////////////////////////////////////////////////////////////////////////////////

    // Filtriranje dobivanje novih oglasa
    const afterSubmit = async (sendData) => {
        setFiltri(sendData);
    };

    /////////////////////////////////////////////////////////////////////////////////////

    if (session.exists === null) return <Loading />;
    else if(!session.exists || !session.korisnik.moderator) return <Navigate to={'/'} />;
    return (
        <main className='circuitBackground'>
            <Header />
            <PageContent centerX={true} my='2rem'>
                <Grid container spacing='1rem' justifyContent={'center'}>
                    <Grid item xs={12}>
                        <SearchFilter afterSubmit={afterSubmit} />
                    </Grid>
                    <Grid item xs={12} >
                        <AktivniOglasi filtri={filtri} />
                    </Grid>
                </Grid>
            </PageContent>
        </main>
    );
};

export default ModeratorPage;