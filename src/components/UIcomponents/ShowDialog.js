import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { ethers } from 'ethers';

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [price, setPrice] = React.useState(0);
    const { offerMarketItem } = props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleTextfield = (e) => {
        setPrice(e.target.value);
    }
    const OfferItem = (e) => {
        console.log('offerprice', price);
        const listingPrice = ethers.utils.parseEther(price.toString());
        offerMarketItem(listingPrice);
        setOpen(false);
    }



    return (
        <div>
            <Button sx={{ textTransform: 'inherit', fontWeight: '400' }} variant="outlined" onClick={handleClickOpen}>
                Đề nghị
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: '20px' }}>Đề nghị</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: '20px' }}>
                        Nhập giá sản phẩm
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Giá (ETH)"
                        type="number"
                        fullWidth
                        variant="standard"
                        InputProps={{ style: { fontSize: 15 } }}
                        InputLabelProps={{ style: { fontSize: 15, color: 'rgb(126, 58, 242)' } }}
                        style={{ width: 300 }}
                        onChange={handleTextfield}
                    />
                </DialogContent>
                <DialogActions >
                    <Button sx={{ fontSize: '15px', color: 'rgb(126, 58, 242)' }} onClick={handleClose}>Huỷ</Button>
                    <Button sx={{ fontSize: '15px', color: 'rgb(126, 58, 242)' }} onClick={OfferItem}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}