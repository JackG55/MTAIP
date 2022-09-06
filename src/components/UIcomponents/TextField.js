import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields(props) {
    const { label, onChange, id, ...inputProps } = props;

    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField {...inputProps} id="outlined-basic" label={label} variant="outlined" onChange={onChange} />
            </Box>
        </div>
    );
}
