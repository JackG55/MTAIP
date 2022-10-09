import * as React from 'react';
import Alert from '@mui/material/Alert';


export default function BasicAlerts(props) {
    return (
        <Alert severity="success"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: '18px',
                height: '108px',
                width: '195px',
                justifyContent: 'center',
                lineHeight: '30px',
                backgroundColor: 'rgba(126, 58, 242,1)',
                color: 'white',
                "& .MuiAlert-icon": {
                    fontSize: '30px',
                    justifyContent: 'center',
                    color: 'white'
                }
            }}>
            {props.alert}
        </Alert >
    );
}