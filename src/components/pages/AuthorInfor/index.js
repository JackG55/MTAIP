import { useState, useEffect } from 'react';
import { makeGatewayURL } from '../../web3Storage_helper';
import styles from './AuthorInfor.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AuthorInfo(nft) {

    const url = window.location.href.slice(33);
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        identifyCard: '',
    });

    const loadMarketplaceItems = async () => {

        const uri = await nft.user.users(url);
        const cid = await uri[1].split('ipfs://').join('').split('/')[0];
        const metadataURL = makeGatewayURL(cid, 'metadata.json');
        const response = await fetch(metadataURL);
        const responseJson = await response.json();
        setUser({
            name: responseJson.name,
            email: responseJson.email,
            phone: responseJson.phone,
            dateOfBirth: responseJson.dateOfBirth,
            identifyCard: responseJson.identifyCard
        })

    }

    useEffect(() => {
        loadMarketplaceItems()
    }, [])


    return (
        <div className={cx('author-info')}>
            <h1 className={cx('author-info-title')}>
                THÔNG TIN TÁC GIẢ
            </h1>
            <div className={cx('author')}>
                <div className={cx('author-category')}>
                    <h3>Họ và tên :</h3>
                    <h3>Email : </h3>
                    <h3>SĐT :  </h3>
                    <h3>Ngày sinh :</h3>
                    <h3>Số CMND/CCCD :</h3>
                </div>
                <div className={cx('author-detail')}>
                    <h3>{user.name}</h3>
                    <h3>{user.email}</h3>
                    <h3>{user.phone}</h3>
                    <h3>{user.dateOfBirth}</h3>
                    <h3>{user.identifyCard}</h3>
                </div>
            </div>

        </div>
    );
}

export default AuthorInfo;
