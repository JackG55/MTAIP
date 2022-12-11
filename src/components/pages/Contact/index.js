import styles from './Contact.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('contact')}>
            <div className={cx('map')}>
                <div className={cx('mapouter')}>
                    <div className={cx('gmap_canvas')}>
                        <iframe width="600" height="500" id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.7471394245467!2d108.25009031468288!3d15.974575988939447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421088e365cc75%3A0x6648fdda14970b2c!2zNDcwIMSQxrDhu51uZyBUcuG6p24gxJDhuqFpIE5naMSpYSwgSG_DoCBI4bqjaSwgTmfFqSBIw6BuaCBTxqFuLCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1670744853680!5m2!1svi!2s" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" />
                        <a href="https://2piratebay.org" />
                        <br />
                    </div>
                </div>
            </div>
            <div className={cx('contact-information')}>
                <h2>Quản lý Sở Hữu Trí Tuệ - Trường Đại Học Đà Nẵng</h2>
                <br />
                <h4>Địa chỉ:</h4> <p>470 Trần Đại Nghĩa, Ngũ Hành Sơn, Đà Nẵng</p>
                <br />
                <h4>Email:</h4>
                <p>aaaaa@gmail.com</p>
                <p>bbbbb@gmail.com</p>
                <br />
                <h4>Điện thoại: </h4>
                <p>00000000</p>
                <p>0000000</p>
            </div>
        </div>
    );
}

export default Contact;
