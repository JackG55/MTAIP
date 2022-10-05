import { useState, useEffect, useRef } from 'react';

import ImageIcon from '@mui/icons-material/Image';
import IconButton from '@mui/material/IconButton';
import BasicTextFields from '../../UIcomponents/TextField';
import ClearIcon from '@mui/icons-material/Clear';

import styles from './Author.module.scss';
import classNames from 'classnames/bind';

import { jsonFile, makeGatewayURL } from '../../web3Storage_helper';
import makeStorageClient from '../../getWeb3Token';

import { ethers } from 'ethers';
import UserRegisterAddress from '../../../../src/abis/UserRegister-address.json';
import UserRegister from '../../../../src/abis/UserRegister.json';


const cx = classNames.bind(styles);

function Author() {
    //============================================Xử lý BLockchain==========================//
    // #region Blockchain

    const [account, setAccount] = useState('');
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false)
    // MetaMask Login/Connect
    const web3Handler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

         // Get provider from Metamask
         const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
         // Set signer
         const signer = provider.getSigner();

        loadContracts(signer);
        setLoading(true);
    };

    const loadContracts = async (signer) => {
        // Get deployed copies of contracts
        const user = new ethers.Contract(UserRegisterAddress.address, UserRegister.abi, signer);
        setUser(user);
    };

    // window.ethereum.on('accountsChanged', function (accounts) {
    //     setAccount(accounts[0]);
    // });

    useEffect(() => {
        web3Handler();
    }, [account]);

    // #endregion Blockchain
    //=====================================================================================//

    //============================================Xử lý contract===========================//
    //#region Contract
    const createUser = async (_userId, _isExpert, _UserURI, _name) => {
        await (await user.creatUser(_userId, _isExpert, _UserURI, _name)).wait();
        await user.ExpertSign(_userId);
        const userA = await user.users(_userId);
        console.log(userA)
        console.log('done')
      // user.on('Signed', (_userId, _UserURI ,_name, _isExpert, true))
        
    }

    // const showName = async(_userId) => {
    //    const userA = await user.users(_userId)
    //    window.alert('showname ' + userA)
    // }

    // #endregion Contract
    //=====================================================================================//

    //============================================Xử lý upload ảnh===========================//
    // #region UploadImage

    const checkInput = () => {
        if (!email || !name || !dateOfBirth || !identifyCard || !phone) {
            window.alert('Bạn phải điền đầy đủ các trường');
            return false;
        } else {
            return true;
        }
    };

    // let navigate = useNavigate()

    const UploadtoIPFS = async () => {
        if (image1 && image2) {
            try {
                const metadataFile = jsonFile('metadata.json', {
                    name: name,
                    email: email,
                    phone: phone,
                    dateOfBirth: dateOfBirth,
                    identifyCard: identifyCard,
                });

                const client = makeStorageClient();
                const cid = await client.put([image1, image2, metadataFile], { name: 'User ' + identifyCard });

                //const imageURI = `ipfs://${cid}/${image.name}`;
                const metadataURI = `ipfs://${cid}/metadata.json`;
                const metadataGatewayURL = makeGatewayURL(cid, 'metadata.json');
                //const imageGatewayURL = makeGatewayURL(cid, image.name);
                console.log(metadataGatewayURL)


                //upload xong thì đăng ký
                createUser(account, true, metadataURI, name)


            } catch (error) {
                console.log('Error sending File to IPFS: ');
                console.log(error);
            }
        }
    };
    // #endregion storeImage
    //==========================================================================================================//

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [identifyCard, setIdentifyCard] = useState('');

    const fileInput1 = useRef(null);
    const fileInput2 = useRef(null);
    const [image1, setImage1] = useState();
    const [preview1, setPreview1] = useState();

    const [image2, setImage2] = useState();
    const [preview2, setPreview2] = useState();

    const handleClick = (e) => {
        e.preventDefault();
        if (checkInput()) {
            // const newAuthor = {
            //     email: email,
            //     name: name,
            //     dateOfBirth: dateOfBirth,
            //     phone: phone,
            //     identifyCard: identifyCard,
            // };
            // console.log(newAuthor);
            UploadtoIPFS();
        }
    };

    const handleFileInput1 = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file) {
            setImage1(file);
        } else {
            setImage1(null);
        }
    };

    useEffect(() => {
        if (image1) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview1(reader.result);
            };
            reader.readAsDataURL(image1);
        } else {
            setPreview1(null);
        }
    }, [image1]);

    const deleteImage1 = (e) => {
        e.preventDefault();
        setPreview1(null);
    };

    const handleFileInput2 = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file) {
            setImage2(file);
        } else {
            setImage2(null);
        }
    };

    useEffect(() => {
        if (image2) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview2(reader.result);
            };
            reader.readAsDataURL(image2);
        } else {
            setPreview2(null);
        }
    }, [image2]);

    const deleteImage2 = (e) => {
        e.preventDefault();
        setPreview2(null);
    };

    return (
        <div className={cx('author-signup')}>
            <h1>Thêm thông tin cá nhân</h1>
            <BasicTextFields disabled label="Địa chỉ tài khoản" value={account} />
            <div className={cx('author-content')}>
                <div className={cx('author-CCCD')}>
                    <h3>Tải lên Thẻ Căn cước/Chứng minh thư</h3>
                    <div className={cx('author-CCCD-content')}>
                        <div className={cx('author-CCCD-content-front')}>
                            <h4>Mặt trước</h4>
                            <div className={cx('author-CCCD-link')}>
                                <div className={cx('author-CCCD-inside')}>
                                    <IconButton onClick={(e) => fileInput1.current && fileInput1.current.click()}>
                                        {preview1 ? (
                                            <img src={preview1} style={{ objectFit: 'cover' }} alt="" />
                                        ) : (
                                            <ImageIcon sx={{ position: 'absolute', height: '100px', width: '100px' }} />
                                        )}
                                    </IconButton>
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        ref={fileInput1}
                                        onChange={handleFileInput1}
                                        accept="image/* , png, jpeg, jpg"
                                    ></input>
                                    {preview1 ? (
                                        <div className={cx('delete-icon')}>
                                            <ClearIcon
                                                onClick={deleteImage1}
                                                sx={{ height: '30px', width: '30px' }}
                                            ></ClearIcon>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className={cx('author-CCCD-content-back')}>
                            <h4>Mặt sau</h4>
                            <div className={cx('author-CCCD-link')}>
                                <div className={cx('author-CCCD-inside')}>
                                    <IconButton onClick={(e) => fileInput2.current && fileInput2.current.click()}>
                                        {preview2 ? (
                                            <img src={preview2} style={{ objectFit: 'cover' }} alt="" />
                                        ) : (
                                            <ImageIcon sx={{ position: 'absolute', height: '100px', width: '100px' }} />
                                        )}
                                    </IconButton>
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        ref={fileInput2}
                                        onChange={handleFileInput2}
                                        accept="image/* , png, jpeg, jpg"
                                    ></input>
                                    {preview2 ? (
                                        <div className={cx('delete-icon')}>
                                            <ClearIcon
                                                onClick={deleteImage2}
                                                sx={{ height: '30px', width: '30px' }}
                                            ></ClearIcon>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BasicTextFields label="Họ và tên" name="name" onChange={(e) => setName(e.target.value)} />
                <BasicTextFields label="Địa chỉ Email" name="email" onChange={(e) => setEmail(e.target.value)} />
                <BasicTextFields
                    label="Ngày sinh"
                    name="dateOfBirth"
                    type="date"
                    defaultValue="1999-01-01"
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <BasicTextFields
                    label="Số CMND/CCCD"
                    name="identifyCard"
                    onChange={(e) => setIdentifyCard(e.target.value)}
                />
                <BasicTextFields label="Số điện thoại" name="phone" onChange={(e) => setPhone(e.target.value)} />

                <div className={cx('author-btn')}>
                    <button className={cx('author-signbtn')} onClick={handleClick}>
                        Đăng ký
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Author;
