import React from 'react';
import { Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button } from "@mui/material";

const CustomDialog = ({ children, title, text, open, submitAction, handleClose, submitText, forForm }) => {

    const handleSubmit = () => {
        if (submitAction) submitAction();
        handleClose();
    };

    return (
        <Dialog
            open={open}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='text'>
                    Odustani
                </Button>
                <Button onClick={handleSubmit} variant='contained' type='submit' form={forForm}>
                    {submitText || 'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomDialog;