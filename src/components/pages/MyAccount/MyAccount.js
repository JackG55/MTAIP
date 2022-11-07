import CardUI from "../../UIcomponents/Card";
import VerticalTabs from "../../UIcomponents/VerticalTab"

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
    const [itemsAll, setItemsAll] = useState([])
    const [itemsLoading, setItemsLoading] = useState([])
    const [ownerName, setOwnerName] = useState('')

    const loadMarketplaceItems = async () => {
        // Load all unsold items
        const itemCount = await marketplace.itemCount();
        let itemsAll = []
        let itemsLoading = []
        for (let i = 1; i <= itemCount; i++) {
            const item = await marketplace.items(i)

            // Sản phẩm của tôi
            if (item.check === true && item.seller.toLowerCase() === account) {
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

                //Add item to items array
                itemsAll.push({
                    tokenId: item.tokenId,
                    itemId: item.itemId,
                    seller: item.seller,
                    name: responseJson.tentacpham,
                    image: imageGatewayURL,
                    ownerName: userA[2]
                })
            }
            // Đang chờ phê duyệt
            if (item.check === false && item.seller.toLowerCase() === account) {
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

                //Add item to items array
                itemsLoading.push({
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
        setItemsAll(itemsAll)
        setItemsLoading(itemsLoading)
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
            <div className={cx('myAccount-content')}>
                <VerticalTabs itemsAll={itemsAll} itemsLoading={itemsLoading} />
            </div>

        </div>
    );
}

export default MyAccount;