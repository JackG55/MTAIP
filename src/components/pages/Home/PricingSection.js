import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import Button from '@mui/material/Button';
import { makeGatewayURL } from '../../web3Storage_helper';
import { useState, useEffect } from 'react';

import CardUI from '../../UIcomponents/Card';

const cx = classNames.bind(styles);

function PricingSection({ nft, marketplace, user }) {

  //===========================================Xử lý Contract==========================//
  //#region Contract
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  //const [ownerName, setOwnerName] = useState('')
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
        //console.log(responseJson)

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
  }, [])
  //#endregion Contract
  //===================================================================================//

  return (
    <div className={cx('pricing-section')}>
      <h1>Khám phá các NFT</h1>
      <div className={cx('pricing-section-filter')}>
        <div className={cx('pricing-section-menu')}>
          <Button variant="contained" className={cx('pricing-section-menu-button')}>Tất cả thể loại</Button>
          <Button variant="contained" className={cx('pricing-section-menu-button')}>Tranh vẽ</Button>
          <Button variant="contained" className={cx('pricing-section-menu-button')}>Ảnh</Button>
          <Button variant="contained" className={cx('pricing-section-menu-button')}>Video</Button>
          <Button variant="contained" className={cx('pricing-section-menu-button')}>Âm nhạc</Button>
          <Button variant="contained" className={cx('pricing-section-menu-button')}>Bản thiết kế</Button>
        </div>
        <div className={cx('pricing-section-btn-filter')}>
          <Button variant="contained" startIcon={<FilterListRoundedIcon />} className={cx('pricing-section-btn-filter-detail')}>
            Bộ lọc
          </Button>
        </div>
      </div>
      <div className={cx('pricing-section-listing')}>
        {items.map((item) => (
          <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
        ))}
      </div>
      <div className={cx('pricing-section-btn-seemore')}>
        <button>Xem thêm</button>
      </div>
    </div>
  );
}

export default PricingSection;
