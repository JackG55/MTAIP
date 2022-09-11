import BasicTextFields from '../../UIcomponents/TextField';
import SelectTextFields from '../../UIcomponents/Selection';
import PreviewImage from '../../UIcomponents/PreviewImage';

import { useState } from 'react';

import styles from './SignUp.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SignUp() {
    const [values, setValues] = useState({
        tentacpham: '',
        dateHT: '',
        dateCB: '',
        noidung: '',
        link: '',
    });

    const inputs = [
        {
            id: 1,
            name: 'tentacpham',
            type: 'text',
            label: 'Nhập tên tác phẩm',
        },
        {
            id: 2,
            name: 'dateHT',
            type: 'date',
            label: 'Ngày hoàn thành',
            defaultValue: '2022-05-09',
        },
        {
            id: 3,
            name: 'dateCB',
            type: 'date',
            label: 'Ngày công bố',
            defaultValue: '2022-05-09',
        },
        {
            id: 4,
            name: 'noidung',
            type: 'text',
            label: 'Nhập nội dung',
        },
    ];

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className={cx('sign-app')}>
            <h1> Đăng ký bản quyền </h1>
            <div className={cx('image-author-content')}>
                <div className={cx('image-content')}>
                    <PreviewImage />
                </div>
                <div className={cx('author-content')}>
                    <BasicTextFields disabled label="Tác giả" defaultValue="Nguyễn Văn A" />
                    <BasicTextFields
                        disabled
                        label="Địa chỉ tài khoản"
                        defaultValue="0x753986bcD7965666DA7f628918F7aAF3dd229492"
                    />
                </div>
            </div>
            <div className={cx('artwork-content')}>
                <SelectTextFields />
                {inputs.map((input) => (
                    <BasicTextFields key={input.id} {...input} onChange={onChange} />
                ))}
                <div className={cx('signUp-btn')}>
                    <button className={cx('btn-sign')}> Đăng ký </button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
