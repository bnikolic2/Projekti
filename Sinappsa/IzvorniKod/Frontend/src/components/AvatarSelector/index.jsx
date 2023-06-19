import React from 'react';
import { Stack, Avatar, IconButton } from '@mui/material';

import FullScreenDialog from '../FullScreenDialog';

const avatarIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

/**
 * @param {} open State variable
 * @param {} handleClose Sets open to false
 * @param {} onSelect Returns image string location as argument
 */
const AvatarSelector = ({ open, handleClose, onSelect }) => {

    const onAvatarSelect = (imgLocation) => {
        onSelect(imgLocation);
        handleClose();
    };

    return (
        <FullScreenDialog
            open={open}
            handleClose={handleClose}
            title={'Izaberi avatar'}
        >
            <Stack direction='row' justifyContent='center' sx={{ flexWrap: 'wrap' }} gap='2rem'>
                {avatarIds.map(id => (
                    <IconButton key={id} onClick={() => onAvatarSelect(`/avatars/${id}.png`)}>
                        <Avatar 
                            src={`/avatars/${id}.png`} 
                            sx={{ width: '96px', height: '96px' }} 
                        />
                    </IconButton>
                ))}
            </Stack>
        </FullScreenDialog>
    );
};

export default AvatarSelector;