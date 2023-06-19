import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Controller, useWatch } from 'react-hook-form';
import useSWR from 'swr';

const SelectKolegij = ({ control, defaultVal, ...props }) => {

    const smjer = useWatch({
        control,
        name: 'smjer'
    });

    const { data, isLoading, error } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/kolegij/all`);

    if (isLoading) return <p>Učitavanje kolegija</p>;
    else if (error) return <b>Dogodila se greška!</b>;
    else if (!data) return <b>Greška pri učitavanju kolegija</b>;
    return (
        <Controller
            control={control}
            name={'kolegij'}
            defaultValue={defaultVal || ''}
            render={({ field: { ref, ...field } }) => (
                <FormControl>
                    <InputLabel>Kolegij</InputLabel>
                    <Select
                        label='Kolegij'
                        {...props}
                        inputRef={ref}
                        {...field}
                        renderValue={(value) => value.nazivKolegija}
                        disabled={smjer ? false : true}
                    >
                        {data.map((item) => {
                            if (smjer && item.smjer.smjerId !== smjer.smjerId) return;
                            return (
                                <MenuItem key={item.id} value={item}>{item.nazivKolegija}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            )}
        />
    );
};

export default SelectKolegij;