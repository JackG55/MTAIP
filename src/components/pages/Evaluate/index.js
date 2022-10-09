import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import ImgExample300 from '../../../assets/images/details/image-details-300.png';
import ImgExample from '../../../assets/images/details/image-details.png';

import ReactImageMagnify from 'react-image-magnify';
import RadioButtonGroup from '../../UIcomponents/RadioButtonGroup';
import CircularLoading from '../../UIcomponents/CircularLoading';
import Alert from '../../UIcomponents/AlertSuccess';

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

    //===========================================Xử lý Contract==========================//
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

    return (
        <div className={cx('evaluate-artwork')}>
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
