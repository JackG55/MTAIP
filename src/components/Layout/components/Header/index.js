import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { useState, useEffect } from 'react';

import logo from '../../../../assets/images/MTA.png';

const cx = classNames.bind(styles);

function Header(nft, marketplace, user) {

    //============================================Xử lý BLockchain==========================//
    // #region Blockchain

    const [account, setAccount] = useState('');
    const [username, setUsername] = useState('');
    // MetaMask Login/Connect
    const web3Handler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        const userA = await nft.user.users(accounts[0])

        setUsername(userA.name)

        // const userA = await user.users(accounts[0])

    };

    window.ethereum.on('accountsChanged', function (accounts) {
        setAccount(accounts[0]);
    });

    useEffect(() => {
        web3Handler();
    }, [account]);

    // #endregion Blockchain
    //=====================================================================================//



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
                            <div className={cx('dropdown-discovering')}>
                                <a className={cx('navbar-item-link')} href="/discovering">Khám phá</a>
                                <div className={cx('dropdown-content')}>
                                    <a href="/discovering/assets">Tất cả</a>
                                    <a href="/discovering/art">Tác phẩm tạo hình, mỹ thuật ứng dụng</a>
                                    <a href="/discovering/photo">Tác phẩm nhiếp ảnh</a>
                                    <a href="/discovering/architecture">Tác phẩm kiến trúc</a>
                                    <a href="/discovering/diagram">Bản hoạ đồ, sơ đồ, bản đồ, bản vẽ</a>
                                    <a href="/discovering/brand">Nhãn hiệu</a>
                                </div>
                            </div>
                        </li>
                        <li className={cx('navbar-item')}>
                            <a className={cx('navbar-item-link')} href="/evaluate">Tính năng</a>
                        </li>
                        <li className={cx('navbar-item')}>
                            <a className={cx('navbar-item-link')} href="/myaccount">Tài khoản</a>
                        </li>
                        <li className={cx('navbar-item')}>
                            <a className={cx('navbar-item-link')} href="/contact">Liên hệ</a>
                        </li>
                    </ul>
                </div>

                <div>
                    {username !== '' && account !== '' && (
                        <div>
                            <p>{account}</p>
                            <p style={{ textAlign: 'right' }}>{username}</p>
                        </div>
                    )}
                    {username === '' && (
                        <button className={cx('signup-button', 'navbar-button')}>
                            <a className={cx('navbar-item-link')} href="/author">Đăng ký</a>
                        </button>
                    )}

                    {/* <button className={cx('signin-button', 'navbar-button')}>
                            <a className={cx('navbar-item-link')} href="/create">Đăng nhập</a>
                        </button> */}
                </div>

            </div>
        </header>
    );
}

export default Header;
