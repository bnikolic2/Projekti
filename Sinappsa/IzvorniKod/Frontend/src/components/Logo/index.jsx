import { Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {

    const navigateTo = useNavigate();

    const handleLogoClick = () => {
        navigateTo('/');
    };

    return (
        <Button sx={{ marginBottom: '1rem', padding: '30px' }} variant='outlined' color='secondary' onClick={handleLogoClick}>
            <Typography variant='h6' sx={{ letterSpacing: '.3rem' }}>
                SINAPPSA
            </Typography>
        </Button>
    );
};

export default Logo;