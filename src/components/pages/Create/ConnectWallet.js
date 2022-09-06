import './ConnectWallet.css';
import img1 from '../../../assets/images/metamask.png';
import img2 from '../../../assets/images/coinbase.webp';
import img3 from '../../../assets/images/walletconnect.webp';
import img4 from '../../../assets/images/phantom.png';
import img5 from '../../../assets/images/glow.jpg';

function ConnectWallet() {
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
                            <button>
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
