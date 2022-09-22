import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function RadioButtonsGroup() {
    return (
        <FormControl>
            <RadioGroup
                sx={{
                    '& .MuiSvgIcon-root': {
                        fontSize: 28,
                        color: '#7E3AF2',
                    },
                }}
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
            >
                <FormControlLabel value="chapthuan" control={<Radio />} label="Chấp thuận" />
                <FormControlLabel value="khongchapthuan" control={<Radio />} label="Không chấp thuận" />
            </RadioGroup>
        </FormControl>
    );
}
