import AccordionUI from '../../UIcomponents/AccordionUI';
import TableUI from '../../UIcomponents/TableUI';
import ImgExample from '../../../assets/images/details/image-details.png';
import EthereumIcon from '../../../assets/images/details/ethereum.png';
import CardUI from '../../UIcomponents/Card';

import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';

import styles from './Detail.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function createData(event, price, from, to, time) {
    return { event, price, from, to, time };
}

const rows = [
    createData('Mint', null, 'Null Address', 'NFT_Rabbithole', '18:00:56'),
    createData('List', 0.85, 'NFT_Rabbithole', ' ', '18:06:08'),
    createData('List', 1, 'NFT_Rabbithole', ' ', '18:06:09'),
    createData('List', 2, 'NFT_Rabbithole', ' ', '18:06:10'),
    createData('List', 31, 'NFT_Rabbithole', ' ', '18:06:11'),
    createData('List', 15, 'NFT_Rabbithole', ' ', '18:06:12'),
    createData('List', 100, 'NFT_Rabbithole', ' ', '18:06:13'),
    createData('List', 99, 'NFT_Rabbithole', ' ', '18:06:14'),
];

function Detail() {
    return (
        <div className={cx('detail-artwork')}>
            <div className={cx('common-information')}>
                <div className={cx('image-info')}>
                    <img src={ImgExample} alt="" />
                </div>
                <div className={cx('common-info')}>
                    <h1>IMMORTAL BABBLE</h1>
                    <div className={cx('own-info')}>
                        <p>Sở hữu bởi NguyenA</p>
                        <span>
                            <VisibilityIcon />
                            10k Lượt xem
                        </span>
                        <span>
                            <FavoriteIcon />
                            400 Lượt thích
                        </span>
                    </div>
                    <AccordionUI id="1" title="Mô tả" type="description">
                        <p>
                            Đây là tác phẩm nghệ thuật với cấu trúc kỹ thuật số độc đáo, được tạo trong 1 trình duyệt
                            web. Quá trình được thực hiện bởi JavaScript và có yếu tố mang tính biểu tượng của tác phẩm
                            nghệ thuật của ông Nguyễn A
                        </p>
                    </AccordionUI>
                    <AccordionUI id="2" title="Chi tiết" type="detail">
                        <div className={cx('detail-content')}>
                            <div className={cx('detail-title')}>
                                <p>Contract Address</p>
                                <p>Token ID</p>
                                <p>Token Standard</p>
                                <p>Blockchain</p>
                            </div>
                            <div className={cx('detail-info')}>
                                <p style={{ color: '#7E3AF2' }}>0x903b2...7d33</p>
                                <p style={{ color: '#7E3AF2' }}>340</p>
                                <p>ERC 721</p>
                                <p>Ethereum</p>
                            </div>
                        </div>
                    </AccordionUI>
                    <div className={cx('price-info')}>
                        <h3>Giá hiện tại</h3>
                        <div className={cx('ethereum-price')}>
                            <img src={EthereumIcon} alt="" style={{ height: '30px', width: '30px' }} />
                            <div className={cx('ethereum-info')}>
                                <span>0.75 ($1,219.66)</span>
                            </div>
                        </div>
                        <div className={cx('buy-offer-btn')}>
                            <button className={cx('buy-btn')}>Mua luôn</button>
                            <button className={cx('offer-btn')}>Đề nghị</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('history-transaction')}>
                <AccordionUI id="3" title="Lịch sử giao dịch" type="history">
                    <TableUI rows={rows} />
                </AccordionUI>
            </div>
            <div className={cx('another-artwork')}>
                <AccordionUI id="4" title="Những tác phẩm khác" type="timeline">
                    <div className={cx('artwork-info')}>
                        <CardUI />
                        <CardUI />
                        <CardUI />
                        <CardUI />
                    </div>
                </AccordionUI>
            </div>
        </div>
    );
}

export default Detail;
