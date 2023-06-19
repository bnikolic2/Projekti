import React, { useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SWRConfig } from 'swr';
import axios from 'axios';

import DefaultTheme from './DefaultTheme';
import SessionContext from './contexts/SessionContext';

import ErrorAlertContext from './contexts/ErrorAlertContext';
import OkAlert from './components/OkAlert';

import NotFoundPage from './pages/NotFoundPage';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProfilPage from './pages/ProfilPage';
import VerifyPage from './pages/VerifyPage';
import ModeratorPage from './pages/ModeratorPage';

import Fetcher from "./libs/Fetcher";

const App = () => {

    //////////////////////////////////////////////////////////////////////////////////

    // exists je null dok nije provjeren, false ako nema cookia ili ako postoji cookie ali s krivim podacima
    const [session, setSession] = useState({ exists: null });
    const sessionObject = {
        session: session,
        setSession: setSession,
    };

    useEffect(() => {
        if (localStorage.getItem('auth')) {

            (async () => {
                try {
                    const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/korisnici/login", {
                        withCredentials: true,
                        auth: JSON.parse(localStorage.getItem('auth')),
                    });

                    setSession({
                        exists: true,
                        ...res.data,
                    });

                } catch (err) {
                    console.error("Auth exists with invalid credentials!");
                    setSession({ exists: false });
                }
            })();
        } else {
            setSession({ exists: false });
        }
    }, []);

    //////////////////////////////////////////////////////////////////////////////////

    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [errorText, setErrorText] = useState('');

    const showError = (text) => {
        setOpenErrorAlert(true);
        setErrorText(text);
    };

    //////////////////////////////////////////////////////////////////////////////////

    return (
        <ThemeProvider theme={DefaultTheme}>
            <CssBaseline />
            <SWRConfig value={{
                fetcher: Fetcher,
                shouldRetryOnError: false,
                revalidateOnFocus: false,
            }}>
                <SessionContext.Provider value={sessionObject}>
                    <OkAlert
                        open={openErrorAlert}
                        handleClose={() => setOpenErrorAlert(false)}
                        title='Error'
                        text={errorText}
                    />
                    <ErrorAlertContext.Provider value={showError}>
                        <BrowserRouter>
                            <Routes>
                                <Route path='*' element={<NotFoundPage />} />
                                <Route path='/' element={<IndexPage />} />
                                <Route path='/prijava' element={<LoginPage />} />
                                <Route path='/registracija' element={<RegistrationPage />} />
                                <Route path='/profil' element={<ProfilPage />} />
                                <Route path='/verify/:id' element={<VerifyPage />} />
                                <Route path='/moderator' element={<ModeratorPage />} />
                            </Routes>
                        </BrowserRouter>
                    </ErrorAlertContext.Provider>
                </SessionContext.Provider>
            </SWRConfig>
        </ThemeProvider>
    );
};

export default App;
