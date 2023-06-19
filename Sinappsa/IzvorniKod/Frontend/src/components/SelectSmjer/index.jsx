import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';
import useSWR from 'swr';

const SelectSmjer = ({ control, defaultVal, setValue, ...props }) => {

    const { data, isLoading, error } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/smjer/all`);

    if (isLoading) return <p>Učitavanje smjerova</p>;
    else if (error) return <b>Dogodila se greška!</b>;
    else if (!data) return <b>Greška pri učitavanju smjerova</b>;
    return (
        <Controller
            control={control}
            name={'smjer'}
            defaultValue={defaultVal || ''}
            render={({ field: { ref, onChange, ...field } }) => (
                <FormControl>
                    <InputLabel>Smjer</InputLabel>
                    <Select
                        label='Smjer'
                        {...props}
                        inputRef={ref}
                        {...field}
                        onChange={(e) => {
                            onChange(e);
                            if (setValue) setValue('kolegij', ''); // Resetiraj kolegij dok se promijeni smjer, nije obavezan parametar
                        }}
                        renderValue={(value) => value.nazivSmjera}
                    >
                        {data.map((item) => (
                            <MenuItem key={item.smjerId} value={item}>{item.nazivSmjera}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    );
};

export default SelectSmjer;