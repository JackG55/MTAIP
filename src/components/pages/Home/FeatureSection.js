import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import metamask from '../../../assets/images/wallet/MetaMask-Emblem-500x281.png';
import exodus from '../../../assets/images/wallet/Exodus_Logo-094c6a5bbda24cb29c2f930dd254069f.png';
import horizontal from '../../../assets/images/wallet/horizontal_blue.png';
import walletconnect from '../../../assets/images/wallet/WalletConnect-logo 1.png';

import feature1 from '../../../assets/images/background/image 1.png';
import feature2 from '../../../assets/images/background/feature-2 1.png';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const cx = classNames.bind(styles);

function FeatureSection() {
    return (
        <div>
            <div className={cx('walletlogo')}>
                <div className={cx('logos')}>
                    <img src={metamask} alt="Hello" />
                    <img src={exodus} alt="Hello" />
                    <img src={horizontal} alt="Hello" />
                    <img src={walletconnect} alt="Hello" />
                </div>
            </div>

            <div className={cx('features')}>
                <div className={cx('features-row')}>
                    <div className={cx('features-left-content')}>
                        <h1>Công nghệ Blockchain</h1>
                        <p>
                            Blockchain là một sổ cái được chia sẻ, bất biến, tạo điều kiện thuận lợi cho quá trình ghi
                            lại các giao dịch và theo dõi tài sản trong một mạng lưới.
                        </p>
                        <div className={cx('features-list')}>
                            <ul>
                                <li>
                                    <CheckCircleRoundedIcon sx={{ color: '#7e3af2' }} />
                                    <span>Mạng ngang hàng</span>
                                </li>
                                <li>
                                    <CheckCircleRoundedIcon sx={{ color: '#7e3af2' }} />
                                    <span>Sổ cái phi tập trung</span>
                                </li>
                                <li>
                                    <CheckCircleRoundedIcon sx={{ color: '#7e3af2' }} />
                                    <span>Thuật toán ngang hàng</span>
                                </li>
                                <li>
                                    <CheckCircleRoundedIcon sx={{ color: '#7e3af2' }} />
                                    <span>Hợp đồng thông minh</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <img src={feature1} alt="NFT1"></img>
                </div>
                <div className={cx('features-row')}>
                    <img src={feature2} alt="NFT2"></img>
                    <div className={cx('features-left-content')}>
                        <h1>NFT và Quyền sở hữu trí tuệ</h1>
                        <p>
                            NFT - một loại chứng chỉ kỹ thuật số để xác thực quyền sở hữu tài sản bằng công nghệ
                            blockchain.
                        </p>
                        <div className={cx('features-list')}>
                            <ul>
                                <li><CheckCircleRoundedIcon sx={{ color: '#7e3af2' }} />
                                    <span>Quyền tác giả</span></li>
                                <li><CheckCircleRoundedIcon sx={{ color: '#7e3af2' }} />
                                    <span>Mẫu thiết kế</span></li>
                                <li><CheckCircleRoundedIcon sx={{ color: '#7e3af2' }} />
                                    <span>Thương hiệu</span></li>
                                <li><CheckCircleRoundedIcon sx={{ color: '#7e3af2' }} />
                                    <span>Bảo hộ sở hữu trí tuệ</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeatureSection;
