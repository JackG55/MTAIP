import CardUI from "../../UIcomponents/Card";

import { useState, useEffect } from 'react';
import styles from './Discovering.module.scss';
import classNames from 'classnames/bind';
import { ethers } from 'ethers';


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
      const itemCount = await marketplace.itemCount()
      for (let i = 1; i <= itemCount; i++) {
        const item = await marketplace.items(i)
        if (!item.sold) {
          // get uri url from nft contract
          const uri = await nft.tokenURI(item.tokenId)
         console.log(uri)
          // use uri to fetch the nft metadata stored on ipfs 
          //const response = await fetch(uri)
          //const metadata = await response.json()
        
          // Add item to items array
        //   items.push({
        //     itemId: item.itemId,
        //     seller: item.seller,
        //     name: metadata.name,
        //     image: metadata.image
        //   })
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
                 <CardUI />
                 <CardUI />
                 <CardUI />
                 <CardUI />
                 <CardUI />
                 <CardUI />
                 <CardUI />
            </div>
            
        </div>
        
     );
}

export default Discovering;