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

import { Web3Storage, File } from 'web3.storage';
import { ethers } from 'ethers';

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
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Set signer
        const signer = provider.getSigner();

        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        });

        window.ethereum.on('accountsChanged', async function (accounts) {
            setAccount(accounts[0]);
            await web3Handler();
        });
        loadContracts(signer);
    };
    const loadContracts = async (signer) => {
        // Get deployed copies of contracts
        const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
        setMarketplace(marketplace);
        const nft = new ethers.Contract(MTAIPAddress.address, MTAIPAbi.abi, signer);
        setNFT(nft);
    };

    window.ethereum.on('accountsChanged', function (accounts) {
        setAccount(accounts[0]);
    });

    useEffect(() => {
        web3Handler();
    }, [account]);

    const mint = async (uri) => {
        await (await nft.mint(uri)).wait();
        const id = await nft.tokenCount();
        console.log(id);
    };

    //=====================================================================================//

    const childToParent = (imglink) => {
        setValues({ ...values, link: imglink });
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleClick = async () => {
        //đầu tiên là upload lên IPFS và mint NFT
        UploadtoIPFS();
    };

    const fileInput = useRef(null);

    const [image, setImage] = useState();
    const [preview, setPreview] = useState();

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            console.log(file.name);
        } else {
            setImage(null);
        }
    };

    function makeStorageClient() {
        return new Web3Storage({
            token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDM0NzMyNjA2ZDU1MmI1MUIxOUJGQjM4QmM5RmZGNjZmMjcwYjQ3MkIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjMwODYyMTM3ODMsIm5hbWUiOiJNVEFJUCJ9.we6MoKCTAgAkgBsirN_fLFMPzpJFFdOPnqdDDl8PneY`,
        });
    }

    const UploadtoIPFS = async () => {
        if (image) {
            console.log(image);
            try {
                const client = makeStorageClient();
                const cid = await client.put([image], { name: image.name });
                const imageURI = `ipfs://${cid}/${image.name}`;

                mint(imageURI);
            } catch (error) {
                console.log('Error sending File to IPFS: ');
                console.log(error);
            }
        }
    };

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);

    return (
        <div className={cx('sign-app')}>
            <h1> Đăng ký bản quyền </h1>
            <div className={cx('image-author-content')}>
                <div className={cx('image-content')}>
                    <div className={cx('image-link')}>
                        <div className={cx('image-inside')}>
                            <IconButton onClick={(e) => fileInput.current && fileInput.current.click()}>
                                {preview ? (
                                    <img className={cx('image-display')} src={preview} style={{ objectFit: 'cover' }} />
                                ) : (
                                    <ImageIcon sx={{ position: 'absolute', height: '100px', width: '100px' }} />
                                )}
                            </IconButton>
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                ref={fileInput}
                                onChange={handleFileInput}
                                accept="image/* , png, jpeg, jpg"
                            ></input>
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
                        Đăng ký
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
