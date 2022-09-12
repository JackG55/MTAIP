import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const loaiHinh = [
    {
        value: 'Hình ảnh'
    },
    {
        value: 'Âm nhạc',
    },
    {
        value: 'Bài giảng, bài phát biểu',
    },
    {
        value: 'Báo chí',
    },
    {
        value: 'Văn học',
    },
    {
        value: 'Sân khấu',
    },
    {
        value: 'Điện ảnh',
    },
    {
        value: 'Kiến trúc',
    },
    {
        value: 'Nghệ thuật dân gian',
    },
    {
        value: 'Chương trình máy tính, sưu tập dữ liệu',
    },
    {
        value: 'Tác phẩm phái sinh',
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
