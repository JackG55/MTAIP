import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import logo from '../../../../assets/images/MTA.png';

import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer-container')}>
            <div className={cx('footer-logo')}>
                <img src={logo} alt="MTA" />
                <div className={cx('footer-logo-text')}>MTA</div>
            </div>
            <h3>© Viết bởi Đinh Viết Đức, Dương Đức Anh.</h3>
            <div className={cx('footer-icons')}>
                <IconButton href="https://github.com/JackG55/marketplace">
                    <GitHubIcon className={cx('footer-icon')}></GitHubIcon>
                </IconButton>
                <IconButton href="https://www.facebook.com/duc.dinhviet.35">
                    <FacebookIcon className={cx('footer-icon')}></FacebookIcon>
                </IconButton>
                <IconButton href="https://github.com/JackG55/marketplace">
                    <TwitterIcon className={cx('footer-icon')}></TwitterIcon>
                </IconButton>
                <IconButton href="https://github.com/JackG55/marketplace">
                    <TelegramIcon className={cx('footer-icon')}></TelegramIcon>
                </IconButton>
            </div>
        </footer>
    );
}

export default Footer;
