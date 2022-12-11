import CardUI from "../../UIcomponents/Card";

import { useState, useEffect } from 'react';
import styles from './Discovering.module.scss';
import classNames from 'classnames/bind';
import { makeGatewayURL } from '../../web3Storage_helper';

import BasicTab from '../../UIcomponents/BasicTab'

import MarketPlaceAddress from '../../../abis/Marketplace-address.json'


const cx = classNames.bind(styles);

function Discovering({ nft, marketplace, user }) {

  //===========================================Xử lý Contract==========================//
  //#region Contract
  const url = window.location.href.slice(34);
  console.log('url: ', url);

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [itemsCategory1, setItemsCategory1] = useState([])
  const [itemsCategory2, setItemsCategory2] = useState([])
  const [itemsCategory3, setItemsCategory3] = useState([])
  const [itemsCategory4, setItemsCategory4] = useState([])
  const [itemsCategory5, setItemsCategory5] = useState([])

  const loadMarketplaceItems = async () => {

    const itemCount = await marketplace.itemCount();
    let items = []
    let items1 = []
    let items2 = []
    let items3 = []
    let items4 = []
    let items5 = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold && item.check === true) {

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
        items.push({
          tokenId: item.tokenId,
          itemId: item.itemId,
          seller: item.seller,
          name: responseJson.tentacpham,
          image: imageGatewayURL,
          ownerName: userA[2]
        })
        if (responseJson.loaihinh === 'Tác phẩm tạo hình, mỹ thuật ứng dụng') {
          items1.push({
            tokenId: item.tokenId,
            itemId: item.itemId,
            seller: item.seller,
            name: responseJson.tentacpham,
            image: imageGatewayURL,
            ownerName: userA[2]
          })
        }
        if (responseJson.loaihinh === 'Tác phẩm nhiếp ảnh') {
          items2.push({
            tokenId: item.tokenId,
            itemId: item.itemId,
            seller: item.seller,
            name: responseJson.tentacpham,
            image: imageGatewayURL,
            ownerName: userA[2]
          })
        }
        if (responseJson.loaihinh === 'Tác phẩm kiến trúc') {
          items3.push({
            tokenId: item.tokenId,
            itemId: item.itemId,
            seller: item.seller,
            name: responseJson.tentacpham,
            image: imageGatewayURL,
            ownerName: userA[2]
          })
        }
        if (responseJson.loaihinh === 'Bản hoạ đồ, sơ đồ, bản đồ, bản vẽ') {
          items4.push({
            tokenId: item.tokenId,
            itemId: item.itemId,
            seller: item.seller,
            name: responseJson.tentacpham,
            image: imageGatewayURL,
            ownerName: userA[2]
          })
        }
        if (responseJson.loaihinh === 'Nhãn hiệu') {
          items5.push({
            tokenId: item.tokenId,
            itemId: item.itemId,
            seller: item.seller,
            name: responseJson.tentacpham,
            image: imageGatewayURL,
            ownerName: userA[2]
          })
        }

      }
    }
    setLoading(false)
    setItems(items);
    setItemsCategory1(items1)
    setItemsCategory2(items2)
    setItemsCategory3(items3)
    setItemsCategory4(items4)
    setItemsCategory5(items5)
   // console.log('items', items);
   // console.log('itemKientruc', items3);
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])
  //#endregion Contract
  //===================================================================================//

  return (
    <div>
      {url === '' && (
        <div className={cx('discover')}>
          <h1 className={cx('discover-title')}>
            KHÁM PHÁ CÁC NFT
          </h1>
          <div>
            <BasicTab
              items={items}
              itemsCategory1={itemsCategory1}
              itemsCategory2={itemsCategory2}
              itemsCategory3={itemsCategory3}
              itemsCategory4={itemsCategory4}
              itemsCategory5={itemsCategory5} />
          </div>
        </div>
      )}
      {url === 'assets' && (
        <div className={cx('discover')}>
          <h1 className={cx('discover-title')}>
            KHÁM PHÁ CÁC SẢN PHẨM SỞ HỮU TRÍ TUỆ
          </h1>
          <div className={cx('discover-content')}>
            {items.map((item) => (
              <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
            ))}
          </div>
        </div>
      )}
      {url === 'art' && (
        <div className={cx('discover')}>
          <h1 className={cx('discover-title')}>
            KHÁM PHÁ CÁC TÁC PHẨM TẠO HÌNH, MỸ THUẬT ỨNG DỤNG
          </h1>
          <div className={cx('discover-content')}>
            {itemsCategory1.map((item) => (
              <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
            ))}
          </div>
        </div>
      )}
      {url === 'photo' && (
        <div className={cx('discover')}>
          <h1 className={cx('discover-title')}>
            KHÁM PHÁ CÁC TÁC PHẨM NHIẾP ẢNH
          </h1>
          <div className={cx('discover-content')}>
            {itemsCategory2.map((item) => (
              <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
            ))}
          </div>
        </div>
      )}
      {url === 'architecture' && (
        <div className={cx('discover')}>
          <h1 className={cx('discover-title')}>
            KHÁM PHÁ CÁC TÁC PHẨM KIẾN TRÚC
          </h1>
          <div className={cx('discover-content')}>
            {itemsCategory3.map((item) => (
              <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
            ))}
          </div>
        </div>
      )}
      {url === 'diagram' && (
        <div className={cx('discover')}>
          <h1 className={cx('discover-title')}>
            KHÁM PHÁ CÁC BẢN HOẠ ĐỒ, SƠ ĐỒ, BẢN VẼ
          </h1>
          <div className={cx('discover-content')}>
            {itemsCategory4.map((item) => (
              <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
            ))}
          </div>
        </div>
      )}
      {url === 'brand' && (
        <div className={cx('discover')}>
          <h1 className={cx('discover-title')}>
            KHÁM PHÁ CÁC NHÃN HIỆU
          </h1>
          <div className={cx('discover-content')}>
            {itemsCategory5.map((item) => (
              <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
            ))}
          </div>
        </div>
      )}
    </div>

  );
}

export default Discovering;