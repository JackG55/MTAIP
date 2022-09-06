import BasicTextFields from '../../UIcomponents/TextField';
import { useState } from 'react';

function SignnUp() {
    const [values, setValues] = useState({
        tentacpham: '',
        loaihinh: '',
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
            name: 'loaihinh',
            type: 'text',
            label: 'Nhập tên loại hình',
        },
        {
            id: 3,
            name: 'dateHT',
            type: 'date',
            label: 'Ngày hoàn thành',
            defaultValue: '2022-05-09',
        },
        {
            id: 4,
            name: 'dateCB',
            type: 'date',
            label: 'Ngày công bố',
            defaultValue: '2022-05-09',
        },
        {
            id: 5,
            name: 'noidung',
            type: 'text',
            label: 'Nhập nội dung',
        },
        {
            id: 6,
            name: 'link',
            type: 'text',
            label: 'Nhập đường dẫn',
        },
    ];

    const handleSubmit = (e) => {
        e.prevenDefault();
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className="sign-app">
            <form onSubmit={handleSubmit}>
                <h2>Đăng ký bản quyền</h2>
                {inputs.map((input) => (
                    <BasicTextFields key={input.id} {...input} onChange={onChange} />
                ))}
                <button>Đăng ký</button>
            </form>
        </div>
    );
}

export default SignnUp;
