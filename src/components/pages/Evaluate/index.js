import * as React from 'react';
import ImgExample300 from '../../../assets/images/details/image-details-300.png';
import ImgExample from '../../../assets/images/details/image-details.png';

import ReactImageMagnify from 'react-image-magnify';
import RadioButtonGroup from '../../UIcomponents/RadioButtonGroup';

import styles from './Evaluate.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Evaluate() {
    const [formData, setFormData] = React.useState('notEvaluate');

    const handleClick = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className={cx('evaluate-artwork')}>
            <h1>Đánh giá tác phẩm</h1>
            <div className={cx('evaluate-common-information')}>
                <div className={cx('evaluate-image-img')}>
                    <ReactImageMagnify
                        {...{
                            smallImage: {
                                alt: '',
                                isFluidWidth: true,
                                src: ImgExample300,
                            },
                            largeImage: {
                                src: ImgExample,
                                width: 1000,
                                height: 1174,
                            },
                        }}
                    />
                </div>
                <div className={cx('evaluate-common-info')}>
                    <h2>IMMORTAL BABBLE</h2>
                    <div className={cx('evaluate-own-info')}>
                        <p>Sở hữu bởi NguyenA</p>
                    </div>
                    <div className={cx('evaluate-checkbox')}>
                        <RadioButtonGroup
                            formData={formData}
                            setFormData={setFormData}
                        ></RadioButtonGroup>
                    </div>
                </div>
            </div>
            <div className={cx('evaluate-btn')}>
                <button className={cx('btn-evaluate')} onClick={handleClick}>Gửi</button>
            </div>
        </div >
    );
}

export default Evaluate;
