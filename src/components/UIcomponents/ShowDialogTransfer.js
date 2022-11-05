import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [account, setAccount] = React.useState('');
    const { transferMarketItem } = props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleTextfield = (e) => {
        setAccount(e.target.value);
    }
    const TransferItem = (e) => {
        console.log('Transfer to account: ', account);
        // const listingPrice = ethers.utils.parseEther(price.toString());
        //offerMarketItem(listingPrice);
        transferMarketItem(account)
        setOpen(false);
    }



    return (
        <div>
            <Button sx={{ textTransform: 'inherit', fontWeight: '400' }} variant="outlined" onClick={handleClickOpen}>
                Chuyển
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: '20px' }}>Chuyển nhượng tác phẩm</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: '20px' }}>
                        Nhập số tài khoản
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="STK"
                        type="text"
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
                    <Button sx={{ fontSize: '15px', color: 'rgb(126, 58, 242)' }} onClick={TransferItem}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}