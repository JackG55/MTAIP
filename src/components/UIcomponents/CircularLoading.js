import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate(props) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(126, 58, 242,1)',
            color: 'white',
            width: '195px',
            height: '108px',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
        }}>
            <CircularProgress sx={{ color: 'white', marginBottom: '10px' }} />
            <p>{props.info}</p>
        </Box>
    );
}