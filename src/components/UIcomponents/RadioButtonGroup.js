import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import BasicTextFields from './TextField';

export default function RadioButtonsGroup(props) {
    const [formData, setformData] = React.useState();

    const handleChange = (e) => {
        const value = e.target.value;
        setformData(value);
    };

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
                <FormControlLabel value="chapthuan" control={<Radio />} label="Chấp thuận" onChange={handleChange} />
                <FormControlLabel
                    value="khongchapthuan"
                    control={<Radio />}
                    label="Không chấp thuận"
                    onChange={handleChange}
                />
                {formData === 'khongchapthuan' ? (
                    <div>
                        <BasicTextFields label="Lý do" />
                    </div>
                ) : null}
            </RadioGroup>
        </FormControl>
    );
}
