import CardUI from "../../UIcomponents/Card";

import { useState, useEffect } from 'react';
import { makeGatewayURL } from '../../web3Storage_helper';

import styles from './MyAccount.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MyAccount({ nft, marketplace, user }) {

    //============================================Xử lý BLockchain==========================//
    // #region Blockchain

    const [account, setAccount] = useState('');
    // MetaMask Login/Connect
    const web3Handler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
    };

    window.ethereum.on('accountsChanged', function (accounts) {
        setAccount(accounts[0]);
    });

    useEffect(() => {
        web3Handler();
    }, []);

    // #endregion Blockchain
    //=====================================================================================//

    //===========================================Xử lý Contract==========================//
    //#region Contract


    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [ownerName, setOwnerName] = useState('')
    const loadMarketplaceItems = async () => {
        // Load all unsold items
        const itemCount = await marketplace.itemCount();
        let items = []
        for (let i = 1; i <= itemCount; i++) {
            const item = await marketplace.items(i)
            // if (item.seller.toLowerCase() === account)
            //     console.log('true')
            // else
            //     console.log(false)
            if (!item.sold && item.check === true && item.seller.toLowerCase() === account) {
                const ownerAddress = await nft.ownerOf(i);
                const userA = await user.users(item.seller)
                // console.log(userA[[0]])

                // get uri url from nft contract
                const uri = await nft.tokenURI(item.tokenId)
                const cid = await uri.split("ipfs://").join("").split("/")[0]
                const imageName = await uri.split("/")[3]

                const imageGatewayURL = makeGatewayURL(cid, imageName);
                const metadataURL = makeGatewayURL(cid, 'metadata.json')

                //console.log(metadataURL)
                const response = await fetch(metadataURL)
                const responseJson = await response.json();
                console.log(responseJson)

                //Add item to items array
                items.push({
                    tokenId: item.tokenId,
                    itemId: item.itemId,
                    seller: item.seller,
                    name: responseJson.tentacpham,
                    image: imageGatewayURL,
                    ownerName: userA[2]
                })
            }
        }
        setLoading(false)
        setItems(items)
    }

    useEffect(() => {
        loadMarketplaceItems()
    }, [account])
    //#endregion Contract
    //===================================================================================//

    return (
        <div className={cx('myAccount')}>
            <h1 className={cx('myAccount-title')}>
                SẢN PHẨM CỦA TÔI
            </h1>
            {items.length === 0 && (<h2>Bạn chưa có sản phẩm (Sản phẩm của bạn đang được đánh giá)</h2>)}
            <div className={cx('myAccount-content')}>
                {items.map((item) => (
                    <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
                ))}
            </div>
        </div>
    );
}

export default MyAccount;