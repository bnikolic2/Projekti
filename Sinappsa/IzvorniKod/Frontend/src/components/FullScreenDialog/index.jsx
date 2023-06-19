import React from 'react';
import { Slide, Dialog, AppBar, Container, IconButton, Paper, Toolbar, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * @param {} children ReactElement
 * @param {} open State variable
 * @param {} handleClose Sets open to false
 * @param {} title Appbar title
 * @param {} buttonText Close form with submit if empty no button
 * @param {} forForm Za koju formu odnosno id forme
 */
const FullScreenDialog = ({ children, open, handleClose, title, buttonText, forForm }) => {

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {title}
                        </Typography>
                        <Button autoFocus variant='contained' color="secondary" onClick={handleClose} type='submit' form={forForm} sx={{ display: (!buttonText) ? 'none' : 'initial' }}>
                            {buttonText}
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container sx={{ my: 4 }}>
                    <Paper sx={{ p: 4 }}>
                        {children}
                    </Paper>
                </Container>
            </Dialog>
        </div>
    );
};

export default FullScreenDialog;