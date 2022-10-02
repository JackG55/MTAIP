import BasicTextFields from '../../UIcomponents/TextField';
import SelectTextFields from '../../UIcomponents/Selection';
import ImageIcon from '@mui/icons-material/Image';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import { useState, useEffect, useRef } from 'react';

import styles from './SignUp.module.scss';
import classNames from 'classnames/bind';

import { ethers } from 'ethers';

import makeStorageClient from '../../getWeb3Token';
import { jsonFile } from '../../web3Storage_helper';
import { useNavigate } from 'react-router-dom';


const cx = classNames.bind(styles);

function SignUp({ nft, marketplace, user }) {
    const [values, setValues] = useState({
        loaihinh: '',
        tentacpham: '',
        dateHT: new Date().toLocaleDateString(),
        dateCB: new Date().toLocaleDateString(),
        noidung: '',
        price: 0,
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
            name: 'noidung',
            type: 'text',
            label: 'Nhập nội dung',
        },
        {
            id: 3,
            name: 'dateHT',
            type: 'date',
            label: 'Ngày hoàn thành',
            defaultValue: '2022-05-09',
        },
        {
            id: 4,
            name: 'dateCB',
            type: 'date',
            label: 'Ngày công bố',
            defaultValue: '2022-05-09',
        },
        {
            id: 5,
            name: 'price',
            type: 'number',
            label: 'Giá bán',
        },
    ];

    //============================================Xử lý BLockchain==========================//
    // #region Blockchain

    const [account, setAccount] = useState('');
    const [username, setUsername] = useState('')
    // MetaMask Login/Connect
    const web3Handler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        GetUserName(account);
    };

    window.ethereum.on('accountsChanged', function (accounts) {
        setAccount(accounts[0]);
    });

    useEffect(() => {
        web3Handler();
    }, [account]);

    // #endregion Blockchain
    //=====================================================================================//

    //============================================Xử lý contract===========================//
    //#region Contract
    const [tokenId, setTokenId] = useState()
    

    const mint = async (uri) => {
        await (await nft.mint(uri)).wait();
        const id = await nft.tokenCount();
       setTokenId(id)
    };

    const mintThenList = async (uri) => {
        await (await nft.mint(uri)).wait();
        // get tokenId of new nft
        const id = await nft.tokenCount();
        setTokenId(id);
        //console.log(id);
        // approve marketplace to spend nft
        await (await nft.setApprovalForAll(marketplace.address, true)).wait();
        // add nft to marketplace
        const listingPrice = ethers.utils.parseEther(values.price.toString());
        await (await marketplace.makeItem(nft.address, id, listingPrice)).wait();
    };

     const GetUserName = async(_userId) => {
        const userA = await user.users(_userId)
         setUsername(userA.name)
     }
    // #endregion Contract
    //=====================================================================================//

    //============================================Xử lý upload ảnh===========================//
    // #region UploadImage

    const checkInput = () => {
        if (!values.tentacpham || !values.loaihinh || !values.dateCB || !values.dateHT || !values.noidung) {
            window.alert('Bạn phải điền đầy đủ các trường');
            return false;
        } else {
            return true;
        }
    };

    let navigate = useNavigate() 
    
    const UploadtoIPFS = async () => {
        if (image) {
            try {
                const metadataFile = jsonFile('metadata.json', {
                    path: image.name,
                    tentacpham: values.tentacpham,
                    loaihinh: values.loaihinh,
                    ngaycongbo: values.dateCB,
                    ngayhoanthanh: values.dateHT,
                    noidung: values.noidung,
                    giachuyennhuong: values.price,
                });

                const client = makeStorageClient();
                const cid = await client.put([image, metadataFile], { name: image.name });

                const imageURI = `ipfs://${cid}/${image.name}`;
                //const metadataURI = `ipfs://${cid}/metadata.json`;
                //const metadataGatewayURL = makeGatewayURL(cid, 'metadata.json');
                //const imageGatewayURL = makeGatewayURL(cid, image.name);

                //sau khi đã upload xong thì mint
                //kiểm tra xem có set giá ko ??

                if (!values.price || values.price === 0) {
                    mint(imageURI);
                } else {
                    mintThenList(imageURI);
                }
                //khi nào mint xong thì chuyển qua trang detai của sản phẩm đó
                navigate(`/detail/${tokenId}`)
            } catch (error) {
                console.log('Error sending File to IPFS: ');
                console.log(error);
            }
        }
    };
    // #endregion storeImage
    //==========================================================================================================//

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const childToParent = (childdata) => {
        setValues({ ...values, loaihinh: childdata });
    };

    //#Nút Đăng Ký
    const handleClick = async () => {
        //đầu tiên là upload lên IPFS và mint NFT
        //UploadtoIPFS();
        if (checkInput) {
            const uploadinfo = UploadtoIPFS();
            console.log(uploadinfo.imageURI);
        }
    };

    const fileInput = useRef(null);

    const [image, setImage] = useState();
    const [preview, setPreview] = useState();

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        } else {
            setImage(null);
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

    const deleteImage = (e) => {
        e.preventDefault();
        setPreview(null);
    };

    return (
        <div className={cx('sign-app')}>
            <h1> Đăng ký bản quyền </h1>
            <div className={cx('image-author-content')}>
                <div className={cx('image-content')}>
                    <div className={cx('image-link')}>
                        <div className={cx('image-inside')}>
                            <IconButton onClick={(e) => fileInput.current && fileInput.current.click()}>
                                {preview ? (
                                    <img className={cx('image-display')} src={preview} style={{ objectFit: 'cover' }} alt='' />
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
                            {preview ? (
                                <div className={cx('delete-icon')}>
                                    <ClearIcon
                                        onClick={deleteImage}
                                        sx={{ height: '30px', width: '30px' }}
                                    ></ClearIcon>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className={cx('author-content')}>
                    <BasicTextFields disabled label="Tác giả" value={username} />
                    <BasicTextFields disabled label="Địa chỉ tài khoản" value={account} />
                </div>
            </div>
            <div className={cx('artwork-content')}>
                <SelectTextFields childToParent={childToParent} />
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
