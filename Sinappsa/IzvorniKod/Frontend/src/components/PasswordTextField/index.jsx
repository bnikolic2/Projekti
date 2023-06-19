import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Controller } from 'react-hook-form';

export const ControlledPasswordTextField = ({ label, control, name, defaultVal }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultVal}
            render={({ field }) => (
                <FormControl variant='outlined'>
                    <InputLabel>{label}</InputLabel>
                    <OutlinedInput label='Password' type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        {...field}
                        required
                    />
                </FormControl>
            )}
        />
    );
};

export const PasswordTextField = ({ label, inputRef }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <FormControl variant='outlined'>
            <InputLabel>{label}</InputLabel>
            <OutlinedInput label='Password' type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                required
                inputRef={inputRef}
            />
        </FormControl>
    );
};