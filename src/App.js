import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { DefaultLayout } from './components/Layout';

import PrivateRoute from './routes/PrivateRoute';

import Home from '../src/components/pages/Home';
import Discovering from './components/pages/Discovering/Discovering';
import Create from '../src/components/pages/Create';
import Sign from '../src/components/pages/Sign';
import Detail from '../src/components/pages/Detail';
import Evaluate from '../src/components/pages/Evaluate';

import { ethers } from 'ethers';
import MarketplaceAddress from '../src/abis/Marketplace-address.json';
import MarketplaceAbi from '../src/abis/Marketplace.json';
import MTAIPAddress from '../src/abis/MTAIP-address.json';
import MTAIPAbi from '../src/abis/MTAIP.json';
import SignUp from './components/pages/Sign/SignUp';

function App() {
    //============================================Xử lý BLockchain==========================//
    // #region Blockchain

    const [account, setAccount] = useState('');
    const [nft, setNFT] = useState({});
    const [marketplace, setMarketplace] = useState({});
    const [loading, setLoading] = useState(false);
    // MetaMask Login/Connect
    const web3Handler = async () => {
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
        setLoading(true);
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

    // #endregion Blockchain
    //=====================================================================================//


    window.onbeforeunload = function() {
        sessionStorage.removeItem('account');
        console.log('unload')
      };

    window.onload = function(){
        if(sessionStorage.getItem('account') === null)
        {
            sessionStorage.setItem('account', ''); 
            console.log('load')   
        }
    }

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
                                        <Discovering nft={nft} marketplace={marketplace}/>
                                    </DefaultLayout>
                            }
                        />
                        <Route
                            path="/detail"
                            element={
                                <DefaultLayout>
                                    <Detail />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                    <DefaultLayout>
                                        <SignUp nft={nft} marketplace={marketplace} />
                                    </DefaultLayout>
                            }
                        />
                        <Route
                            path="/evaluate"
                            element={
                                <DefaultLayout>
                                    <Evaluate />
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
