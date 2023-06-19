import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';
import useSWR from 'swr';

const SelectKategorija = ({ control, defaultVal, ...props }) => {

    const { error, data, isLoading } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/kategorija/all`);

    if (isLoading) return <p>Učitavanje smjerova</p>;
    else if (error) return <b>Dogodila se greška!</b>;
    else if (!data) return <b>Greška pri učitavanju smjerova</b>;
    return (
        <Controller
            control={control}
            name={'kategorija'}
            defaultValue={defaultVal || ''}
            render={({ field: { ref, ...field } }) => (
                <FormControl>
                    <InputLabel>Kategorija</InputLabel>
                    <Select
                        label='Kategorija'
                        {...props}
                        inputRef={ref}
                        {...field}
                        renderValue={(value) => value.nazivKategorije}
                    >
                        {data.map((item) => (
                            <MenuItem key={item.id} value={item}>{item.nazivKategorije}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    );
};

export default SelectKategorija;