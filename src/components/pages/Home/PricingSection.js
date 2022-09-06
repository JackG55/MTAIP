import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import Button from '@mui/material/Button';


import CardUI from '../../UIcomponents/Card';

const cx = classNames.bind(styles);

function PricingSection() {
    return (
        <div className={cx('pricing-section')}>
            <h1>Khám phá các NFT</h1>
            <div className={cx('pricing-section-filter')}>
                <div className={cx('pricing-section-menu')}>
                    <Button variant="contained" className={cx('pricing-section-menu-button')}>Tất cả thể loại</Button>
                    <Button variant="contained" className={cx('pricing-section-menu-button')}>Tranh vẽ</Button>
                    <Button variant="contained" className={cx('pricing-section-menu-button')}>Ảnh</Button>
                    <Button variant="contained" className={cx('pricing-section-menu-button')}>Video</Button>
                    <Button variant="contained" className={cx('pricing-section-menu-button')}>Âm nhạc</Button>
                    <Button variant="contained" className={cx('pricing-section-menu-button')}>Bản thiết kế</Button>
                </div>
                <div className={cx('pricing-section-btn-filter')}>
                    <Button variant="contained" startIcon={<FilterListRoundedIcon />} className={cx('pricing-section-btn-filter-detail')}>
                        Bộ lọc
                    </Button>
                </div>
            </div>
            <div className={cx('pricing-section-listing')}>
                <CardUI />
                <CardUI />
                <CardUI />
                <CardUI />
                <CardUI />
                <CardUI />
                <CardUI />
                <CardUI />
            </div>
            <div className={cx('pricing-section-btn-seemore')}>
                <button>Xem thêm</button>
            </div>
        </div>
    );
}

export default PricingSection;
