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
import MyAccount from './components/pages/MyAccount/MyAccount';
import Contact from './components/pages/Contact';
import AuthorInfo from './components/pages/AuthorInfor';

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
        // const provider = new ethers.providers.Web3Provider(window.ethereum)
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
            {loading && (
                <div className="App">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <DefaultLayout nft={nft} marketplace={marketplace} user={user}>
                                    <Home nft={nft} marketplace={marketplace} user={user} />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/create"
                            element={
                                <DefaultLayout nft={nft} marketplace={marketplace} user={user}>
                                    <Create />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/discovering/:category"
                            element={
                                <DefaultLayout nft={nft} marketplace={marketplace} user={user}>
                                    <Discovering nft={nft} marketplace={marketplace} user={user} />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/discovering"
                            element={
                                <DefaultLayout nft={nft} marketplace={marketplace} user={user}>
                                    <Discovering nft={nft} marketplace={marketplace} user={user} />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/detail/:id"
                            element={
                                <DefaultLayout nft={nft} marketplace={marketplace} user={user}>
                                    <Detail Discovering nft={nft} marketplace={marketplace} user={user} />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <DefaultLayout nft={nft} marketplace={marketplace} user={user}>
                                    <SignUp nft={nft} marketplace={marketplace} user={user} />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/evaluate/:id"
                            element={
                                <DefaultLayout nft={nft} marketplace={marketplace} user={user}>
                                    <Evaluate nft={nft} marketplace={marketplace} user={user} />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/evaluate"
                            element={
                                <DefaultLayout nft={nft} marketplace={marketplace} user={user}>
                                    <ListEvaluate nft={nft} marketplace={marketplace} user={user} />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/author"
                            element={
                                <DefaultLayout nft={nft} marketplace={marketplace} user={user}>
                                    <Author />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/list"
                            element={
                                <DefaultLayout nft={nft} marketplace={marketplace} user={user}>
                                    <ListEvaluate />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/myaccount"
                            element={
                                <DefaultLayout nft={nft} marketplace={marketplace} user={user}>
                                    <MyAccount nft={nft} marketplace={marketplace} user={user} />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/contact"
                            element={
                                <DefaultLayout nft={nft} marketplace={marketplace} user={user}>
                                    <Contact />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/authorInfo/:address"
                            element={
                                <DefaultLayout nft={nft} marketplace={marketplace} user={user}>
                                    <AuthorInfo nft={nft} marketplace={marketplace} user={user} />
                                </DefaultLayout>
                            }
                        />
                    </Routes>
                </div>
            )}
        </Router>
    );
}

export default App;
