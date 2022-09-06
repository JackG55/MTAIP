import './SignUp.css';
import FormInput from './FormInput';
import { useState } from 'react';

function SignUp() {
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
            placeholder: 'Nhập tên tác phẩm',
            label: 'Tên tác phẩm',
        },
        {
            id: 2,
            name: 'loaihinh',
            type: 'text',
            placeholder: 'Nhập loại hình',
            label: 'Tên loại hình',
        },
        {
            id: 3,
            name: 'dateHT',
            type: 'date',
            placeholder: 'Ngày hoàn thành',
            label: 'Ngày hoàn thành',
        },
        {
            id: 4,
            name: 'dateCB',
            type: 'date',
            placeholder: 'Ngày công bố',
            label: 'Ngày công bố',
        },
        {
            id: 5,
            name: 'noidung',
            type: 'text',
            placeholder: 'Nhập nội dung',
            label: 'Nội dung',
        },
        {
            id: 6,
            name: 'link',
            type: 'text',
            placeholder: 'Đường dẫn',
            label: 'Đường dẫn',
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
                <h1>Đăng ký bản quyền</h1>
                {inputs.map((input) => (
                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                ))}
                <button>Đăng ký</button>
            </form>
        </div>
    );
}

export default SignUp;
