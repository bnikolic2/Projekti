import React from "react";
import { Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";

import Loading from "../components/Loading";

const VerifyPage = () => {

    const { id } = useParams();

    const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/verify/${id}`);

    if (isLoading) return <Loading />;
    else if (error || !data) {
        return (
            <Stack direction='column' justifyContent='center' alignItems='center' sx={{ minHeight: '100vh' }}>
                <h1>Korisnik s tim verifikacijskim url nije pronađen ili je već verificiran!</h1>
                <Link to={'/'}>Natrag na početnu stranicu</Link>
            </Stack>
        );
    } else {
        return (
            <Stack direction='column' justifyContent='center' alignItems='center' sx={{ minHeight: '100vh' }}>
                <h1>Uspješno verificiran korisnik: {atob(id)}</h1>
                <Link to={'/'}>Natrag na početnu stranicu</Link>
            </Stack>
        );
    }
};

export default VerifyPage;