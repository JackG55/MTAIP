import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import background from '../../../assets/images/background/marketing-strategy 1.png'

const cx = classNames.bind(styles);

function HeroSection() {
    return (
        <div className={cx('hero-section')}>
            <div className={cx('content')}>
                <div className={cx('left-content')}>
                    <div className={cx('hero-section-content')}>
                        <h1 className={cx('hero-section-title')}>Công nghệ Blockchain trong sở hữu trí tuệ</h1>
                        <p className={cx('hero-section-paragraph')}>
                            Đăng ký, xác lập và bảo hộ quyền sở hữu trí tuệ dựa trên công nghệ Blockchain. 
                            Xác lập quyền tác giả, khai thác, thực hiện quyền tác giả, bảo vệ chống lại các hành vi xâm phạm tác phẩm
                        </p>
                        <div className={cx('hero-section-list')}>
                            <button className={cx('discover-button', 'hero-section-button')}>
                                <a href='/discovering'>
                                KHÁM PHÁ
                                </a>
                            </button>
                            <button className={cx('create-button', 'hero-section-button')}>
                                <a href='/create'>
                                Đăng ký hồ sơ mới
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('right-content')}>
                    <div className={cx('hero-section-image')}>
                        <img src={background} alt="Hello" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
