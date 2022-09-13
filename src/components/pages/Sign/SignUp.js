import BasicTextFields from '../../UIcomponents/TextField';
import SelectTextFields from '../../UIcomponents/Selection';
import PreviewImage from '../../UIcomponents/PreviewImage';

import ImageIcon from '@mui/icons-material/Image';
import IconButton from '@mui/material/IconButton';

import { useState, useEffect, useRef } from 'react';

import styles from './SignUp.module.scss';
import classNames from 'classnames/bind';
import Web3 from 'web3/dist/web3.min.js';
import detectEthereumProvider from '@metamask/detect-provider';

import MarketplaceAddress from '../../../../src/abis/Marketplace-address.json';
import MarketplaceAbi from '../../../../src/abis/Marketplace.json';
import MTAIPAddress from '../../../../src/abis/MTAIP-address.json';
import MTAIPAbi from '../../../../src/abis/MTAIP.json';

const cx = classNames.bind(styles);

function SignUp() {
    const [values, setValues] = useState({
        tentacpham: '',
        dateHT: '',
        dateCB: '',
        noidung: '',
        link: '',
    });

    const inputs = [
        {
            id: 1,
            name: 'tentacpham',
            type: 'text',
            label: 'Nhập tên tác phẩm',
        },
        {
            id: 2,
            name: 'dateHT',
            type: 'date',
            label: 'Ngày hoàn thành',
            defaultValue: '2022-05-09',
        },
        {
            id: 3,
            name: 'dateCB',
            type: 'date',
            label: 'Ngày công bố',
            defaultValue: '2022-05-09',
        },
        {
            id: 4,
            name: 'noidung',
            type: 'text',
            label: 'Nhập nội dung',
        },
    ];

    //============================================Xử lý upload ảnh===========================//

    //============================================Xử lý BLockchain==========================//
    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState('');
    const [nft, setNFT] = useState({});
    const [marketplace, setMarketplace] = useState({});
    // MetaMask Login/Connect
    const web3Handler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        // Get provider from Metamask
        const provider = await detectEthereumProvider();
        if (provider) {
            console.log('ethereum wallet is connected');
            window.web3 = new Web3(provider);
        } else {
            // no ethereum provider
            console.log('no ethereum wallet detected');
        }

        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        });

        window.ethereum.on('accountsChanged', async function (accounts) {
            setAccount(accounts[0]);
            await web3Handler();
        });
        loadContracts();
    };

    const loadContracts = async () => {
        const web3 = window.web3;
        // Get deployed copies of contracts
        const marketplace = new web3.eth.Contract(MarketplaceAddress.address, MarketplaceAbi.abi);
        setMarketplace(marketplace);

        const nft = new web3.eth.Contract(MTAIPAddress.address, MTAIPAbi.abi);
        setNFT(nft);

        setLoading(false);
    };

    //=====================================================================================//

    const childToParent = (imglink) => {
        setValues({ ...values, link: imglink });
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleClick = async () => {
        if (!values.link || !values.noidung || !values.tentacpham) {
            window.alert('Bạn phải điền đầy đủ các trường');
        }
    };

    const fileInput = useRef(null)

    const [image, setImage] = useState();
    const [preview, setPreview] = useState();

    const handleFileInput = (e) => {
        // handle validations
       const file = e.target.files[0];
       if(file){
        console.log(file)
        setImage(file)
       }else{
        setImage(null)
       }
    }

    useEffect(() =>{
        if(image){
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(image);
        }
        else{
            setPreview(null)
        }
    }, [image])

    return (
        <div className={cx('sign-app')}>
            <h1> Đăng ký bản quyền </h1>
            <div className={cx('image-author-content')}>
                <div className={cx('image-content')}>
                    <div className={cx('image-link')}>
                        <div className={cx('image-inside')}>
                            <IconButton onClick={e => fileInput.current && fileInput.current.click()}>
                                <ImageIcon sx={{ position: 'absolute', height: '100px', width: '100px' }} />
                                {preview ? (<img className={cx('image-display')} src={preview} style={{ objectFit : 'cover' }}/>) : null}
                            </IconButton>
                            <input type="file" 
                                    style={{ display: 'none' }} 
                                    ref={fileInput} 
                                    onChange={handleFileInput}
                                    accept="image/* , png, jpeg, jpg"
                            >
                                    
                            </input>
                        </div>
                    </div>
                </div>
                <div className={cx('author-content')}>
                    <BasicTextFields disabled label="Tác giả" defaultValue="Nguyễn Văn A" />
                    <BasicTextFields disabled label="Địa chỉ tài khoản" value={account} />
                </div>
            </div>
            <div className={cx('artwork-content')}>
                <SelectTextFields />
                {inputs.map((input) => (
                    <BasicTextFields key={input.id} {...input} onChange={onChange} />
                ))}
                <div className={cx('signUp-btn')}>
                    <button className={cx('btn-sign')} onClick={handleClick}>
                        {' '}
                        Đăng ký{' '}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
