import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

import changeImg from '../../../assets/images/background/Muaban.jpg'

const cx = classNames.bind(styles);

function InstructionSection() {
    return (
        <div>
            <div className={cx('instruction-section')}>
                <div className={cx('instruction-heading')}>
                    <h1>Đăng ký và chuyển nhượng quyền sở hữu của bạn</h1>
                </div>
                <div className={cx('instruction-items')}>
                    <div className={cx('instruction-item')}>
                        <AccountBalanceWalletOutlinedIcon className={cx('instruction-item-icon')} />
                        <h2>Thiết lập ví điện tử</h2>
                        <p>
                            Nhấn vào biểu tượng Ví điện tử ở trên góc phải màn hình để kết nối sau khi bạn đăng nhập tài
                            khoản.
                        </p>
                    </div>
                    <div className={cx('instruction-item')}>
                        <CategoryOutlinedIcon className={cx('instruction-item-icon')} />
                        <h2>Tạo ra hồ sơ tác giả</h2>
                        <p>Đăng ký bản quyền tác phẩm với hội đồng đánh giá.</p>
                    </div>
                    <div className={cx('instruction-item')}>
                        <ImageOutlinedIcon className={cx('instruction-item-icon')} />
                        <h2>Thêm vào danh mục NFTs</h2>
                        <p>Thêm sản phẩm vào tài khoản của người đăng ký. Công bố với cộng đồng.</p>
                    </div>
                    <div className={cx('instruction-item')}>
                        <LocalMallOutlinedIcon className={cx('instruction-item-icon')} />
                        <h2>Đăng ký chuyển nhượng</h2>
                        <p>Đưa sản phẩm lên sàn giao dịch để tiến hành chuyển nhượng.</p>
                    </div>
                </div>
            </div>
            <div className={cx('instruction-addition')}>
                <h1>Mô hình chuyển nhượng</h1>
                <img src={changeImg} alt="Hello"/>
                <p>
                    Trong ứng dụng của chúng tôi, cả tác giả lẫn người tham gia đều có khả năng giao 
                    dịch với nhau mà không cần có sự góp mặt của bên thứ ba mà vẫn luôn đảm bảo tính 
                    an toàn và bảo đảm với một tốc độ cực nhanh
                </p>
            </div>
        </div>
    );
}

export default InstructionSection;
