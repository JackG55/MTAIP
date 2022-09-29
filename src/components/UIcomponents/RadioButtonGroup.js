import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import BasicTextFields from './TextField';

export default function RadioButtonsGroup(props) {
    const { formData, setFormData } = props;
    // const [formData, setformData] = React.useState();

    const handleChange = (e) => {
        const value = e.target.value;
        console.log(value)
        setFormData(value);
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
                <FormControlLabel value="accept" control={<Radio />} label="Chấp thuận" onChange={handleChange} />
                <FormControlLabel
                    value="notAccept"
                    control={<Radio />}
                    label="Không chấp thuận"
                    onChange={handleChange}
                />
                {formData === 'notAccept' && (
                    <div>
                        <BasicTextFields label="Lý do" />
                    </div>
                )}
            </RadioGroup>
        </FormControl>
    );
}
