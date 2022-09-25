import CardUI from "../../UIcomponents/Card";

import { useState, useEffect } from 'react';
import styles from './Discovering.module.scss';
import classNames from 'classnames/bind';
import { ethers } from 'ethers';
import { jsonFile, makeGatewayURL } from '../../web3Storage_helper';

import makeStorageClient from '../../getWeb3Token';

const cx = classNames.bind(styles);

function Discovering({nft, marketplace}) {


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
    }, [account]);

    // #endregion Blockchain
    //=====================================================================================//

    //===========================================Xử lý Contract==========================//
    //#region Contract
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const loadMarketplaceItems = async () => {
      // Load all unsold items
      const itemCount = await marketplace.itemCount();
      let items = []

      for (let i = 1; i <= itemCount; i++) {
        const item = await marketplace.items(i)
        if (!item.sold) {
          // get uri url from nft contract
          const uri = await nft.tokenURI(item.tokenId)
           const cid = await uri.split("ipfs://").join("").split("/")[0]
           const imageName = await uri.split("/")[3]
          
           const imageGatewayURL = makeGatewayURL(cid, imageName);
           const metadataURL = makeGatewayURL(cid, 'metadata.json')
          
           console.log(metadataURL)
           const response = await fetch(metadataURL)
           const responseJson = await response.json();
           console.log(responseJson)
          
          //Add item to items array
          items.push({
            itemId: item.itemId,
            seller: item.seller,
            name: responseJson.tentacpham,
            image: imageGatewayURL
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
        <div className={cx('discover')}>
            <h1 className={cx('discover-title')}>
                KHÁM PHÁ CÁC SẢN PHẨM SỞ HỮU TRÍ TUỆ
            </h1>
            <div className={cx('discover-content')}>
            {items.map((item) => (
              <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name}/>
            ))}
                 
            </div>
            
        </div>
        
     );
}

export default Discovering;