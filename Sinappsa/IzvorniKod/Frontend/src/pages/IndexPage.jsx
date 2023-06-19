import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Navigate } from 'react-router-dom';

import Header from '../components/Header';
import PageContent from '../components/PageContent';
import AktivniOglasi from '../components/AktivniOglasi';
import SearchFilter from '../components/SearchFilter';
import RajtingLista from '../features/RajtingLista';
import Loading from '../components/Loading';

import useSession from '../hooks/useSession';

const IndexPage = () => {

    const { session } = useSession();

    /////////////////////////////////////////////////////////////////////////////////////

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

    // Ako još nismo provjerili ako korisnik je registriran ili ne
    if (session.exists === null) return <Loading />;
    // Ako smo saznali da je
    else if (session.exists && session.korisnik.moderator) return <Navigate to={'/moderator'} />;
    // Ako nije
    return (
        <main className='circuitBackground'>
            <Header />
            <PageContent centerX={true} my='2rem'>
                <Grid container spacing='1rem'>
                    <Grid item xs={12}>
                        <SearchFilter afterSubmit={afterSubmit} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <AktivniOglasi filtri={filtri} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <RajtingLista />
                    </Grid>
                </Grid>
            </PageContent>
        </main>
    );
};

export default IndexPage;