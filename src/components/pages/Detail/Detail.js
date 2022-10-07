import AccordionUI from '../../UIcomponents/AccordionUI';
import TableUI from '../../UIcomponents/TableUI';
import ImgExample from '../../../assets/images/details/image-details.png';
import EthereumIcon from '../../../assets/images/details/ethereum.png';
import CardUI from '../../UIcomponents/Card';

import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { makeGatewayURL } from '../../web3Storage_helper';

import MTAIPAddress from '../../../abis/MTAIP-address.json';
import MarketPlaceAddress from '../../../abis/Marketplace-address.json';

import styles from './Detail.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function createData(event, price, from, to, time) {
    return { event, price, from, to, time };
}

const rows = [
    createData('Mint', null, 'Null Address', 'NFT_Rabbithole', '18:00:56'),
    createData('List', 0.85, 'NFT_Rabbithole', ' ', '18:06:08'),
    createData('List', 1, 'NFT_Rabbithole', ' ', '18:06:09'),
    createData('List', 2, 'NFT_Rabbithole', ' ', '18:06:10'),
    createData('List', 31, 'NFT_Rabbithole', ' ', '18:06:11'),
    createData('List', 15, 'NFT_Rabbithole', ' ', '18:06:12'),
    createData('List', 100, 'NFT_Rabbithole', ' ', '18:06:13'),
    createData('List', 99, 'NFT_Rabbithole', ' ', '18:06:14'),
];

function Detail({ nft, marketplace, user }) {
    //lấy ra id đã nà
    const { id } = useParams();
    //console.log(id);

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
    const [loading, setLoading] = useState(true);
    const [ownerName, setOwnerName] = useState('');
    const [totalPrice, setTotalPrice]= useState();
    const [item, setItem] = useState({
        path: '',
        image: null,
        tentacpham: '',
        loaihinh: '',
        ngaycongbo: '',
        ngayhoanthanh: '',
        noidung: '',
        giachuyennhuong: '',
        seller: '',
    });

    const loadMarketplaceItems = async () => {
        // const ownerName = await nft.ownerOf(id);
        //       //console.log(ownerName)
        //       if(ownerName === MarketPlaceAddress.address)
        //       {
        //         setOwnerName('MTAIP')
        //       }
        //       else{
        //         const userA = await user.users(ownerName)
        //         setOwnerName(userA[2])
        //       }
        //load history
        //debugger
        //const history = await marketplace.itemTracks(id, 0);
        //console.log(history);

        const itemA = await marketplace.items(id);
        //const owner = await nft.ownerOf(id);
        //console.log('owner: ', owner);
        //console.log('seller: ', itemA.seller);
        const totalPrice = await marketplace.getTotalPrice(id);
        setTotalPrice(totalPrice)

        const feeaccount = await marketplace.feeAccount();
        console.log('feeaccount: ', feeaccount)
        //console.log('tổng giá: ', totalPrice);
        //console.log('giá gốc', itemA.price);

        const userA = await user.users(itemA.seller);
        setOwnerName(userA[2]);

        // get uri url from nft contract
        const uri = await nft.tokenURI(id);

        const cid = await uri.split('ipfs://').join('').split('/')[0];
        const imageName = await uri.split('/')[3];

        const imageGatewayURL = makeGatewayURL(cid, imageName);
        const metadataURL = makeGatewayURL(cid, 'metadata.json');

        // console.log(metadataURL)
        const response = await fetch(metadataURL);
        const responseJson = await response.json();
        //console.log(responseJson)
        //Add item to items array
        setItem({
            ...item,
            image: imageGatewayURL,
            tentacpham: responseJson.tentacpham,
            loaihinh: responseJson.loaihinh,
            ngaycongbo: responseJson.ngaycongbo,
            ngayhoanthanh: responseJson.ngayhoanthanh,
            noidung: responseJson.noidung,
            giachuyennhuong: responseJson.giachuyennhuong,
            seller: itemA.seller,
        });


        
        setLoading(false);
    };

    useEffect(() => {
        loadMarketplaceItems();
    }, []);


    const buyMarketItem = async () => {
        await (await marketplace.purchaseItem(id, account, { value: totalPrice })).wait()
        console.log('mua thanh cong')
        loadMarketplaceItems()
      }
    //#endregion Contract
    //===================================================================================//

    return (
        <div className={cx('detail-artwork')}>
            <div className={cx('common-information')}>
                <div className={cx('image-info')}>
                    <img src={item.image} alt="" />
                </div>
                <div className={cx('common-info')}>
                    <h1>{item.tentacpham}</h1>
                    <div className={cx('own-info')}>
                        <p>Sở hữu bởi {ownerName}</p>
                        <span>
                            <VisibilityIcon />
                            10k Lượt xem
                        </span>
                        <span>
                            <FavoriteIcon />
                            400 Lượt thích
                        </span>
                    </div>
                    <AccordionUI id="1" title="Mô tả" type="description">
                        <p>{item.noidung}</p>
                    </AccordionUI>
                    <AccordionUI id="2" title="Chi tiết" type="detail">
                        <div className={cx('detail-content')}>
                            <div className={cx('detail-title')}>
                                <p>Địa chỉ hợp đồng</p>
                                <p>Token ID</p>
                                <p>Chuẩn Token</p>
                                <p>Blockchain</p>
                                <p>MetaData</p>
                            </div>
                            <div className={cx('detail-info')}>
                                <p style={{ color: '#7E3AF2' }}>{MTAIPAddress.address}</p>
                                <p style={{ color: '#7E3AF2' }}>{id}</p>
                                <p>ERC 721</p>
                                <p>Ethereum</p>
                                <p>Web3.Storage</p>
                            </div>
                        </div>
                    </AccordionUI>
                    <div className={cx('price-info')}>
                        <h3>Giá hiện tại</h3>
                        <div className={cx('ethereum-price')}>
                            <img src={EthereumIcon} alt="" style={{ height: '30px', width: '30px' }} />
                            <div className={cx('ethereum-info')}>
                                <span className={cx('etherum-price-detail')}>{item.giachuyennhuong} ETH </span>
                                <span className={cx('dollar-price-detail')}>${item.giachuyennhuong * 1.32}</span>
                            </div>
                        </div>
                        <div className={cx('buy-offer-btn')}>
                            {account === item.seller.toLowerCase() ? (
                                <button className={cx('offer-btn')}>Đề nghị</button>
                            ) : ((item.giachuyennhuong > 0) ? <button className={cx('buy-btn')} onClick={buyMarketItem}>Mua luôn</button> : <h1>Sản phẩm này là tài sản cá nhân</h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('history-transaction')}>
                <AccordionUI id="3" title="Lịch sử giao dịch" type="history">
                    <TableUI rows={rows} />
                </AccordionUI>
            </div>
            <div className={cx('another-artwork')}>
                <AccordionUI id="4" title="Những tác phẩm khác" type="timeline">
                    <div className={cx('artwork-info')}>
                        <div className={cx('artwork')}>
                            <CardUI />
                        </div>
                        <div className={cx('artwork')}>
                            <CardUI />
                        </div>
                        <div className={cx('artwork')}>
                            <CardUI />
                        </div>
                        <div className={cx('artwork')}>
                            <CardUI />
                        </div>
                        <div className={cx('artwork')}>
                            <CardUI />
                        </div>
                        <div className={cx('artwork')}>
                            <CardUI />
                        </div>
                        <div className={cx('artwork')}>
                            <CardUI />
                        </div>
                        <div className={cx('artwork')}>
                            <CardUI />
                        </div>
                    </div>
                </AccordionUI>
            </div>
        </div>
    );
}

export default Detail;
