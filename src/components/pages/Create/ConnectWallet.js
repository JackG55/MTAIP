import './ConnectWallet.css';
import img1 from '../../../assets/images/wallet/metamask.png';
import img2 from '../../../assets/images/wallet/coinbase.webp';
import img3 from '../../../assets/images/wallet/walletconnect.webp';
import img4 from '../../../assets/images/wallet/phantom.png';
import img5 from '../../../assets/images/wallet/glow.jpg';

import { useNavigate } from 'react-router-dom'

import Web3 from 'web3/dist/web3.min.js';





function ConnectWallet() {
    let navigate = useNavigate();
    function HandleClick(){
        navigate('/signup');
    }

    async function requestAccount() {
        console.log('Requesting accounts.......');
    
        //check if MetaMask Extension exists
        if (window.ethereum) {
            console.log('detected');
    
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
                
                HandleClick();
                console.log(accounts);
            } catch (error) {
                alert('Không thể kết nối');
            }
            
    
        } else {
            console.log('MetaMask is not detected');
        }
    }
    

    return (
        <div className="connect-wallet">
            <h1>Kết nối Ví của bạn</h1>
            <div>
                <div>
                    <p>Nếu bạn chưa có ví, bạn có thể chọn nhà cung cấp và tạo 1 cái ngay bây giờ</p>
                </div>
                <div className="provider-wallet">
                    <ul>
                        <li>
                            <button onClick={requestAccount}>
                                <div>
                                    <img src={img1} alt="metamask" />
                                </div>
                                <div className="popular-wallet">
                                    <span>MetaMask</span>
                                </div>
                                <div className="popular">Phổ biến</div>
                            </button>
                        </li>
                        <li>
                            <button>
                                <div>
                                    <img src={img2} alt="coinbase" />
                                </div>
                                <div>
                                    <span>Coinbase Wallet</span>
                                </div>
                            </button>
                        </li>
                        <li>
                            <button>
                                <div>
                                    <img src={img3} alt="walletconnect" />
                                </div>
                                <div>
                                    <span>WalletConnect</span>
                                </div>
                            </button>
                        </li>
                        <li>
                            <button>
                                <div>
                                    <img src={img4} alt="phantom" />
                                </div>
                                <div>
                                    <span>Phantom</span>
                                </div>
                            </button>
                        </li>
                        <li>
                            <button>
                                <div>
                                    <img src={img5} alt="glow" />
                                </div>
                                <div>
                                    <span>Glow</span>
                                </div>
                            </button>
                        </li>
                        <li className="more-btn">
                            <button>
                                <span>Hiển thị thêm lựa chọn</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default ConnectWallet;
