import React from 'react';
import { Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button } from "@mui/material";

const OkAlert = ({ title, text, open, handleClose }) => {
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
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OkAlert;