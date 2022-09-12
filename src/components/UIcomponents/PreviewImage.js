import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';

import styles from './UI.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function PreviewImage({childToParent}) {
    const [open, setOpen] = React.useState(false);
    const [link, setLink] = React.useState('');
    const [imgUrl, setImgUrl] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChange = (e) => {
        setLink(e.target.value);
    };
    const onClick = () => {
        setImgUrl(link);
        setOpen(false);
        childToParent(link)
    };
    const deleteImage = (e) => {
        e.preventDefault();
        setImgUrl(null);
    };

    return (
        <div>
            <div className={cx('image-link')}>
                <div className={cx('image-inside')} onClick={handleClickOpen}>
                    <ImageIcon sx={{ position: 'absolute', height: '100px', width: '100px' }} />
                    {imgUrl ? <img className={cx('image-content')} src={imgUrl} alt="" /> : null}
                </div>
                {imgUrl ? (
                    <div className={cx('image-iconClose')}>
                        <CloseIcon onClick={deleteImage} sx={{ fontSize: 40, color: 'rgb(217 217 217)' }} />
                    </div>
                ) : null}
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Đường dẫn tới tác phẩm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Để đăng ký sản phẩm của bạn với trang web, xin vui lòng nhập đường dẫn sản phẩm vào đây.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="link"
                        label="Đường dẫn"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={onChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Huỷ</Button>
                    <Button id="btn-Image" onClick={onClick}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
