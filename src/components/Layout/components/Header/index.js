import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import logo from '../../../../assets/images/MTA.png';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="MTA" />
                    <div className={cx('logo-text')}>MTA</div>
                </div>
                <div className={cx('navbar')}>
                      <ul className={cx('navbar-list')}>
                        <li className={cx('navbar-item')}>
                            <a className={cx('navbar-item-link')} href="/">Trang chủ</a>
                        </li>
                        <li className={cx('navbar-item')}>
                            <a className={cx('navbar-item-link')} href="/discovering">Khám phá</a>
                        </li>
                        <li className={cx('navbar-item')}>
                            <a className={cx('navbar-item-link')} href="/feature">Tính năng</a>
                        </li>
                        <li className={cx('navbar-item')}>
                            <a className={cx('navbar-item-link')} href="/account">Tài khoản</a>
                        </li>
                        <li className={cx('navbar-item')}>
                            <a className={cx('navbar-item-link')} href="/contact">Liên hệ</a>
                        </li>
                      </ul>
                </div>

                <div>
                        <button className={cx('signup-button', 'navbar-button')}>
                            <a className={cx('navbar-item-link')} href="/account">Đăng ký</a>
                        </button>
                        <button className={cx('signin-button', 'navbar-button')}>
                            <a className={cx('navbar-item-link')} href="/create">Đăng nhập</a>
                        </button>
                </div>

            </div>
        </header>
    );
}

export default Header;
