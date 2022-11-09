import styles from './Contact.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('contact')}>
            <div className={cx('map')}>
                <div className={cx('mapouter')}>
                    <div className={cx('gmap_canvas')}>
                        <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=236%20Ho%C3%A0ng%20Qu%E1%BB%91c%20Vi%E1%BB%87t,%20C%E1%BB%95%20Nhu%E1%BA%BF,%20B%E1%BA%AFc%20T%E1%BB%AB%20Li%C3%AAm,%20H%C3%A0%20N%E1%BB%99i&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" />
                        <a href="https://2piratebay.org" />
                        <br />
                    </div>
                </div>
            </div>
            <div className={cx('contact-information')}>
                <h2>Quản lý Sở Hữu Trí Tuệ - Trường Đại Học Lê Quý Đôn</h2>
                <br />
                <h4>Địa chỉ:</h4> <p>236 Hoàng Quốc Việt, Cổ Nhuế, Bắc Từ Liêm, Hà Nội</p>
                <br />
                <h4>Email:</h4>
                <p>jacksparrow551999@gmail.com</p>
                <p>ducanh99tpvpnd@gmail.com</p>
                <br />
                <h4>Điện thoại: </h4>
                <p>0965501930</p>
                <p>0904752793</p>
            </div>
        </div>
    );
}

export default Contact;
