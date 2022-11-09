import * as React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import styles from './UI.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SearchBar({ placeholder, data }) {

    const [filteredData, setFilteredData] = React.useState([]);
    const [wordEntered, setWordEntered] = React.useState('');
    const [selected, setSelected] = React.useState(0);
    const [items, setItems] = React.useState([]);

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
        setItems([])
        setSelected(0)

    }
    const handleClick = (e) => {
        setItems(data);
    }
    const displayItem = (id) => {
        return () => {
            setSelected(id)
        }
    }
    return (
        <div className={cx('search')}>
            <div className={cx('search-input')}>
                <input type='text' placeholder={placeholder} value={wordEntered} onChange={handleFilter} onClick={handleClick} />
                <div className={cx('search-icon')}>
                    {wordEntered.length === 0 ? (
                        <SearchIcon sx={{ height: '30px', width: '30px', color: 'rgb(138, 147, 155)' }} />
                    ) : (
                        <CloseIcon sx={{ cursor: 'pointer', height: '30px', width: '30px', color: 'rgb(138, 147, 155)' }} onClick={clearInput} />
                    )}
                </div>
            </div>
            {items.length !== 0 && filteredData.length === 0 && wordEntered === '' && (
                <div className={cx('data-result')}>
                    {items.map((value, id) => {
                        return (
                            <div key={id} className={cx('data')}>
                                <div className={cx('data-img')}><img src={value.image} alt='' /></div>
                                <div className={cx('data-item')} onClick={displayItem(value.itemId)}>{value.name}</div>
                            </div>
                        );
                    })}
                    {selected !== 0 && (
                        <div className={cx('display-result')}>
                            {items.map((value, id) => {
                                return (
                                    <div key={id} className={cx('display-img')}>
                                        {value.itemId === selected && (
                                            <div><img src={value.image} alt='' /></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
            {filteredData.length !== 0 && (
                <div className={cx('data-result')}>
                    {filteredData.map((value, id) => {
                        return (
                            <div key={id} className={cx('data')}>
                                <div className={cx('data-img')}><img src={value.image} alt='' /></div>
                                <div className={cx('data-item')} onClick={displayItem(value.itemId)}>{value.name}</div>
                            </div>
                        );
                    })}
                    {selected !== 0 && (
                        <div className={cx('display-result')}>
                            {items.map((value, id) => {
                                return (
                                    <div key={id} className={cx('display-img')}>
                                        {value.itemId === selected && (
                                            <div><img src={value.image} alt='' /></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}

export default SearchBar;