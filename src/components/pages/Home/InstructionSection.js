import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function InstructionSection() {
    return (
        <div className={cx('instruction-section')}>
            <div className={cx('instruction-heading')}>
                <h1>Đăng ký và chuyển nhượng quyền sở hữu của bạn</h1>
            </div>
            <div className={cx('instruction-items')}>
                <div className={cx('instruction-item')}>
                    <img src="" alt="" />
                    <h2>Thiết lập ví điện tử</h2>
                    <p>
                        Nhấnvào biểu tượng Ví điện tử ở trên góc phải màn hình để kết nối sau khi bạn đăng nhập tài
                        khoản.
                    </p>
                </div>
                <div className={cx('instruction-item')}>
                    <img src="" alt="" />
                    <h2>Tạo ra hồ sơ tác giả</h2>
                    <p>Đăng ký bản quyền tác phẩm với hội đồng đánh giá.</p>
                </div>
                <div className={cx('instruction-item')}>
                    <img src="" alt="" />
                    <h2>Thêm vào danh mục NFTs</h2>
                    <p>Thêm sản phẩm vào tài khoản của người đăng ký. Công bố với cộng đồng.</p>
                </div>
                <div className={cx('instruction-item')}>
                    <img src="" alt="" />
                    <h2>Đăng ký chuyển nhượng</h2>
                    <p>Đưa sản phẩm lên sàn giao dịch để tiến hành chuyển nhượng.</p>
                </div>
            </div>
        </div>
    );
}

export default InstructionSection;
