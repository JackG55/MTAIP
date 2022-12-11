import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Avatar from '@mui/material/Avatar';

import DucAnh from '../../../assets/images/avatar/duc_anh.jpg';
import Duc from '../../../assets/images/avatar/viet_duc.jpg';
import Thay_Trang from '../../../assets/images/avatar/Thay_Trang.PNG';

const cx = classNames.bind(styles);

function MyTeamSection() {
    return (  
        <div className={cx('myteam-section')}>
            <h1>Nhà phát triển</h1>
            <div className={cx('myteam-section-items')}>
                <div className={cx('myteam-section-item')}>
                    <Avatar src={Duc} alt='Hello' className={cx('myteam-section-avatar')}/>
                    <h2>Đinh Viết Đức</h2>
                    <h3>Lớp Bảo đảm an toàn thông tin</h3>
                    <p>Chúng ta có thể gặp nhiều thất bại nhưng chúng ta không được bị đánh bại </p>
                </div>
                <div className={cx('myteam-section-item')}>
                <Avatar src={DucAnh} alt='Hello' className={cx('myteam-section-avatar')}/>
                    <h2>Dương Đức Anh</h2>
                    <h3>Lớp Bảo đảm an toàn thông tin</h3>
                    <p>Hạnh phúc đạt được khi bạn ngừng chờ đợi điều đó xảy ra và thực hiện các bước để biến nó thành hiện thực </p>
                </div>
                <div className={cx('myteam-section-item')}>
                <Avatar src={Thay_Trang} alt='Hello' className={cx('myteam-section-avatar')}/>
                    <h2>Đặng Lê Đình Trang</h2>
                    <h3>Tiến sĩ, giảng viên</h3>
                    <p>Khó mới cần học, dễ thì cần gì hỏi</p>
                </div>
            </div>
        </div>
    );
}

export default MyTeamSection;