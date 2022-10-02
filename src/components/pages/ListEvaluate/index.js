
import CardUI from '../../UIcomponents/CardEvaluate';


import styles from './ListEvaluate.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


function ListEvaluate() {
    return (
        <div className={cx('list-evaluate')} >
            <h1>Danh sách tác phẩm</h1>
            <div className={cx('list-artwork')} >
                <h2>Chưa đánh giá</h2>
                <div className={cx('list-artwork-not-evaluate')}>
                    <CardUI evaluated='1' total='10' />
                    <CardUI evaluated='1' total='10' />
                    <CardUI evaluated='1' total='10' />
                </div>
                <h2>Đã đánh giá</h2>
                <div className={cx('list-artwork-evaluated')}>
                    <CardUI evaluated='1' total='10' check='accept' />
                    <CardUI evaluated='1' total='10' check='accept' />
                    <CardUI evaluated='1' total='10' check='notAccept' />
                    <CardUI evaluated='1' total='10' check='notAccept' />
                    <CardUI evaluated='1' total='10' check='notAccept' />
                    <CardUI evaluated='1' total='10' check='notAccept' />
                    <CardUI evaluated='1' total='10' check='notAccept' />
                </div>


            </div>

        </div >
    );
}

export default ListEvaluate;