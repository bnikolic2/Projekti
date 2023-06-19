import React, { useState } from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useSession from '../../../hooks/useSession';

const UserButton = () => {

    const navigateTo = useNavigate();

    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const menuOpen = Boolean(anchorElMenu);

    const { session, setSession } = useSession();

    ///////////////////////////////////////////////////////////////////////////////

    const handleAvatarClick = (e) => {
        setAnchorElMenu(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorElMenu(null);
    };

    const handleLoginClick = () => {
        navigateTo('/prijava');
    };

    const handleRegisterClick = () => {
        navigateTo('/registracija');
    };

    const handleProfileClick = () => {
        navigateTo('/profil');
    };

    const handleLogoutClick = () => {
        setSession({ session: false });
        localStorage.clear();
        console.log("Logged out!");
        navigateTo('/');
    };

    ///////////////////////////////////////////////////////////////////////////////
    
    if (!session.exists)
        return (
            <Box>
                <Tooltip title='Open user settings'>
                    <IconButton
                        onClick={handleAvatarClick}
                    >
                        <Avatar
                            alt='userImage'
                            sx={{ color: 'white' }}
                            src={''}
                        >
                        </Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    open={menuOpen}
                    anchorEl={anchorElMenu}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleLoginClick}>Login</MenuItem>
                    <MenuItem onClick={handleRegisterClick}>Register</MenuItem>
                </Menu>
            </Box>
        );
    else return (
        <>
            <Typography>
                {`Pozdrav, ${session.korisnik.username}`}
            </Typography>
            <Box>
                <Tooltip title='Open user settings'>
                    <IconButton
                        onClick={handleAvatarClick}
                    >
                        <Avatar
                            alt='userImage'
                            sx={{ color: 'white' }}
                            src={session.avatar}
                        >
                        </Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    open={menuOpen}
                    anchorEl={anchorElMenu}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                    <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                </Menu>
            </Box>
        </>
    );
};

export default UserButton;