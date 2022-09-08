import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import styles from './UI.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

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
                <TextField
                    className={cx('text-field')}
                    {...inputProps}
                    id="outlined-basic"
                    label={label}
                    variant="outlined"
                    onChange={onChange}
                    InputProps={{ style: { fontSize: 20 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    style={{ width: 550, margin: '15px' }}
                />
            </Box>
        </div>
    );
}
