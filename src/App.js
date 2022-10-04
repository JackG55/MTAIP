import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { DefaultLayout } from './components/Layout';


import Home from '../src/components/pages/Home';
import Discovering from './components/pages/Discovering/Discovering';
import Create from '../src/components/pages/Create';
import SignUp from './components/pages/Sign/SignUp';
import Detail from './components/pages/Detail/Detail';
import Evaluate from '../src/components/pages/Evaluate';
import Author from '../src/components/pages/Author';
import ListEvaluate from '../src/components/pages/ListEvaluate';

import { ethers } from 'ethers';
import MarketplaceAddress from '../src/abis/Marketplace-address.json';
import MarketplaceAbi from '../src/abis/Marketplace.json';
import MTAIPAddress from '../src/abis/MTAIP-address.json';
import MTAIPAbi from '../src/abis/MTAIP.json';
import UserRegisterAddress from '../src/abis/UserRegister-address.json';
import UserRegisterAbi from '../src/abis/UserRegister.json'; 


function App() {
    //============================================Xử lý BLockchain==========================//
    // #region Blockchain

    //const [account, setAccount] = useState('');
    const [nft, setNFT] = useState({});
    const [marketplace, setMarketplace] = useState({});
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    // MetaMask Login/Connect
    const web3Handler = async () => {
        // Get provider from Metamask
        const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
        // Set signer
        const signer = provider.getSigner();

        // window.ethereum.on('chainChanged', (chainId) => {
        //     window.location.reload();
        // });


        loadContracts(signer);
        setLoading(true);
    };
    const loadContracts = async (signer) => {
        // Get deployed copies of contracts
        const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
        setMarketplace(marketplace);
        const nft = new ethers.Contract(MTAIPAddress.address, MTAIPAbi.abi, signer);
        setNFT(nft);
        const user = new ethers.Contract(UserRegisterAddress.address, UserRegisterAbi.abi, signer);
        setUser(user);
    };

    // window.ethereum.on('accountsChanged', function (accounts) {
    //     setAccount(accounts[0]);
    // });

    useEffect(() => {
        web3Handler();
    }, []);

    // #endregion Blockchain
    //=====================================================================================//


    // window.onbeforeunload = function () {
    //     sessionStorage.removeItem('account');
    //     console.log('unload')
    // };

    // window.onload = function () {
    //     if (sessionStorage.getItem('account') === null) {
    //         sessionStorage.setItem('account', '');
    //         console.log('load')
    //     }
    // }

    return (
        <Router>
            {
                loading &&
                <div className="App">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <DefaultLayout>
                                    <Home />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/create"
                            element={
                                <DefaultLayout>
                                    <Create />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/discovering"
                            element={
                                <DefaultLayout>
                                    <Discovering nft={nft} marketplace={marketplace} />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/detail/:id"
                            element={
                                <DefaultLayout>
                                    <Detail Discovering nft={nft} marketplace={marketplace} />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <DefaultLayout>
                                    <SignUp nft={nft} marketplace={marketplace} user={user}/>
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/evaluate/:id"
                            element={
                                <DefaultLayout>
                                    <Evaluate />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/author"
                            element={
                                <DefaultLayout>
                                    <Author />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/list"
                            element={
                                <DefaultLayout>
                                    <ListEvaluate />
                                </DefaultLayout>
                            }
                        />
                    </Routes>
                </div>
            }

        </Router>
    );
}

export default App;
