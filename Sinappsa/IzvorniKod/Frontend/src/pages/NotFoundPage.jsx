import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <Stack direction='column' justifyContent='center' alignItems='center' sx={{ minHeight: '100vh' }}>
            <h1>404 not found!</h1>
            <Link to={'/'}>Natrag na početnu stranicu</Link>
        </Stack>
    );
};

export default NotFound;