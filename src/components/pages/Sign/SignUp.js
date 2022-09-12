import BasicTextFields from '../../UIcomponents/TextField';
import SelectTextFields from '../../UIcomponents/Selection';
import PreviewImage from '../../UIcomponents/PreviewImage';

import { useState, useEffect } from 'react';

import styles from './SignUp.module.scss';
import classNames from 'classnames/bind';
import Web3 from 'web3/dist/web3.min.js';
import detectEthereumProvider from "@metamask/detect-provider";

import KryptoBirdz from '../../../abis/KryptoBirdz.json'

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



    //============================================Xử lý BLockchain==========================//
    const [state, setState] = useState({
        account: "",
        contract: null,
        totalSupply: 0,
        kryptoBirdz: [],
    })

    const [account, setAccount] = useState("")
    const [contract, setContract] = useState(null)
    const [totalSupply, setTotalSupply] = useState(0)
    const [kryptoBirdz, setKryptoBirdz] = useState([])

    useEffect( ()=>{
        async function init(){
            await loadWeb3();
            await loadBlockchainData();
        }
        init()
    },[])

    async function loadWeb3() {
        const provider = await detectEthereumProvider();
    
        // modern browsers
        // if there is a provider then lets
        // lets log that it's working and access the window from the doc
        // to set Web3 to the provider
    
        if (provider) {
          console.log("ethereum wallet is connected");
          window.web3 = new Web3(provider);
        } else {
          // no ethereum provider
          console.log("no ethereum wallet detected");
        }
      }
    


     async function loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0])
    
        // create a constant js variable networkId which is set to blockchain network id
        const networkId = await web3.eth.net.getId();
        const networkData = KryptoBirdz.networks[networkId];
        if (networkData) {
          // 1. create a var abi set to the Kryptobird abi
          // 2. create a var address set to networkData address
          // 3. create a var contract which grabs a new instance of web3 eth Contract
          // 4. login in the console the var contract successfully
          const abi = KryptoBirdz.abi;
          const address = networkData.address;
          const contract = new web3.eth.Contract(abi, address);
          setContract(contract)
    
          // call the total supply of our Krypto Birdz
          // grab the total supply on the front end and log the results
          // go to web3 doc and read up on methods and call
          const totalSupply = await contract.methods.totalSupply().call();
          setTotalSupply(totalSupply)
          // set up an array to keep track of tokens
          // load KryptoBirdz
          for (let i = 1; i <= totalSupply; i++) {
            const KryptoBird = await contract.methods.kryptoBirdz(i - 1).call();
            // how should we handle the state on the front end?
            setKryptoBirdz(...kryptoBirdz, KryptoBird)
          }
        } else {
          window.alert("Smart contract not deployed");
        }
      }


      const mint = (kryptoBird) => {
        contract.methods
          .mint(kryptoBird)
          .send({ from: account })
          .once("receipt", (receipt) => {
            setKryptoBirdz(...kryptoBirdz, KryptoBirdz )
          });
      };

    //=====================================================================================//


    const childToParent = (imglink) => {
        setValues({...values, link: imglink});
      }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleClick = () => {
    console.log(values)
       mint(values.link)
    }

    return (
        <div className={cx('sign-app')}>
            <h1> Đăng ký bản quyền </h1>
            <div className={cx('image-author-content')}>
                <div className={cx('image-content')}>
                    <PreviewImage childToParent={childToParent}/>
                </div>
                <div className={cx('author-content')}>
                    <BasicTextFields disabled label="Tác giả" defaultValue="Nguyễn Văn A" />
                    <BasicTextFields
                        disabled
                        label="Địa chỉ tài khoản"
                        value={account}
                    />
                </div>
            </div>
            <div className={cx('artwork-content')}>
                <SelectTextFields />
                {inputs.map((input) => (
                    <BasicTextFields key={input.id} {...input} onChange={onChange} />
                ))}
                <div className={cx('signUp-btn')}>
                    <button className={cx('btn-sign')}  onClick={handleClick}> Đăng ký </button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
