import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import ImgExample300 from '../../../assets/images/details/image-details-300.png';
import ImgExample from '../../../assets/images/details/image-details.png';

import ReactImageMagnify from 'react-image-magnify';
import RadioButtonGroup from '../../UIcomponents/RadioButtonGroup';
import CircularLoading from '../../UIcomponents/CircularLoading';
import Alert from '../../UIcomponents/AlertSuccess';
import SearchBar from "../../UIcomponents/SearchBar"

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'

import { makeGatewayURL } from '../../web3Storage_helper';
import MarketPlaceAddress from '../../../abis/Marketplace-address.json';

import styles from './Evaluate.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Evaluate({ nft, marketplace, user }) {
    //lấy ra id đã nà
    const { id } = useParams()
    // console.log(id)

    //===========================================Xử lý Contract(Phần đánh giá)==========================//
    //#region Contract
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [ownerName, setOwnerName] = useState('')
    const [item, setItem] = useState({
        image: null,
        tentacpham: "",
    })


    const [loadingDA, setLoadingDA] = useState(false)
    const [alert, setAlert] = useState(false)

    const loadMarketplaceItems = async () => {

        // get uri url from nft contract
        const uri = await nft.tokenURI(id)

        const item = await marketplace.items(id);
        const userA = await user.users(item.seller)
        setOwnerName(userA[2])

        // const item = await marketplace.items(id);
        // const userA = await user.users(item.seller)
        // setOwnerName(userA[2])


        const cid = await uri.split("ipfs://").join("").split("/")[0]
        const imageName = await uri.split("/")[3]

        const imageGatewayURL = makeGatewayURL(cid, imageName);
        const metadataURL = makeGatewayURL(cid, 'metadata.json')

        // console.log(metadataURL)
        const response = await fetch(metadataURL)
        const responseJson = await response.json();
        //console.log(responseJson)

        setItem({
            ...item,
            image: imageGatewayURL,
            tentacpham: responseJson.tentacpham,
        })

        //console.log(item)

        //Add item to items array
        setLoading(false)
    }

    useEffect(() => {
        loadMarketplaceItems()
    }, [])
    //#endregion Contract
    //===================================================================================//


    const [formData, setFormData] = React.useState('notEvaluate');

    const handleClick = async (e) => {
        e.preventDefault();
        setLoadingDA(true);
        console.log(formData);
        if (formData === 'accept') {
            await marketplace.Checked(id);
            console.log('Đã kiểm duyệt')
        } else {
            console.log('Không được kiểm duyệt')
        }
        setAlert(true);
    };

    const backToHomePage = (e) => {
        setLoadingDA(false);
        setAlert(false);
        // tro ve trang Home
        navigate('/');
    }

    //===========================================Xử lý Contract (Phần tìm kiếm)==========================//
    //#region Contract
    const [loadingSearch, setLoadingSearch] = useState(true)
    const [itemsSearch, setItemsSearch] = useState([])
    const [ownerNameSearch, setOwnerNameSearch] = useState('')
    const loadMarketplaceItemsSearch = async () => {
        // Load all unsold items
        const itemCountSearch = await marketplace.itemCount();
        let itemsSearch = []
        // console.log(itemCount)

        for (let i = 1; i <= itemCountSearch; i++) {
            const itemSearch = await marketplace.items(i)
            if (!itemSearch.sold && itemSearch.check === true) {
                const ownerAddressSearch = await nft.ownerOf(i);

                const userASearch = await user.users(itemSearch.seller)

                // console.log(userA[[0]])

                // get uri url from nft contract
                const uriSearch = await nft.tokenURI(itemSearch.tokenId)
                const cidSearch = await uriSearch.split("ipfs://").join("").split("/")[0]
                const imageNameSearch = await uriSearch.split("/")[3]

                const imageGatewayURLSearch = makeGatewayURL(cidSearch, imageNameSearch);
                const metadataURLSearch = makeGatewayURL(cidSearch, 'metadata.json')

                //console.log(metadataURL)
                const responseSearch = await fetch(metadataURLSearch)
                const responseJsonSearch = await responseSearch.json();
                console.log(responseJsonSearch)

                //Add item to items array
                itemsSearch.push({
                    tokenId: itemSearch.tokenId,
                    itemId: itemSearch.itemId,
                    seller: itemSearch.seller,
                    name: responseJsonSearch.tentacpham,
                    image: imageGatewayURLSearch,
                    ownerName: userASearch[2]
                })
            }
        }
        setLoadingSearch(false)
        setItemsSearch(itemsSearch)
    }

    useEffect(() => {
        loadMarketplaceItemsSearch()
    }, [])
    //#endregion Contract
    //===================================================================================//



    return (
        <div className={cx('evaluate-artwork')}>
            <div className={cx('evaluate-content')}>
                <h1>Đánh giá tác phẩm</h1>
                <div className={cx('evaluate-common-information')}>
                    <div className={cx('evaluate-image-img')}>
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: '',
                                    isFluidWidth: true,
                                    src: (item.image || ImgExample),
                                },
                                largeImage: {
                                    src: (item.image || ImgExample300),
                                    width: 300,
                                    height: 300,
                                },
                            }}
                        />
                    </div>
                    <div className={cx('evaluate-common-info')}>
                        <h2>{item.tentacpham}</h2>
                        <div className={cx('evaluate-own-info')}>
                            <p>Sở hữu bởi {ownerName}</p>
                        </div>
                        <div className={cx('evaluate-checkbox')}>
                            <RadioButtonGroup
                                formData={formData}
                                setFormData={setFormData}
                            ></RadioButtonGroup>
                        </div>
                    </div>
                </div>
                <div className={cx('evaluate-btn')}>
                    <button className={cx('btn-evaluate')} onClick={handleClick}>Gửi</button>
                </div>

            </div>
            <div className={cx('search-content')}>
                <h2>Danh sách các sản phẩm</h2>
                <SearchBar placeholder='Nhập tên tác phẩm...' data={itemsSearch} />
            </div>
            {loadingDA === true && (
                <div className={cx('loading-signup')}>
                    <div className={cx('loading')}>
                        <CircularLoading info='Đang gửi kết quả' />
                    </div>
                </div>
            )}
            {alert === true && (
                <div className={cx('alert-signup')} onClick={backToHomePage}>
                    <div className={cx('alert')}>
                        <Alert alert='Thành công' />
                    </div>
                </div>
            )}

        </div >
    );
}

export default Evaluate;
