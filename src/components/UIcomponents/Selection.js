import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const loaiHinh = [
    {
        value: 'Tác phẩm tạo hình, mỹ thuật ứng dụng'
    },
    {
        value: 'Tác phẩm nhiếp ảnh',
    },
    {
        value: 'Tác phẩm kiến trúc',
    },
    {
        value: 'Bản hoạ đồ, sơ đồ, bản đồ, bản vẽ',
    },
    {
        value: 'Nhãn hiệu',
    },
];

export default function SelectTextFields({ childToParent }) {
    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
        childToParent(event.target.value);
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
