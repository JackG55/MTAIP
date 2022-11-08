import * as React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import { ethers } from 'ethers';

import styles from './UI.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SearchDiscovery({ placeholder, data }) {
    const [filteredData, setFilteredData] = React.useState([]);
    const [wordEntered, setWordEntered] = React.useState('');
    const [tokenID, setTokenID] = React.useState();

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord)
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase()); // ktra name có chứa chữ cái đã nhập trong input
        });

        if (searchWord === '') {
            setFilteredData([])
        } else {
            setFilteredData(newFilter);
        }
    }
    const clearInput = () => {
        setFilteredData([])
        setWordEntered('')
    }

    let navigate = useNavigate()

    const handleClick = (id) => {
        return () => {
            navigate(`/detail/${id}`)
            clearInput()
            console.log('chuyển trang đi')
        }
    }

    return (
        <div className={cx('searchDiscovery')}>
            <div className={cx('search-input')}>
                <input type='text' placeholder={placeholder} value={wordEntered} onChange={handleFilter} />
                <div className={cx('search-icon')}>
                    {wordEntered.length === 0 ? (
                        <SearchIcon sx={{ height: '30px', width: '30px', color: 'rgb(138, 147, 155)' }} />
                    ) : (
                        <CloseIcon sx={{ cursor: 'pointer', height: '30px', width: '30px', color: 'rgb(138, 147, 155)' }} onClick={clearInput} />
                    )}
                </div>
            </div>

            {filteredData.length !== 0 && (
                <div className={cx('data-result')}>
                    {filteredData.map((value, id) => {
                        return (
                            <div key={id} className={cx('data')} >
                                <div className={cx('data-img')}><img src={value.image} alt='' /></div>
                                <div className={cx('data-item')} onClick={handleClick(value.tokenId.toNumber())}>{value.name}</div>
                            </div>
                        );
                    })}
                </div>
            )
            }
        </div >
    );
}

export default SearchDiscovery;