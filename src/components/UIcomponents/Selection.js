import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const loaiHinh = [
    {
        value: 'văn học',
    },
    {
        value: 'bài giảng, bài phát biểu',
    },
    {
        value: 'báo chí',
    },
    {
        value: 'âm nhạc',
    },
    {
        value: 'sân khấu',
    },
    {
        value: 'điện ảnh',
    },
    {
        value: 'kiến trúc',
    },
    {
        value: 'nghệ thuật dân gian',
    },
    {
        value: 'chương trình máy tính, sưu tập dữ liệu',
    },
    {
        value: 'tác phẩm phái sinh',
    },
];

export default function SelectTextFields() {
    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Loại hình"
                    value={category}
                    onChange={handleChange}
                    InputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{ style: { fontSize: 15 } }}
                    style={{ width: 550, margin: '15px' }}
                >
                    {loaiHinh.map((option) => (
                        <MenuItem style={{ fontSize: 15 }} key={option.value} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </Box>
    );
}
