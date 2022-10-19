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

    // Sản phẩm của tôi
    const loadMarketplaceAllItems = async () => {
        // Load all unsold items
        const itemCount = await marketplace.itemCount();
        let itemsAll = []
        for (let i = 1; i <= itemCount; i++) {
            const item = await marketplace.items(i)
            // if (item.seller.toLowerCase() === account)
            //     console.log('true')
            // else
            //     console.log(false)
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
                console.log(responseJson)

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
        }
        setLoading(false)
        setItemsAll(itemsAll)
    }

    useEffect(() => {
        loadMarketplaceAllItems()
    }, [account])
    //#endregion Contract
    //===================================================================================//

    // Đang chờ phê duyệt
    const loadMarketplaceLoadingItems = async () => {
        // Load all unsold items
        const itemCount = await marketplace.itemCount();
        let itemsLoading = []
        for (let i = 1; i <= itemCount; i++) {
            const item = await marketplace.items(i)
            // if (item.seller.toLowerCase() === account)
            //     console.log('true')
            // else
            //     console.log(false)
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
                console.log(responseJson)

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
        setItemsLoading(itemsLoading)
    }

    useEffect(() => {
        loadMarketplaceLoadingItems()
    }, [account])

    return (
        <div className={cx('myAccount')}>
            <h1 className={cx('myAccount-title')}>
                SẢN PHẨM CỦA TÔI
            </h1>
            {/* {items.length === 0 && (<h2>Bạn chưa có sản phẩm (Sản phẩm của bạn đang được đánh giá)</h2>)}
            <div className={cx('myAccount-content')}>
                {items.map((item) => (
                    <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
                ))}
            </div> */}
            <div className={cx('myAccount-content')}>
                <VerticalTabs itemsAll={itemsAll} itemsLoading={itemsLoading} />
            </div>

        </div>
    );
}

export default MyAccount;