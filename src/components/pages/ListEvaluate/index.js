import CardUI from '../../UIcomponents/CardEvaluate';
import { useState, useEffect } from 'react';
import { makeGatewayURL } from '../../web3Storage_helper';

import styles from './ListEvaluate.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ListEvaluate({ nft, marketplace, user }) {
    //kiểm tra xem user hiện tại có phải là chuyên gia không

    //hiển thị danh sách
    //===========================================Xử lý Contract==========================//
    //#region Contract
    const [loading, setLoading] = useState(true);
    const [checkedItems, setCheckedItems] = useState([]);
    const [uncheckedItems, setUncheckedItems] = useState([]);
    const [ownerName, setOwnerName] = useState('');
    const loadMarketplaceItems = async () => {
        // Load all unsold items
        const itemCount = await marketplace.itemCount();
        let items = [];

        for (let i = 1; i <= itemCount; i++) {
            const item = await marketplace.items(i);
            if (!item.check) {

                //get Name
                const userA = await user.users(item.seller)
                console.log(item.seller)
                //setOwnerName(userA[2])  

                // get uri url from nft contract
                const uri = await nft.tokenURI(item.tokenId);
                const cid = await uri.split('ipfs://').join('').split('/')[0];
                const imageName = await uri.split('/')[3];

                const imageGatewayURL = makeGatewayURL(cid, imageName);
                const metadataURL = makeGatewayURL(cid, 'metadata.json');

                //console.log(metadataURL)
                const response = await fetch(metadataURL);
                const responseJson = await response.json();
                console.log(responseJson);

                //Add item to items array
                items.push({
                    tokenId: item.tokenId,
                    itemId: item.itemId,
                    seller: item.seller,
                    name: responseJson.tentacpham,
                    image: imageGatewayURL,
                    ownerName: userA[2]
                });
            }
        }
        setLoading(false);
        setUncheckedItems(items);
    };

    useEffect(() => {
        loadMarketplaceItems();
    }, []);
    //#endregion Contract
    //===================================================================================//

    return (
        <div className={cx('list-evaluate')}>
            <h1>Danh sách tác phẩm</h1>
            <div className={cx('list-artwork')}>
                <h2>Chưa đánh giá</h2>
                <div className={cx('list-artwork-not-evaluate')}>
                    {uncheckedItems.map((item) => (
                        <CardUI
                            key={item.itemId}
                            backgroundImg={item.image}
                            Imgname={item.name}
                            tokenId={item.tokenId}
                            ownerName={item.ownerName}
                        />
                    ))}
                    {/* <CardUI evaluated='1' total='10' />
                    <CardUI evaluated='1' total='10' />
                    <CardUI evaluated='1' total='10' /> */}
                </div>
                {/* <h2>Đã đánh giá</h2>
                <div className={cx('list-artwork-evaluated')}>
                    <CardUI evaluated='1' total='10' check='accept' />
                    <CardUI evaluated='1' total='10' check='accept' />
                    <CardUI evaluated='1' total='10' check='notAccept' />
                    <CardUI evaluated='1' total='10' check='notAccept' />
                    <CardUI evaluated='1' total='10' check='notAccept' />
                    <CardUI evaluated='1' total='10' check='notAccept' />
                    <CardUI evaluated='1' total='10' check='notAccept' />
                </div> */}
            </div>
        </div>
    );
}

export default ListEvaluate;
