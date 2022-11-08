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
  const [ownerName, setOwnerName] = useState('')
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    let items = []
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
      }
    }
    setLoading(false)
    setItems(items);
  }


  useEffect(() => {
    loadMarketplaceItems()
  }, [])
  //#endregion Contract
  //===================================================================================//


  //===========================================Xử lý Contract(art)==========================//
  //#region Contract
  const [loading1, setLoading1] = useState(true)
  const [itemsCategory1, setItemsCategory1] = useState([])
  const loadMarketplaceItemsCategory1 = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    let items = []


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
        //console.log(responseJson)
        //Add item to items array
        if (responseJson.loaihinh === 'Tác phẩm tạo hình, mỹ thuật ứng dụng') {
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
    }
    setLoading1(false)
    setItemsCategory1(items)
  }


  useEffect(() => {
    loadMarketplaceItemsCategory1()
  }, [])
  //#endregion Contract
  //===================================================================================//

  //===========================================Xử lý Contract(photo)==========================//
  //#region Contract
  const [loading2, setLoading2] = useState(true)
  const [itemsCategory2, setItemsCategory2] = useState([])
  const loadMarketplaceItemsCategory2 = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    let items = []


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
        console.log(responseJson)
        //Add item to items array
        if (responseJson.loaihinh === 'Tác phẩm nhiếp ảnh') {
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
    }
    setLoading2(false)
    setItemsCategory2(items)
  }


  useEffect(() => {
    loadMarketplaceItemsCategory2()
  }, [])
  //#endregion Contract
  //===================================================================================//

  //===========================================Xử lý Contract(architecture)==========================//
  //#region Contract
  const [loading3, setLoading3] = useState(true)
  const [itemsCategory3, setItemsCategory3] = useState([])
  const loadMarketplaceItemsCategory3 = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    let items = []


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
        console.log(responseJson)
        //Add item to items array
        if (responseJson.loaihinh === 'Tác phẩm kiến trúc') {
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
    }
    setLoading3(false)
    setItemsCategory3(items)
  }


  useEffect(() => {
    loadMarketplaceItemsCategory3()
  }, [])
  //#endregion Contract
  //===================================================================================//

  //===========================================Xử lý Contract(diagram)==========================//
  //#region Contract
  const [loading4, setLoading4] = useState(true)
  const [itemsCategory4, setItemsCategory4] = useState([])
  const loadMarketplaceItemsCategory4 = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    let items = []


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
        console.log(responseJson)
        //Add item to items array
        if (responseJson.loaihinh === 'Bản hoạ đồ, sơ đồ, bản đồ, bản vẽ') {
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
    }
    setLoading4(false)
    setItemsCategory4(items)
  }


  useEffect(() => {
    loadMarketplaceItemsCategory4()
  }, [])
  //#endregion Contract
  //===================================================================================//

  //===========================================Xử lý Contract(brand)==========================//
  //#region Contract
  const [loading5, setLoading5] = useState(true)
  const [itemsCategory5, setItemsCategory5] = useState([])
  const loadMarketplaceItemsCategory5 = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    let items = []


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
        console.log(responseJson)
        //Add item to items array
        if (responseJson.loaihinh === 'Nhãn hiệu') {
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
    }
    setLoading5(false)
    setItemsCategory5(items)
  }


  useEffect(() => {
    loadMarketplaceItemsCategory5()
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
          <BasicTab itemsCategory1={itemsCategory1}
            itemsCategory2={itemsCategory2}
            itemsCategory3={itemsCategory3}
            itemsCategory4={itemsCategory4}
            itemsCategory5={itemsCategory5} />
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