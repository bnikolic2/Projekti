import React, { useRef } from 'react';
import { Button, Grid, Paper, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import SelectKategorija from '../SelectKategorija';
import SelectKolegij from '../SelectKolegij';
import SelectSmjer from '../SelectSmjer';

const SearchFilter = ({ afterSubmit }) => {

    const { control, handleSubmit, reset, setValue } = useForm();

    const filtrirajSubmitRef = useRef(null);

    ////////////////////////////////////////////////////////////////////

    const onSubmit = (data) => {
        console.log(data);

        const sendData = {
            idKolegij: data.kolegij === '' ? null : data.kolegij.id,
            idKategorija: data.kategorija === '' ? null : data.kategorija.id,
            idSmjer: data.smjer === '' ? null : data.smjer.smjerId,
        };

        if (afterSubmit) afterSubmit(sendData);
    };

    const handleClear = () => {
        reset({
            smjer: '',
            kategorija: '',
            kolegij: '',
        });
        filtrirajSubmitRef.current?.click();
    };

    ////////////////////////////////////////////////////////////////////

    return (
        <Paper sx={{ padding: '1rem' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction='column' spacing='1rem'>
                    <Grid container alignItems='center' columnSpacing={{ xs: 2 }} rowSpacing={{ xs: 2 }}>
                        <Grid item xs={12} md={3}>
                            <Stack>
                                <SelectSmjer control={control} setValue={setValue} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Stack>
                                <SelectKolegij control={control} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Stack>
                                <SelectKategorija control={control} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Stack direction='row' justifyContent={'center'} spacing='1rem'>
                                <Button sx={{ width: '50%' }} variant='contained' color='secondary' onClick={handleClear}>Očisti</Button>
                                <Button sx={{ width: '50%' }} variant='contained' type='submit' ref={filtrirajSubmitRef}>Filtriraj</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </form>
        </Paper>
    );
};

export default SearchFilter;